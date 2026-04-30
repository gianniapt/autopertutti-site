# 🔴 CRITICAL: How to Activate N8N Workflow for Production

**Status**: Workflow created but NOT ACTIVE → leads are captured locally but NOT reaching Airtable/CRM  
**Time to Fix**: 3-5 minutes  
**Difficulty**: Easy

---

## ⚠️ Current Situation

- ✅ Chat AI and Voice Call are working on production
- ✅ Leads are being captured and logged to Vercel console
- 🔴 **Leads are NOT reaching Airtable/CRM because N8N workflow isn't active**
- 📊 View captured leads in Vercel logs: https://vercel.com/giannis-projects-9f89c1a2/autopertutti-site

---

## The Problem

N8N has two webhook URL types:
1. **Test URL** (`/webhook-test/...`) — Works immediately, but one-time use
2. **Production URL** (`/webhook/...`) — Requires workflow to be "Active"

Currently, the production URL is being used but returns 404 because the workflow isn't active.

**Error Message**:
```
The workflow must be active for a production URL to run successfully.
You can activate the workflow using the toggle in the top-right of the editor.
```

---

## Solution: Activate the Workflow

### Step 1: Open N8N Dashboard

**Production Dashboard** (recommended):
```
https://n8n-production-9357c.up.railway.app
```

**Local Dashboard** (if running locally):
```
http://localhost:5678
```

---

### Step 2: Find and Open the Workflow

1. In N8N dashboard, find the workflow list
2. Look for: **`AutoPerTutti — Lead Pipeline`**
3. Click to open the workflow
4. Click **Edit** button (if in view mode)

You should see the workflow canvas with nodes like:
- Telegram Webhook
- WhatsApp Webhook  
- HTTP Webhook (the one we added)
- Merge Channels
- Claude Classification
- Airtable Create Lead
- Notifications

---

### Step 3: Locate the Activation Toggle

**In the top toolbar of the editor, look for**:
- A button that says **"Active"** / **"Inactive"** or
- A **toggle switch** near workflow name or in the top-right
- Or a **play button** icon
- Or menu option: **"Workflow"** → **"Activate"**

### Where to Look (Priority Order):

1. **Top-right toolbar** - Most common location
   - Next to "Save" button
   - May look like a power icon or toggle

2. **Top-left (near workflow name)**
   - Next to "AutoPerTutti — Lead Pipeline"
   - May show current status

3. **"More" menu** (three dots)
   - Click menu → look for "Activate" option

4. **Left sidebar**
   - Executions tab might show status
   - May have activation control

5. **Settings dialog**
   - Click ⚙️ icon if visible
   - Look for "Workflow Status" or similar

---

### Step 4: Click to Activate

Once found, click the toggle/button to **activate** the workflow.

**You should see**:
- Status change to "Active" ✅
- Green indicator or checkmark
- Possibly: Workflow transitions to enabled state

---

### Step 5: Verify Activation

After activating:
1. The workflow should show as **"Active"** (green status)
2. Close the workflow editor
3. The workflow should remain active in the list view
4. No error message about "must be active"

---

## If You Can't Find the Toggle

If the toggle isn't visible in the UI (N8N versions vary), try these alternatives:

### Alternative 1: Use N8N CLI (If SSH Access Available)

```bash
# SSH into the N8N server
ssh -i ~/.ssh/id_ed25519 root@31.97.38.30

# Find and activate the workflow via N8N CLI
docker exec -it n8n n8n export:workflow --id os0cT9GcMTFSldKz
# Then activate via API or UI
```

### Alternative 2: Use N8N REST API

If you have an API key (ask admin for `X-N8N-API-KEY`):

```bash
# Activate workflow via REST API
curl -X PATCH "https://n8n-production-9357c.up.railway.app/api/v1/workflows/os0cT9GcMTFSldKz" \
  -H "X-N8N-API-KEY: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"active": true}'
```

### Alternative 3: Recreate Webhook Trigger

If the toggle is truly missing, you can:
1. Delete the HTTP Webhook node from the workflow
2. Add a new one with the same settings
3. Save and try activating again
4. Sometimes this refreshes the UI and makes the toggle visible

---

## Testing After Activation

### Test 1: Direct Webhook Call

```bash
curl -X POST "https://n8n-production-9357c.up.railway.app/webhook/os0cT9GcMTFSldKz" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+39 1234567890",
    "service": "ai_chat"
  }'
```

**Expected Response**:
```json
{"status": "ok"}
```

Or N8N might return `200 OK` with no body. Either means success.

