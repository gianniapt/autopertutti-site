export async function GET() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const siteUrl = "https://autopertutti-site-one.vercel.app";

  if (!token) {
    return Response.json({ error: "TELEGRAM_BOT_TOKEN not set" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/setWebhook?url=${siteUrl}/api/telegram-webhook`);
    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error("[TELEGRAM SETUP ERROR]", error);
    return Response.json({ error: "Failed to register webhook" }, { status: 500 });
  }
}
