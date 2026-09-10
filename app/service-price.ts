// Calculate in cents so decimal add-on prices sum exactly.
export function priceInCents(price: string): number | null {
  const amount = price.trim().replace(/^\$\s*/, "");
  if (!/^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d{1,2})?$/.test(amount)) return null;
  const cents = Math.round(Number(amount.replaceAll(",", "")) * 100);
  return Number.isSafeInteger(cents) ? cents : null;
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}
