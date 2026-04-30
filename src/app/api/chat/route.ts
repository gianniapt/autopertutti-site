// export const runtime = "edge";

import carsData from "@/data/cars.json";
import rentalData from "@/data/rental-fleet.json";

const SYSTEM_PROMPT = `Sei l'assistente virtuale di Auto Per Tutti. Parla SEMPRE in italiano, tono cordiale.
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

OFFICINA: tagliando da €89, freni da €120, pneumatici da €15,
diagnosi Bosch da €49, revisione da €79, clima da €59.
Garanzia 12 mesi su tutti gli interventi.

AUTOLAVAGGIO: Basic €15/auto, Premium €35/auto, VIP €75/auto (ceratura Carnauba).

Quando il cliente mostra interesse concreto, chiedi nome e telefono
per essere ricontattato entro 30 minuti.

CROSS-SELL (suggerisci sempre quando pertinente):
- Officina richiesta → menziona anche Autolavaggio post-intervento (€15-35)
- Vendita auto → offri anche opzione Noleggio NLT se budget < €15k
- Noleggio → menziona garanzia inclusa e assicurazione disponibile

PRE-APPUNTAMENTO (quando cliente chiede appuntamento/prenotazione):
1. Chiedi: "Che marca e modello hai?"
2. Chiedi: "Quanti km ha?"
3. Chiedi: "C'è qualche problema specifico?"
4. Poi: "Perfetto! Per confermare l'appuntamento ho bisogno del tuo nome e telefono."`;

function extractPreferences(messages: Array<{ role: string; content: string }>) {
  const text = messages.map(m => m.content).join(" ").toLowerCase();

  return {
    budget: (() => {
      const match = text.match(/€\s?(\d+)|\d+\s?k\s?euro|\d+\s?mila/);
      return match ? parseInt(match[1] || "0") : null;
    })(),
    fuel: ["diesel", "benzina", "ibrido", "elettrico", "hybrid"].find(f => text.includes(f)),
    transmission: ["automatico", "manuale"].find(t => text.includes(t)),
    isRental: ["noleggio", "affittare", "nlt"].some(w => text.includes(w)),
  };
}

function filterCars(prefs: ReturnType<typeof extractPreferences>) {
  let filtered = [...carsData];

  if (prefs.budget) {
    filtered = filtered.filter(c => c.price <= prefs.budget! + 2000); // allow 2k buffer
  }
  if (prefs.fuel) {
    filtered = filtered.filter(c => c.fuel.toLowerCase().includes(prefs.fuel!));
  }
  if (prefs.transmission) {
    filtered = filtered.filter(c => c.transmission.toLowerCase().includes(prefs.transmission!));
  }

  return filtered.slice(0, 5).map(c => `${c.brand} ${c.model} ${c.year} — ${c.fuel} ${c.transmission} — ${c.km.toLocaleString()}km — €${c.price.toLocaleString()}`).join("\n");
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json() as {
      messages: Array<{ role: string; content: string }>;
    };

    if (!messages || !Array.isArray(messages)) {
      return new Response("Invalid messages format", { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return new Response("Missing OPENROUTER_API_KEY", { status: 500 });
    }

    const prefs = extractPreferences(messages);
    const carsContext = filterCars(prefs);

    const dynamicPrompt = `${SYSTEM_PROMPT}

VEICOLI DISPONIBILI OGGI (mostra questi quando pertinenti):
${carsContext || "Nessun veicolo corrisponde esattamente. Contattaci per altre opzioni."}`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://www.autopertutti.net",
        "X-Title": "Auto Per Tutti AI Chat",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "system", content: dynamicPrompt },
          ...messages,
        ],
        stream: true,
        max_tokens: 600,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenRouter API error:", error);
      return new Response("Failed to call OpenRouter API", { status: 500 });
    }

    const encoder = new TextEncoder();
    const reader = response.body!.getReader();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = new TextDecoder().decode(value);
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (!line.trim() || line.startsWith(":")) continue;

              if (line.startsWith("data: ")) {
                const data = line.slice(6);
                if (data === "[DONE]") break;

                try {
                  const json = JSON.parse(data);
                  const content = json.choices?.[0]?.delta?.content;
                  if (content) {
                    controller.enqueue(encoder.encode(content));
                  }
                } catch {
                  // Skip malformed JSON
                }
              }
            }
          }
        } catch (error) {
          console.error("Stream processing error:", error);
          controller.error(error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
