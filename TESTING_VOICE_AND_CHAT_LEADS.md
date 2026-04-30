# Testing: Chat AI & Voice Call Lead Capture

## Overview
This document covers end-to-end testing of the Chat AI and Voice Call lead capture flows.

## Architecture
```
User → Chat AI / Voice Call
    ↓
/api/leads endpoint
    ↓
N8N webhook (requires HTTP trigger setup)
    ↓
Lead classification
    ↓
Airtable + HubSpot
    ↓
Team notification
```

---

## Test 1: Chat AI Lead Capture

### Setup
1. Start dev server:
   ```bash
   cd c:\Projects\autopertutti-site
   npm run dev
   ```
2. Open: http://localhost:3000

### Test Steps
1. Click the red **FAB** button (bottom-right, message icon)
2. Select **"Chat AI"** from the menu
3. Type any message, e.g.: `"Quanto costa un tagliando?"`
4. AI responds with Italian text
5. Type a purchase intent keyword, e.g.: `"Vorrei fare un appuntamento"`
6. **Inline lead form** should appear after 0.8 seconds showing:
   - Nome *
   - Telefono *
   - Email (optional)
   - "Invia Richiesta" button

### Fill Form & Submit
1. Enter:
   - Nome: `Mario Rossi`
   - Telefono: `+39 123 456 7890`
   - Email: `mario@example.com`
2. Click **"Invia Richiesta"**
3. Should see: **"✓ Richiesta ricevuta! Ti contatteremo entro 30 minuti."**

### Expected Result
Form closes after 2 seconds. Lead is sent to `/api/leads` with:
```json
{
  "name": "Mario Rossi",
  "email": "mario@example.com",
  "phone": "+39 123 456 7890",
  "service": "ai_chat",
  "message": "Lead da AI Chat Widget",
  "source": "ai_chat",
  "channel": "Chat AI"
}
```

---

## Test 2: Voice Call (VAPI) Lead Capture

### Setup
1. Same as Test 1 (dev server running)
2. **Browser must allow microphone access**

### Test Steps
1. Click red **FAB** button
2. Select **"Chiama AI"** (Voice Call)
3. Button should pulse violet (`.vapi-active` animation)
4. **Browser requests microphone permission** → Click **Allow**
5. Listening indicator appears
6. Speak into microphone, e.g.: `"Vorrei sapere il prezzo di una macchina"`
7. AI responds with voice (Diego voice in Italian)
8. Continue conversation (e.g., `"Mi interessa una BMW"`)
9. Say something indicating end, e.g.: `"Grazie, arrivederci"`

### After Call Ends
1. Modal appears with:
   - **"Informazioni di contatto"**
   - Nome *
   - Telefono *
   - Email (optional)
   - "Invia Richiesta" button
   - "Chiudi" button

2. Fill form:
   - Nome: `Lucia Bianchi`
   - Telefono: `+39 987 654 3210`
   - Email: (leave empty)

3. Click **"Invia Richiesta"**

### Expected Result
Lead is sent to `/api/leads` with:
```json
{
  "name": "Lucia Bianchi",
  "email": "non_fornita@voice.ai",
  "phone": "+39 987 654 3210",
  "service": "voice_call",
  "message": "Lead da VAPI Voice Call",
  "source": "voice_call",
  "channel": "Voice Call VAPI"
}
```

**Note**: Email defaults to `non_fornita@voice.ai` if not provided (satisfies N8N validation)

---

## Test 3: Verify API Endpoint

### Using cURL
```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+39 1234567890",
    "service": "ai_chat",
    "message": "Test from curl"
  }'
```

### Expected Response (Success)
```json
{
  "success": true,
  "message": "Lead received successfully"
}
```

### Expected Response (Error - Missing Required Fields)
```json
{
  "error": "Name, email, and phone are required",
  "status": 400
}
```

---

## Test 4: Verify N8N Integration

### Prerequisites
- N8N HTTP webhook trigger node must be added first
- See: `N8N_HTTP_WEBHOOK_SETUP.md`

### Test Steps
1. Send test lead via API (Test 3)
2. Check N8N workflow execution:
   - Go to N8N dashboard
   - Find workflow: `AutoPerTutti — Lead Pipeline`
   - Check **Executions** tab
   - Should show recent execution with status: **Success** or **Completed**

### Check Workflow Path
1. **HTTP Webhook** node receives POST
2. **Merge Channels** combines all sources
3. **Claude — Classifica** classifies lead type
4. **Airtable — Crea Lead** creates record in Leads table
5. **Risposta Telegram/WhatsApp** sends team notification

