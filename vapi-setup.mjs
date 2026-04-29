import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

// Simple temporary email generator
const generateTempEmail = () => `vapi-${Date.now()}-${Math.random().toString(36).slice(2, 7)}@tempmail.io`;

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  let page;

  try {
    console.log('🚀 VAPI Setup Automation\n================================\n');

    page = await browser.newPage();

    // Step 1: Generate credentials
    const tempEmail = generateTempEmail();
    const tempPassword = `VapiPass${Date.now()}!@`;

    console.log(`📧 Generated temporary email: ${tempEmail}`);
    console.log(`🔐 Generated password: ${tempPassword}\n`);

    // Step 2: Navigate to VAPI signup
    console.log('⏳ Navigating to VAPI signup page...');
    await page.goto('https://dashboard.vapi.ai/auth/signup', {
      waitUntil: 'networkidle',
      timeout: 60000
    });

    console.log('✓ Page loaded\n');
    await page.screenshot({ path: 'vapi-01-signup-page.png' });

    // Wait for page to fully render
    await page.waitForTimeout(2000);

    // Step 3: Find and fill email input
    console.log('⏳ Looking for email input field...');
    const emailInputs = await page.locator('input[type="email"]').count();

    if (emailInputs > 0) {
      console.log(`✓ Found ${emailInputs} email input(s)`);
      await page.locator('input[type="email"]').first().fill(tempEmail);
      console.log(`✓ Email filled: ${tempEmail}`);
    } else {
      console.log('⚠️  No email input found, trying alternative selectors');
      try {
        await page.fill('input[name*="email"]', tempEmail);
        console.log('✓ Filled via name selector');
      } catch {
        console.log('❌ Could not find email input');
      }
    }

    // Step 4: Find and fill password
    console.log('⏳ Looking for password input field...');
    const passwordInputs = await page.locator('input[type="password"]').count();

    if (passwordInputs > 0) {
      console.log(`✓ Found ${passwordInputs} password input(s)`);
      await page.locator('input[type="password"]').first().fill(tempPassword);
      console.log(`✓ Password filled\n`);
    }

    await page.screenshot({ path: 'vapi-02-form-filled.png' });

    // Step 5: Submit form
    console.log('⏳ Looking for signup button...');
    const buttons = await page.locator('button').allTextContents();
    console.log(`Available buttons: ${buttons.join(', ')}\n`);

    // Try multiple approaches to find signup button
    let clicked = false;

    try {
      const signupBtn = await page.locator('button').filter({ hasText: 'Sign Up' }).first();
      if (await signupBtn.isVisible()) {
        console.log('✓ Found signup button, clicking...');
        await signupBtn.click();
        clicked = true;
        console.log('✓ Clicked signup\n');
      }
    } catch (e) {
      console.log('⚠️  Alternative button selection attempt...');
      try {
        await page.click('button:nth-of-type(4)'); // "Sign Up" is often the 4th button
        clicked = true;
        console.log('✓ Clicked via nth-of-type\n');
      } catch {
        console.log('⚠️  Button click failed\n');
      }
    }

    if (clicked) {

      // Wait for navigation
      await page.waitForTimeout(4000);
      await page.screenshot({ path: 'vapi-03-after-signup.png' });

      const newUrl = page.url();
      console.log(`📍 Current URL: ${newUrl}\n`);

      // Check if we need email verification
      if (newUrl.includes('verify') || newUrl.includes('confirm')) {
        console.log('⚠️  Email Verification Required');
        console.log('───────────────────────────────');
        console.log(`📧 Verification email sent to: ${tempEmail}`);
        console.log('⏱️  Check email within 15 minutes');
        console.log('💡 Temporary email services might have delay\n');
      } else if (newUrl.includes('dashboard')) {
        console.log('✅ Successfully signed up!\n');
      }
    } else {
      console.log('⚠️  Could not automatically click signup button');
      console.log('Manual intervention may be required in browser window\n');
    }

    // Step 6: Instructions
    console.log('\n📋 Next Steps:');
    console.log('═════════════════════════════════════════════');
    console.log('1. Complete email verification (if required)');
    console.log('2. Log in to https://dashboard.vapi.ai');
    console.log('3. Go to: Settings → API Keys → Create Key');
    console.log('4. Create new Assistant with these settings:');
    console.log('   • Name: Auto Per Tutti AI');
    console.log('   • Language: Italian (it-IT)');
    console.log('   • Voice: Azure DiegoNeural');
    console.log('5. Copy Public Key and Assistant ID');
    console.log('6. Run: npm run setup-vapi <API_KEY>');
    console.log('\n🔑 Or manually update .env.local:');
    console.log('   NEXT_PUBLIC_VAPI_PUBLIC_KEY=<key>');
    console.log('   NEXT_PUBLIC_VAPI_ASSISTANT_ID=<id>');

    // Save credentials for reference
    const credsFile = path.join(process.cwd(), 'vapi-temp-credentials.txt');
    fs.writeFileSync(credsFile, `VAPI Temporary Setup Credentials\n================================\n\nEmail: ${tempEmail}\nPassword: ${tempPassword}\n\nGenerated: ${new Date().toISOString()}\n\nNote: These are temporary credentials for account creation.\nAfter setup, secure credentials will be stored in Vercel environment variables.\n`);
    console.log(`\n📄 Credentials saved to: ${credsFile}`);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (page) await page.screenshot({ path: 'vapi-error.png' });
  } finally {
    if (page) {
      console.log('\n⏳ Keeping browser open for 60 seconds for manual steps...');
      await page.waitForTimeout(60000);
    }
    await browser.close();
  }
})().catch(console.error);
