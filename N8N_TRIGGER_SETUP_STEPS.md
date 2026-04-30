# N8N HTTP Webhook Trigger Setup — Step by Step

🔴 **CRITICAL**: Without this, Chat AI & Voice Call leads will NOT reach your CRM!

⏱️ **Time**: ~5 minutes  
📍 **Location**: N8N Dashboard  
🎯 **Goal**: Add HTTP webhook trigger to receive leads from `/api/leads`

---

## BEFORE YOU START

**Have ready**:
- N8N dashboard access (http://localhost:5678 or production URL)
- Workflow ID: `os0cT9GcMTFSldKz`
- Workflow name: `AutoPerTutti — Lead Pipeline`

---

## STEP 1: Open N8N Dashboard

### Option A: Local (Development)
```bash
ssh -i ~/.ssh/id_ed25519 root@31.97.38.30
docker exec -it n8n npm start
# Then open http://localhost:5678
```

### Option B: Production (Recommended)
Go to: https://n8n-production-9357c.up.railway.app

---

## STEP 2: Find & Edit the Workflow

1. **Login** to N8N if needed
2. Find workflow: `AutoPerTutti — Lead Pipeline`
3. Click it to open
4. Click **"Edit"** button (top right)

You should see workflow diagram with nodes:
- `Telegram Trigger` (left side)
- `WhatsApp Webhook` (left side)
- `Merge Channels` (center)
- `Claude — Classifica` (center)
- etc.

---

## STEP 3: Add HTTP Webhook Trigger Node

### In the Workflow Canvas:

1. **Click "+" icon** or **"Add Node"** button
2. Search for: **"Webhook"**
3. Select: **"Webhook"** (from Workflow Trigger section)
   - ⚠️ Make sure it's the trigger type, not an action

### Configure the Webhook Node:

**In the node settings panel** (right side):

```
Method: POST          ← Select dropdown
Path: /api/leads      ← Type exactly this
```

**Optional settings** (can leave as default):
- Authentication: None
- Response: Auto
- Response code: 200

---

## STEP 4: Connect to Existing Flow

1. **Drag the output** of the new Webhook node
2. **Connect to**: `Merge Channels` node (or if it exists, `Validazione dati`)

The flow should look like:
```
HTTP Webhook (/api/leads)
      ↓
   Merge Channels  ← Connect here
      ↓
Claude — Classifica
      ↓
Airtable — Crea Lead
      ↓
Notifications
```

---

## STEP 5: Save & Activate

1. **Click "Save"** button (top right)
2. **Confirm** any prompts
3. Make sure workflow shows **"Active"** status (green indicator)
4. If paused, click **"Activate"** button

---

## STEP 6: Test the Webhook

### Method A: Using cURL (Command Line)

```bash
curl -X POST https://n8n-production-9357c.up.railway.app/webhook/os0cT9GcMTFSldKz \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+39 1234567890",
    "service": "test",
    "message": "Test webhook"
  }'
```

**Expected Response**:
```json
{
  "status": "ok"
}
```

### Method B: From N8N Dashboard

1. In the Webhook node settings
2. Click **"Copy webhook URL"**
3. Use Postman or cURL to test (see Method A)

---

## STEP 7: Verify Execution

1. **Go to "Executions"** tab in N8N
2. **Look for recent execution** from your test
3. Should show:
   - Status: **"Success"** ✓
   - Execution time: ~2-3 seconds
   - No error messages

If you see errors:
- Check the error message in Executions tab
- Fix the issue (see Troubleshooting below)
- Re-test

---

## STEP 8: Verify Lead Appears in Airtable

1. Open Airtable: https://airtable.com
2. Base: `Auto Per Tutti`
3. Table: `Leads`
4. **Should see new record** with:
   - Name: `Test User`
   - Email: `test@example.com`
   - Phone: `+39 1234567890`
   - Source: `test`

If record doesn't appear:
- Check N8N execution logs (step 7)
- Verify Airtable integration is connected
- Check if Airtable API token is valid

---

## TROUBLESHOOTING

### Issue: Webhook node won't connect to next node

**Solution**:
- Make sure you're connecting the output (right side) of Webhook node
- The receiving node should have an input connector
- Try dragging from the small circle on the right of Webhook node

### Issue: "Webhook not found" error

**Solution**:
- Make sure Webhook node is saved
- Make sure workflow is **activated** (green status)
- Wait 5 seconds for webhook to register
- Try test request again

### Issue: Execution shows "Failed"

**Solution**:
1. Click on the failed execution
2. Look at the error message (red box)
3. Common errors:
   - **"Cannot convert undefined to object"** → Validate node not working properly
   - **"Airtable API error"** → Check Airtable token/permissions
   - **"Claude API error"** → Check OpenAI/Claude API key

### Issue: Webhook URL doesn't match

**Note**: The full webhook URL will be:
```
https://n8n-production-9357c.up.railway.app/webhook/os0cT9GcMTFSldKz
```

The `/api/leads` path is configured in the Webhook node settings, not the URL itself.

---

## VERIFICATION CHECKLIST

After setup, verify each step:

- [ ] HTTP Webhook node added to workflow
- [ ] Path configured to `/api/leads`
- [ ] Connected to Merge Channels (or validation node)
- [ ] Workflow is **Active** (green status)
- [ ] Test curl command returns success
- [ ] N8N execution shows "Success"
- [ ] Test record appears in Airtable within 3 seconds
- [ ] No errors in N8N logs

---

## SUCCESS INDICATORS

✅ You're done when:

1. **N8N Executions tab** shows recent "Success" execution
2. **Airtable** shows new "Leads" record
3. **No errors** in N8N execution logs
4. **curl test** returns `{"status":"ok"}`

---

## NEXT STEPS

After HTTP trigger is set up:

1. ✅ Test on **production website**: https://autopertutti-site-one.vercel.app
   - Click Chat AI button
   - Send a message
   - Trigger purchase intent keyword
   - Fill form and submit
   - Check Airtable for lead

2. ✅ Test **Voice Call**:
   - Click Voice Call button (purple)
   - Allow microphone
   - Speak and end call
   - Fill post-call form
   - Check Airtable for lead

3. ✅ **Verify Telegram notification** sent to team

---

## QUICK COMMAND REFERENCE

```bash
# SSH into VPS if needed
ssh -i ~/.ssh/id_ed25519 root@31.97.38.30

# Check N8N logs
docker logs n8n | tail -50

# Test webhook from command line
curl -X POST https://n8n-production-9357c.up.railway.app/webhook/os0cT9GcMTFSldKz \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","phone":"+39 123","service":"test"}'
```

---

**Time estimate**: 5 minutes  
**Difficulty**: Easy (just adding 1 node)  
**Impact**: HIGH (enables all Chat AI & Voice Call leads)

Ready? Open N8N and add the HTTP Webhook trigger now! 🚀
