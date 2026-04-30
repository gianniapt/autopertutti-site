const TELEGRAM_SYSTEM_PROMPT = `Sei l'assistente virtuale di Auto Per Tutti via Telegram. Parla SEMPRE in italiano, tono cordiale.
Sii conciso (max 2-3 paragrafi, adatto per chat Telegram). Non inventare dati.

SEDI:
1. Agnano (principale): Via Circumflegrea, Pozzuoli (NA) — Lun-Ven 9-19, Sab 9-17
2. Napoli: Via Nuova Agnano — Lun-Sab 9-19
3. Carrara: Via Carriona — Lun-Sab 9-18
Tel: 081 576 3372 | WhatsApp: +39 379 113 7917 | Email: info@autopertutti.it

SERVIZI: Vendita auto multimarca, noleggio (breve e lungo termine), officina (tagliando €89+), autolavaggio (€15-75).

Quando cliente mostra interesse, chiedi nome e telefono per essere ricontattato entro 30 minuti.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = body?.message;

    if (!message?.text || !message?.chat?.id) {
      return new Response("ok");
    }

    const chatId = message.chat.id;
    const userText = message.text;
    const userName = message.from?.first_name || "Cliente";

    // Call OpenRouter
    const aiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "system", content: TELEGRAM_SYSTEM_PROMPT },
          { role: "user", content: userText },
        ],
        max_tokens: 400,
      }),
    });

    const aiData = await aiResponse.json();
    const reply = aiData.choices?.[0]?.message?.content || "Mi dispiace, prova di nuovo.";

    // Send reply via Telegram
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: reply }),
    });

    // If message looks like contact info (phone number detected), capture as lead
    const phoneMatch = userText.match(/(\+?39)?[\s\-]?3\d{2}[\s\-]?\d{6,7}/);
    if (phoneMatch) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://autopertutti-site-one.vercel.app";
      await fetch(`${siteUrl}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          phone: phoneMatch[0],
          email: "telegram@autopertutti.ai",
          service: "telegram",
          message: userText,
        }),
      }).catch(() => {}); // fire-and-forget
    }

    return new Response("ok");
  } catch (error) {
    console.error("[TELEGRAM WEBHOOK ERROR]", error);
    return new Response("ok"); // always respond ok to Telegram
  }
}