### Test 2: Check N8N Executions

1. Open N8N workflow
2. Click **"Executions"** tab
3. You should see your test webhook call
4. Status should show **"Success"** ✅

### Test 3: Check Airtable

1. Open Airtable: https://airtable.com
2. Base: **`Auto Per Tutti`**
3. Table: **`Leads`**
4. You should see the test lead record

---

## After Activation: Full End-to-End Test

### Test Chat AI Flow
```
1. Go to: https://autopertutti-site-one.vercel.app
2. Click red FAB button (bottom-right)
3. Click "Chat AI"
4. Type: "Vorrei un appuntamento"
5. Lead form should appear
6. Fill form and submit
7. Check Airtable → Should see new record within 3 seconds
8. Check Telegram → Team should get notification
```

### Test Voice Call Flow
```
1. Go to: https://autopertutti-site-one.vercel.app
2. Click red FAB button (bottom-right)
3. Click "Chiama AI" (purple button)
4. Allow microphone when prompted
5. Speak: "Grazie, arrivederci" to end call
6. Fill post-call form
7. Check Airtable → Should see new record within 3 seconds
8. Check Telegram → Team should get notification
```

---

## Troubleshooting

### ❌ "Webhook not registered" error

**Cause**: Workflow is Published but not Active

**Solution**: Go back to Step 3-4 and click the activation toggle

### ❌ "404 Not Found" from production URL

**Same issue**: Workflow not active

**Temporary Fix**: Use test webhook URL instead
```bash
curl -X POST "https://n8n-production-9357c.up.railway.app/webhook-test/os0cT9GcMTFSldKz" \
  -H "Content-Type: application/json" \
  -d '{...}'
```
*(Note: Test URL requires clicking "Execute workflow" button in UI first, and works only once)*

### ❌ Toggle is invisible/grayed out

**Cause**: Unsaved changes or UI bug

**Solution**:
1. Save the workflow first (`Ctrl+S`)
2. Refresh page (`F5`)
3. Try to find toggle again
4. If still missing, try Alternative solutions (CLI/API/Recreate)

### ❌ Leads appear in N8N but not in Airtable

**Cause**: N8N workflow is active, but Airtable integration broken

**Solution**:
1. Check N8N Executions tab
2. Click on the failed execution
3. Look at error message in "Airtable Create Lead" node
4. Common issues:
   - Airtable API token expired
   - Base ID or Table ID incorrect
   - Field mapping wrong

### ❌ Vercel logs show leads but Airtable empty

**Both of these are true**:
- ✅ `/api/leads` endpoint working
- ❌ N8N workflow NOT active OR broken

**Check**:
1. N8N workflow status (is it active?)
2. N8N Executions tab for errors
3. N8N node-by-node: which step is failing?

---

## Success Criteria ✅

Once activated, you should see:

1. **N8N Dashboard**: Workflow shows as "Active" (green)
2. **N8N Executions**: Recent successful executions from webhooks
3. **Airtable**: New leads appearing in "Leads" table within 3 seconds of form submission
4. **Telegram**: Team channel receiving lead notifications
5. **Vercel Logs**: `[N8N SUCCESS]` messages (not `[FALLBACK]` messages)
6. **No errors** in Vercel console logs

---

## Quick Checklist

- [ ] Opened N8N dashboard
- [ ] Found "AutoPerTutti — Lead Pipeline" workflow
- [ ] Found the activation toggle/button
- [ ] Clicked to activate workflow
- [ ] Workflow now shows "Active" status (green)
- [ ] Tested with curl command → got success response
- [ ] N8N Executions tab shows successful execution
- [ ] New test record appears in Airtable
- [ ] Test complete lead capture flow (Chat AI + form)
- [ ] Test Voice Call flow
- [ ] Verified team Telegram notification received

---

## Next Steps

Once workflow is activated:

1. ✅ All leads from Chat AI → Airtable
2. ✅ All leads from Voice Call → Airtable  
3. ✅ Team gets Telegram notifications
4. ✅ Full system is operational

**Status**: 🟢 LIVE IN PRODUCTION

---

## Need Help?

1. **Can't find the toggle?** → Check "If You Can't Find the Toggle" section
2. **Webhook not working?** → Check "Troubleshooting" section
3. **Still stuck?** → Check N8N logs: `docker logs n8n | tail -100`

---

**Time**: 3-5 minutes  
**Importance**: CRITICAL — Without this, leads won't reach your CRM  
**Status**: This is the LAST remaining step to full operational status

🚀 **Activate the workflow now!**
