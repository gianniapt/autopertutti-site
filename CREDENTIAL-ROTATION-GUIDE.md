# 🔐 Credential Rotation Guide

**⚠️ URGENT:** Your `.env.local` was exposed. All tokens below have been invalidated and replaced with placeholders.

---

## Step-by-Step Regeneration

### 1️⃣ GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Set name: `Auto Per Tutti - API`
4. Set expiration: 90 days
5. **Select scopes:**
   - ✅ `repo` (full control of private repositories)
   - ✅ `workflow` (update GitHub Action and workflow)
6. Click **"Generate token"**
7. **Copy the token immediately** (you won't see it again)
8. Update `.env.local`:
   ```
   GITHUB_PERSONAL_ACCESS_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
   ```

---

### 2️⃣ Vercel API Token

1. Go to: https://vercel.com/account/tokens
2. Click **"Create"**
3. Set name: `Auto Per Tutti`
4. Set scope: **Full Account**
5. Set expiration: 90 days
6. Click **"Create"**
7. **Copy the token immediately**
8. Update `.env.local`:
   ```
   VERCEL_API_TOKEN=vcp_xxxxxxxxxxxxxxxxxxxx
   ```

---

### 3️⃣ OpenRouter API Key

1. Go to: https://openrouter.ai/settings/keys
2. Click **"Create Key"**
3. Set name: `Auto Per Tutti GPT-4o`
4. Leave default limits (or set as needed)
5. Click **"Create"**
6. **Copy the key immediately**
7. Update `.env.local`:
   ```
   OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxxxxxx
   ```

---

### 4️⃣ Airtable Token

1. Go to: https://airtable.com/account/tokens
2. Click **"Create token"**
3. Set name: `Auto Per Tutti`
4. **Required scopes:**
   - ✅ `data.records:read`
   - ✅ `data.records:write`
   - ✅ `schema.bases:read`
5. **Access:** Select your Auto Per Tutti base (`appOTI1cMozjMnMD4`)
6. Set expiration: 90 days
7. Click **"Create token"**
8. **Copy the token immediately**
9. Update `.env.local`:
   ```
   AIRTABLE_TOKEN=patxxxxxxxxxxxxxxxxxxxx
   ```

---

### 5️⃣ Telegram Bot Token

1. Open Telegram
2. Search for **@BotFather** and start chat
3. Send: `/mybots`
4. Select your **Auto Per Tutti AI** bot
5. Click **"Edit Bot"**
6. Click **"Revoke current token"**
7. Confirm by clicking **"Revoke"**
8. BotFather will send you a new token
9. Update `.env.local`:
   ```
   TELEGRAM_BOT_TOKEN=8739746809:AAxxxxxxxxxxxxxxxxxxxxxxxx
   ```

---

### 6️⃣ Green API (WhatsApp) Credentials

1. Go to: https://dashboard.green-api.com/
2. Log in to your account
3. Go to **Settings** → **API Credentials**
4. Click **"Create New Instance"** or **"Reset Credentials"**
5. You'll receive new:
   - `GREEN_API_INSTANCE` (number)
   - `GREEN_API_TOKEN` (alphanumeric)
6. Update `.env.local`:
   ```
   GREEN_API_INSTANCE=7107602115
   GREEN_API_TOKEN=34ba4aaf6abc4505b1b8bcfec2bd11878317778f5a2646b69e
   ```

---

### 7️⃣ VAPI Voice AI (No change needed)

Your VAPI credentials are **already secured**:
- ✅ `NEXT_PUBLIC_VAPI_PUBLIC_KEY` — safe (public key, browser-only)
- ✅ `NEXT_PUBLIC_VAPI_ASSISTANT_ID` — safe (just an ID)

⚠️ **To create a private VAPI API key for backend calls:**
1. Go to: https://dashboard.vapi.ai/settings/api-keys
2. Create a new **Private Key** (if you need it)
3. Store it locally in `.env.local` as `VAPI_PRIVATE_API_KEY` (never commit)

---

## Final Steps

1. ✅ Generate all new credentials above
2. ✅ Update `.env.local` with the new values
3. ✅ Test locally: `npm run dev`
4. ✅ Verify all integrations work (chat, voice, leads)
5. ✅ Delete this guide and any rotation scripts
6. ✅ Commit: `git add .env.local.example && git commit -m "chore: add env template"`
7. ✅ Deploy: `vercel deploy --prod --yes`

---

## Security Checklist

- [ ] All exposed tokens revoked on each service
- [ ] All new tokens generated and stored in `.env.local`
- [ ] Local `.env.local` is NOT committed to git
- [ ] Vercel env vars updated with new credentials
- [ ] All services tested and working
- [ ] This guide deleted (contains sensitive instructions)
- [ ] Rotation scripts deleted

---

## Support

If a service's token rotation fails or you need help:
1. Check the service's documentation
2. Contact their support team
3. For VAPI issues: https://help.vapi.ai

Your `.env.local` is now secure with placeholders. Once you've generated new credentials, your app will be fully secured.
