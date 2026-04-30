# N8N HTTP Webhook Setup for /api/leads

## Current Status
- ✅ Chat AI Widget: Sends leads to `/api/leads` with `service: "ai_chat"`
- ✅ Voice Call (VAPI): Ready to send leads to `/api/leads` with `service: "voice_call"`
- ✅ Forms: Send leads to `/api/leads`
- ⚠️ **MISSING**: N8N workflow doesn't have HTTP Webhook trigger node configured

## Problem
The `/api/leads` endpoint forwards requests to N8N at:
```
https://n8n-production-9357c.up.railway.app/webhook/os0cT9GcMTFSldKz
```

But this endpoint needs an **HTTP Webhook trigger node** in the N8N workflow to receive POST requests.

## Solution: Add HTTP Webhook Trigger to N8N

### Step 1: Open N8N Dashboard
1. Go to: `http://localhost:5678` (via SSH tunnel if on production)
2. Or: Login via https://n8n-production-9357c.up.railway.app

### Step 2: Edit "AutoPerTutti — Lead Pipeline" Workflow
1. Click the workflow ID: `os0cT9GcMTFSldKz`
2. Click **Edit** or **View** to enter the workflow editor

### Step 3: Add HTTP Webhook Trigger Node
1. Click **+ Add Node** (top left area of canvas)
2. Search for: **"Webhook"**
3. Select: **"Webhook"** (HTTP trigger)
4. Configure:
   ```
   Method: POST
   Path: /api/leads
   ```
5. **Important**: Do NOT specify the full URL, just the path

### Step 4: Connect HTTP Webhook to Existing Flow
1. The new Webhook node should feed into **"Merge Channels"** or **"Validazione dati"**
2. Or if validation doesn't exist, connect directly to **"Claude — Classifica"** (the classification node)

Current flow should be:
```
HTTP Webhook (/api/leads)
    ↓
Merge Channels (combines multiple sources)
    ↓
Claude — Classifica (NLP classification)
    ↓
Airtable — Crea Lead (create record in Leads table)
    ↓
Risposta/Notifica Team
```

### Step 5: Test the Webhook
1. In N8N, copy the full webhook URL from the HTTP Webhook node
2. Should look like: `https://n8n-production-9357c.up.railway.app/webhook/os0cT9GcMTFSldKz` (path appended automatically)
3. Or: `https://n8n-production-9357c.up.railway.app/webhook/os0cT9GcMTFSldKz/api/leads`

### Step 6: Update .env.local (if webhook URL changes)
```env
N8N_WEBHOOK_URL=https://n8n-production-9357c.up.railway.app/webhook/os0cT9GcMTFSldKz
```

## Expected Data Format from /api/leads

```json
{
  "name": "Mario Rossi",
  "email": "mario@example.com",
  "phone": "+39 3791137917",
  "message": "Vorrei una BMW 3 Serie",
  "service": "ai_chat",
  "timestamp": "2026-04-30T12:00:00Z",
  "source": "ai_chat",
  "channel": "Chat AI"
}
```

**Note**: The `service` field determines source:
- `"ai_chat"` → Chat AI Widget
- `"voice_call"` → VAPI Voice Call
- Any other value → Web Form

## Troubleshooting

### Webhook Not Receiving Data
1. **Check N8N Logs**:
   ```bash
   ssh -i ~/.ssh/id_ed25519 root@31.97.38.30
   docker logs n8n
   ```

2. **Verify Webhook Node Exists**: Check that HTTP Webhook node is **active** (not disabled)

3. **Test POST Request**:
   ```bash
   curl -X POST https://n8n-production-9357c.up.railway.app/webhook/os0cT9GcMTFSldKz \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "phone": "+39 1234567890",
       "service": "test",
       "message": "Test message"
     }'
   ```

4. **Check Vercel Logs** (Chat AI side):
   ```bash
   vercel logs --follow
   ```

### 500 Error "Failed to process lead"
Usually means N8N webhook returned error. Check:
1. Is N8N workflow running?
2. Does HTTP Webhook node exist?
3. Are required fields being validated?

## Alternative: Redirect to Different Webhook Path
If adding a node is difficult, you can create a separate N8N workflow just for `/api/leads` with its own dedicated webhook at a different path, then update .env.local to point there.

---

**Done?** Once HTTP Webhook is added and tested:
1. ✅ Test Chat AI flow: send message → trigger purchase intent → submit form → should appear in Airtable
2. ✅ Monitor N8N execution logs to confirm lead processing
3. ✅ Check that Telegram notification is sent to team
4. ✅ Verify lead appears in HubSpot (if integrated)
