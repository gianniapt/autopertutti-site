import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, service } = body;

    // Validate
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const leadData = {
      name,
      email,
      phone,
      message,
      service,
      timestamp: new Date().toISOString(),
      source: service === "ai_chat" ? "ai_chat" : service === "voice_call" ? "voice_call" : "website",
      channel: service === "ai_chat" ? "Chat AI" : service === "voice_call" ? "Voice Call VAPI" : "Form",
    };

    // Always log lead locally (for monitoring and as fallback)
    console.log("[LEAD RECEIVED]", JSON.stringify(leadData, null, 2));

    // Send to N8N webhook (if configured)
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      try {
        const n8nResponse = await fetch(n8nWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadData),
          signal: AbortSignal.timeout(5000), // 5 second timeout
        });

        if (n8nResponse.ok) {
          console.log("[N8N SUCCESS] Lead forwarded to N8N workflow");
          return NextResponse.json(
            { success: true, message: "Lead received and processed" },
            { status: 200, headers: corsHeaders }
          );
        } else {
          const errorText = await n8nResponse.text();
          console.warn("[N8N ERROR] N8N webhook failed:", n8nResponse.status, errorText);
        }
      } catch (fetchError) {
        console.warn("[N8N TIMEOUT] Failed to reach N8N webhook:", fetchError);
      }
    }

    // If N8N fails/times out, still accept the lead (fallback behavior)
    console.log("[FALLBACK] Lead accepted locally. N8N not reached. Check N8N workflow activation status.");
    return NextResponse.json(
      {
        success: true,
        message: "Lead received successfully",
        warning: "N8N workflow may not be active. Check N8N dashboard."
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("[API ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
