import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, service } = body;

    // Validate
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    // Send to N8N webhook
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!n8nWebhookUrl) {
      console.error("N8N_WEBHOOK_URL not configured");
      return NextResponse.json(
        { error: "Lead processing is not configured" },
        { status: 500 }
      );
    }

    const leadData = {
      name,
      email,
      phone,
      message,
      service,
      timestamp: new Date().toISOString(),
      source: "website",
    };

    // Forward to N8N
    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadData),
    });

    if (!n8nResponse.ok) {
      console.error("N8N webhook failed:", n8nResponse.status);
      return NextResponse.json(
        { error: "Failed to process lead" },
        { status: 500 }
      );
    }

    // Also log locally
    console.log("Lead received:", leadData);

    return NextResponse.json(
      { success: true, message: "Lead received successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
