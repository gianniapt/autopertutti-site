export function getABVariant(testId: string, variants: string[]): string {
  if (typeof window === "undefined") return variants[0];
  const key = `ab_${testId}`;
  const stored = localStorage.getItem(key);
  if (stored && variants.includes(stored)) return stored;
  const picked = variants[Math.floor(Math.random() * variants.length)];
  localStorage.setItem(key, picked);
  return picked;
}
