#!/usr/bin/env node
import https from 'https';
import { execSync } from 'child_process';
import fs from 'fs';

const apiKey = process.argv[2];

if (!apiKey) {
  console.error('❌ Usage: node setup-vapi-api.mjs <VAPI_API_KEY>');
  console.error('\nExample:');
  console.error('  node setup-vapi-api.mjs pa_xxxxx...');
  process.exit(1);
}

console.log('🚀 VAPI Assistant Setup via API');
console.log('════════════════════════════════\n');

// Make API request to create assistant
const requestData = JSON.stringify({
  name: 'Auto Per Tutti AI Assistant',
  model: {
    provider: 'openrouter',
    model: 'openai/gpt-4o-mini',
    systemPrompt: `Sei l'assistente virtuale di Auto Per Tutti. Parla SEMPRE in italiano, tono cordiale.
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

Quando il cliente mostra interesse concreto, chiedi nome e telefono per essere ricontattato entro 30 minuti.`
  },
  voice: {
    provider: 'azure',
    voiceId: 'it-IT-DiegoNeural'
  },
  firstMessageMode: 'assistant-speaks',
  firstMessage: "Ciao! Sono l'assistente di Auto Per Tutti. Come posso aiutarti?"
});

const options = {
  hostname: 'api.vapi.ai',
  path: '/assistant',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(requestData)
  }
};

console.log('⏳ Creating VAPI Assistant...');

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode !== 201 && res.statusCode !== 200) {
      console.error(`\n❌ API Error (${res.statusCode}):`);
      console.error(data);
      process.exit(1);
    }

    try {
      const response = JSON.parse(data);
      const publicKey = response.publicKey;
      const assistantId = response.id;

      if (!publicKey || !assistantId) {
        console.error('❌ Invalid response from VAPI API');
        console.error(JSON.stringify(response, null, 2));
        process.exit(1);
      }

      console.log('✓ Assistant created successfully!\n');
      console.log('📋 Credentials:');
      console.log(`  Public Key: ${publicKey}`);
      console.log(`  Assistant ID: ${assistantId}\n`);

      // Update .env.local
      console.log('⏳ Updating .env.local...');
      let envContent = fs.readFileSync('.env.local', 'utf8');

      // Replace or add VAPI keys
      if (envContent.includes('NEXT_PUBLIC_VAPI_PUBLIC_KEY=')) {
        envContent = envContent.replace(/NEXT_PUBLIC_VAPI_PUBLIC_KEY=.*/g, `NEXT_PUBLIC_VAPI_PUBLIC_KEY=${publicKey}`);
      } else {
        envContent += `\nNEXT_PUBLIC_VAPI_PUBLIC_KEY=${publicKey}`;
      }

      if (envContent.includes('NEXT_PUBLIC_VAPI_ASSISTANT_ID=')) {
        envContent = envContent.replace(/NEXT_PUBLIC_VAPI_ASSISTANT_ID=.*/g, `NEXT_PUBLIC_VAPI_ASSISTANT_ID=${assistantId}`);
      } else {
        envContent += `\nNEXT_PUBLIC_VAPI_ASSISTANT_ID=${assistantId}`;
      }

      fs.writeFileSync('.env.local', envContent);
      console.log('✓ .env.local updated\n');

      // Check for Vercel token
      const vercelToken = process.env.VERCEL_TOKEN || '';
      if (vercelToken) {
        console.log('⏳ Updating Vercel environment variables...');
        try {
          execSync(`vercel env add NEXT_PUBLIC_VAPI_PUBLIC_KEY --token ${vercelToken}`, { input: publicKey });
          execSync(`vercel env add NEXT_PUBLIC_VAPI_ASSISTANT_ID --token ${vercelToken}`, { input: assistantId });
          console.log('✓ Vercel environment variables updated\n');

          console.log('⏳ Deploying to production...');
          execSync('vercel deploy --prod --yes', { stdio: 'inherit' });
          console.log('\n✓ Deployment complete!\n');
        } catch (e) {
          console.log('⚠️  Could not update Vercel automatically');
          console.log('Manual steps:');
          console.log(`  1. Run: vercel env add NEXT_PUBLIC_VAPI_PUBLIC_KEY`);
          console.log(`  2. Paste: ${publicKey}`);
          console.log(`  3. Run: vercel env add NEXT_PUBLIC_VAPI_ASSISTANT_ID`);
          console.log(`  4. Paste: ${assistantId}`);
          console.log('  5. Run: vercel deploy --prod\n');
        }
      } else {
        console.log('💡 Update Vercel environment variables:');
        console.log(`  1. Go to: https://vercel.com/dashboard/project-settings`);
        console.log(`  2. Add Environment Variable:`);
        console.log(`     Name: NEXT_PUBLIC_VAPI_PUBLIC_KEY`);
        console.log(`     Value: ${publicKey}`);
        console.log(`  3. Add Environment Variable:`);
        console.log(`     Name: NEXT_PUBLIC_VAPI_ASSISTANT_ID`);
        console.log(`     Value: ${assistantId}`);
        console.log(`  4. Deploy: vercel deploy --prod\n`);
      }

      console.log('✓ Setup complete!');
      console.log('\n🎉 Your AI chat and voice call features are now live!\n');

    } catch (error) {
      console.error('❌ Error parsing response:', error.message);
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request error:', error.message);
  process.exit(1);
});

req.write(requestData);
req.end();
