const leadData = {
  name: "Mario Rossi",
  email: "mario@example.com",
  phone: "+39 081 576 3372",
  message: "Interessato a una Volkswagen Golf usata",
  service: "vendita"
};

console.log("📝 Testing Lead Form Flow...\n");
console.log("📊 Lead Data:", leadData);

// Update env to use real N8N
process.env.N8N_WEBHOOK_URL = 'https://n8n-production-9357c.up.railway.app/webhook/os0cT9GcMTFSldKz';

async function testFlow() {
  try {
    console.log("\n🌐 Sending to N8N webhook...");
    const response = await fetch(process.env.N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...leadData,
        timestamp: new Date().toISOString(),
        source: "website"
      })
    });

    console.log(`✅ N8N Response Status: ${response.status}`);
    
    if (response.ok) {
      console.log("✨ SUCCESS! Lead should be saved in Airtable");
    } else {
      const error = await response.json();
      console.log("⚠️  Error:", error);
      console.log("\n🔧 FIX: Activate workflow toggle in N8N dashboard (top-right)");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

testFlow();
