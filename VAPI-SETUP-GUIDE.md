# VAPI Setup Guide - Auto Per Tutti

## Overview
The AI chat and voice call features are implemented. Now we need to configure VAPI with your own credentials.

## Option 1: Quick Setup (Recommended)

### Step 1: Create VAPI Account
1. Go to https://dashboard.vapi.ai
2. Click "Sign Up"
3. Use your email or login with Google/GitHub/Discord
4. Verify your email address

### Step 2: Create API Key
1. In the dashboard, go to **Settings** (gear icon)
2. Click **API Keys**
3. Click **Create New Key**
4. Copy the key (save it temporarily)

### Step 3: Create Assistant
1. In the dashboard, click **Assistants**
2. Click **Create New Assistant**
3. Fill in the settings:

**Name:**
```
Auto Per Tutti AI Assistant
```

**Model Settings:**
- Provider: OpenRouter or OpenAI
- Model: gpt-4o-mini
- Copy-paste this system prompt:

```
Sei l'assistente virtuale di Auto Per Tutti. Parla SEMPRE in italiano, tono cordiale.
Sii conciso (max 3-4 paragrafi). Non inventare dati.

SEDI:
1. Agnano (principale): Via Circumflegrea, Pozzuoli (NA) — Lun-Ven 9-19, Sab 9-17
2. Napoli: Via Nuova Agnano — Lun-Sab 9-19
3. Carrara: Via Carriona — Lun-Sab 9-18
Tel: 081 576 3372 | WhatsApp: +39 379 113 7917 | Email: info@autopertutti.it

VENDITA AUTO: Multimarca (BMW, VW, Fiat, Renault, ecc.)
Garanzia 12 mesi, finanziamento rapido, permuta. Prezzi da €8.800.

NOLEGGIO BREVE: da €7/giorno (city car), €8-9/giorno (compatte)
NOLEGGIO NLT: da €210/mese (Lancia Ypsilon, Fiat Panda Hybrid)

OFFICINA: tagliando da €89, freni da €120, pneumatici da €15, diagnosi Bosch da €49, revisione da €79, clima da €59.
Garanzia 12 mesi su tutti gli interventi.

AUTOLAVAGGIO: Basic €15/auto, Premium €35/auto, VIP €75/auto (ceratura Carnauba).

Quando il cliente mostra interesse concreto, chiedi nome e telefono per essere ricontattato entro 30 minuti.
```

**Voice Settings:**
- Provider: Azure (or ElevenLabs if preferred)
- Voice ID: `it-IT-DiegoNeural` (for Azure) or select Italian voice
- First Message: "Ciao! Sono l'assistente di Auto Per Tutti. Come posso aiutarti?"

4. Click **Create**

### Step 4: Get Your Credentials
1. After creating assistant, click on it to open details
2. Copy the **Public Key**
3. Copy the **Assistant ID**

### Step 5: Update Environment Variables

#### Option A: Local Testing (.env.local)
```bash
NEXT_PUBLIC_VAPI_PUBLIC_KEY=<your-public-key>
NEXT_PUBLIC_VAPI_ASSISTANT_ID=<your-assistant-id>
```

Then restart dev server:
```bash
npm run dev
```

#### Option B: Production (Vercel)
```bash
vercel env add NEXT_PUBLIC_VAPI_PUBLIC_KEY
# Paste your public key when prompted

vercel env add NEXT_PUBLIC_VAPI_ASSISTANT_ID
# Paste your assistant ID when prompted

# Then deploy
vercel deploy --prod
```

---

## Option 2: Automated Setup (If You Have API Key)

If you already have a VAPI API key, run:

```bash
npm run setup-vapi <your-api-key>
```

This script will:
- ✓ Create assistant with Italian settings automatically
- ✓ Extract credentials
- ✓ Update Vercel environment variables
- ✓ Deploy the site

---

## Testing the Features

### Test AI Chat
1. Go to https://autopertutti-site-one.vercel.app (or your dev server)
2. Click the red chat bubble (FAB) at bottom-right
3. Click "Chat AI" button
4. Ask: "Quanto costa un tagliando?"
5. You should get a response about oil change pricing (€89)

### Test AI Voice Call
1. Click the red chat bubble again
2. Click "Chiama AI" button (purple, bottom option)
3. Browser will prompt for microphone access - allow it
4. Speak to the AI! It will respond in Italian

### Test Lead Capture
1. In the chat, ask: "Vorrei fare un appuntamento"
2. A lead form should appear
3. Fill in name, phone, email
4. Submit the form
5. Lead should be captured in N8N/Airtable

---

## Troubleshooting

### Voice Call Not Working
- Check that VAPI_PUBLIC_KEY and VAPI_ASSISTANT_ID are set correctly
- Check browser console for errors (F12 → Console)
- Ensure browser has microphone permission

### Chat Not Responding
- Verify OpenRouter API key is valid (check OPENROUTER_API_KEY in .env.local)
- Check browser console for error messages
- Confirm /api/chat endpoint is responding

### Deploy After Changes
```bash
# After updating .env.local or environment variables
npm run build
vercel deploy --prod
```

---

## Free Tier Limits
- VAPI free: 10 minutes of voice calls per month
- After that, upgrade plan at https://dashboard.vapi.ai/settings/billing
- Text chat (OpenRouter) has its own pricing

---

## Support
- VAPI Docs: https://docs.vapi.ai
- OpenRouter Docs: https://openrouter.ai/docs
- If issues persist, check:
  1. Browser console (F12)
  2. Vercel deployment logs: https://vercel.com/dashboard
  3. Network tab to see API responses
