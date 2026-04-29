import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Mock webhook received:", body);
    return NextResponse.json({ success: true, message: "Lead logged to mock webhook" });
  } catch (error) {
    console.error("Mock webhook error:", error);
    return NextResponse.json({ error: "Mock webhook error" }, { status: 500 });
  }
}
