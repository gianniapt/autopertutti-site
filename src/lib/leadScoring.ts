export type ScoreTier = "HOT" | "WARM" | "COLD";

export function calculateLeadScore(message: string, service: string): number {
  let score = 0;
  const msg = message.toLowerCase();

  // Urgency (+30 / +20 / +0)
  const urgentNow = ["subito", "urgente", "oggi", "adesso", "immediatamente"];
  const urgentWeek = ["settimana", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "prossimo"];
  if (urgentNow.some(w => msg.includes(w))) score += 30;
  else if (urgentWeek.some(w => msg.includes(w))) score += 20;

  // Service value (+25 / +15 / +10 / +5)
  if (["vendita", "ai_chat", "voice_call"].includes(service)) score += 25;
  else if (service === "noleggio") score += 15;
  else if (service === "officina") score += 10;
  else if (service === "lavaggio") score += 5;

  // Purchase intent keywords (+25)
  const intentWords = ["comprare", "acquisto", "preventivo", "finanziamento", "prenotare", "appuntamento", "richiamarmi"];
  if (intentWords.some(w => msg.includes(w))) score += 25;

  // Budget signals (+15)
  if (/€\s?\d+|\d+\s?k\s?euro|\d+\s?mila/i.test(msg)) score += 15;

  // Message engagement (+15 for 20+ words, +8 for 10+)
  const wordCount = msg.split(/\s+/).filter(Boolean).length;
  if (wordCount >= 20) score += 15;
  else if (wordCount >= 10) score += 8;

  return Math.min(100, score);
}

export function getScoreTier(score: number): ScoreTier {
  if (score >= 80) return "HOT";
  if (score >= 50) return "WARM";
  return "COLD";
}
