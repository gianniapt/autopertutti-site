# 🔴 ACTIVATE N8N WORKFLOW NOW

**This is the ONE thing blocking full production status.**

⏱️ **Time**: 5 minutes  
🎯 **Goal**: Toggle workflow to "Active" in N8N dashboard  
📊 **Impact**: Leads will flow to Airtable immediately after

---

## The Problem (Right Now)

```
✅ Chat AI: Working
✅ Voice Call: Working  
✅ Lead Forms: Working
✅ API /api/leads: Working
❌ Airtable: Empty (N8N webhook not active)
```

**Reason**: N8N workflow is saved but not activated

---

## The Solution (3 Steps)

### Step 1: Open N8N Dashboard
```
https://n8n-production-9357c.up.railway.app
```

### Step 2: Find Workflow
1. Look for: **`AutoPerTutti — Lead Pipeline`**
2. Click to open
3. Click **Edit** button

### Step 3: Activate Workflow
In the top-right area of the editor, find the **Active/Inactive toggle** and click it.

You should see:
- Status changes to "Active" (green indicator)
- Workflow becomes enabled

**That's it!** You're done.

---

## How to Verify It Worked

### Method 1: Check Workflow Status
```
Dashboard → Workflow list
Look for "AutoPerTutti — Lead Pipeline"
Status should show: 🟢 Active
```

### Method 2: Test with cURL
```bash
curl -X POST "https://n8n-production-9357c.up.railway.app/webhook/os0cT9GcMTFSldKz" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","phone":"+39 123","service":"ai_chat"}'

# Should return something like {"status":"ok"} or 200 OK
# (NOT 404 "not registered" error)
```

### Method 3: Check Airtable
```
1. Open: https://airtable.com
2. Base: Auto Per Tutti
3. Table: Leads
4. Look for test record
```

---

## Immediate Test on Production

After activating:

```
1. Go to: https://autopertutti-site-one.vercel.app
2. Click red FAB (bottom-right)
3. Click "Chat AI"
4. Type: "Vorrei fare un appuntamento"
5. Lead form appears
6. Fill: Name, Phone, Email
7. Click Submit
8. Wait 3 seconds
9. Check Airtable → Should see new record
10. Check Telegram → Team should get notification
```

---

## If You Can't Find the Toggle

**Most common issue**: The toggle is in a different location than expected

**Solutions** (in order):

1. **Look harder in top-right**
   - Check next to "Save" button
   - Check in a dropdown menu (⋮)
   - Look for power icon or toggle switch

2. **Try the Settings icon**
   - Click ⚙️ if visible
   - Look for "Workflow Status" option
   - Click Activate

3. **Check left sidebar**
   - Go to "Executions" tab
   - Look for status controls there

4. **Last resort: Read the manual**
   - Full troubleshooting: See `N8N_ACTIVATION_MANUAL.md`
   - Includes screenshots and alternative solutions

---

## After Activation

Everything should work automatically:

```
Lead Capture (Chat or Voice)
         ↓
  /api/leads (API)
         ↓
  N8N Webhook ← NOW ACTIVE ✅
         ↓
  Classify & Process
         ↓
  Airtable Update ✅
         ↓
  Telegram Notification ✅
         ↓
  🎉 COMPLETE
```

---

## Status Check (How to Know It's Working)

**In Vercel Logs**, you should see:
```
[N8N SUCCESS] Lead forwarded to N8N workflow
```

(Not the old `[FALLBACK]` message)

---

## One More Thing

The toggle SHOULD be easy to find — N8N puts it in a prominent location so users can activate/deactivate workflows. If you genuinely cannot find it after checking all the places above, see the "Can't Find Toggle" section in `N8N_ACTIVATION_MANUAL.md`.

---

**This is really the final step. Just click one toggle and everything comes online.**

🚀 **Do it now!**