---

## Test 5: Check Airtable Records

### Verify Leads Table
1. Open Airtable: https://airtable.com/
2. Base: `Auto Per Tutti` (appOTI1cMozjMnMD4)
3. Table: `Leads`
4. Recent records should show:
   - Name: `Mario Rossi` (Chat AI test)
   - Name: `Lucia Bianchi` (Voice Call test)
   - Source: `ai_chat` or `voice_call`
   - Channel: `Chat AI` or `Voice Call VAPI`

---

## Test 6: Verify Team Notification

### Telegram Channel
1. Check: https://t.me/autopertutti or manager notification channel
2. Should see messages like:
   ```
   📞 Nuovo lead da Chat AI
   Nome: Mario Rossi
   Telefono: +39 123 456 7890
   Categoria: [Classification]
   ```

### Alternative: Check N8N Notification Node
1. In N8N workflow, check the notification nodes:
   - Risposta Telegram
   - Risposta WhatsApp
   - Notifica Manager

---

## Common Issues & Solutions

### Issue: "Failed to process lead" Error
**Symptoms**: Chat form shows error after submission

**Causes**:
1. N8N webhook is not active
2. HTTP trigger node not configured
3. N8N workflow is paused

**Solution**:
```bash
# Check N8N status
ssh -i ~/.ssh/id_ed25519 root@31.97.38.30
docker logs n8n | tail -20

# Restart if needed
docker restart n8n
```

### Issue: VAPI Not Working
**Symptoms**: 
- "Chiama AI" button doesn't respond
- No microphone prompt
- Purple pulsing doesn't start

**Causes**:
1. `NEXT_PUBLIC_VAPI_PUBLIC_KEY` not set in .env.local
2. `NEXT_PUBLIC_VAPI_ASSISTANT_ID` not set
3. Browser doesn't allow WebRTC
4. VAPI credentials expired or invalid

**Solution**:
```bash
# Verify env vars
grep VAPI .env.local

# Check browser console for errors
# (Right-click → Inspect → Console tab)
# Look for "VAPI error" messages

# Test VAPI config
echo "Public Key: $NEXT_PUBLIC_VAPI_PUBLIC_KEY"
echo "Assistant ID: $NEXT_PUBLIC_VAPI_ASSISTANT_ID"
```

### Issue: Chat AI Not Responding
**Symptoms**: 
- Message sent but no response
- Typing indicator never starts
- Error appears after 30 seconds

**Causes**:
1. `/api/chat` endpoint not working
2. OpenRouter API key expired
3. Rate limit reached

**Solution**:
```bash
# Check .env.local
grep OPENROUTER .env.local

# Test API endpoint
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Ciao"}]}'
```

---

## Pre-Production Checklist

- [ ] Chat AI working locally with `npm run dev`
- [ ] Voice Call (VAPI) working with microphone
- [ ] Both send leads to `/api/leads` successfully
- [ ] N8N HTTP webhook trigger added and tested
- [ ] Test leads appear in Airtable within 2-3 seconds
- [ ] Team notification sent to Telegram
- [ ] `.env.local` has all required keys set
- [ ] `npm run build` completes without errors
- [ ] `vercel deploy --prod` ready

---

## Deployment Command

```bash
cd c:\Projects\autopertutti-site

# Build locally
npm run build

# Deploy to production
vercel deploy --prod --yes

# Monitor logs
vercel logs --follow
```

**Time**: ~5 minutes for deployment + propagation

---

## Post-Deployment Verification

After deploying to production at: https://autopertutti-site-one.vercel.app/

1. Open production site
2. Test Chat AI (Test 1) on production
3. Test Voice Call (Test 2) on production
4. Monitor N8N executions in real-time
5. Check Airtable for new records
6. Verify Telegram notifications

---

## Success Metrics

✅ **All Green** when:
- Chat form sends leads → N8N processes → Airtable records created
- Voice call leads → Form → N8N processes → Airtable records created
- Team receives Telegram notification within 5 seconds
- No errors in Vercel logs
- No errors in N8N execution logs
- VAPI call quality is acceptable (low latency, clear voice)

🔴 **Red Flag** if:
- Leads not appearing in Airtable after 30 seconds
- N8N executions showing as "Failed"
- Telegram notifications not received
- Voice call hanging or not ending properly
- Chat streaming responses taking >10 seconds
