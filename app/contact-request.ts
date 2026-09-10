import type { Service } from "./site-content";
import { formatPrice, priceInCents } from "./service-price";

export type Selection = { serviceIndex: number; serviceName: string; addOns: { index: number; name: string }[] };

export function serviceSummary(service: Service, selected: number[]): string {
  const extras = (service.addOns ?? []).filter((_, i) => selected.includes(i));
  const extraCents = extras.reduce((sum, item) => sum + (priceInCents(item.price) ?? 0), 0);
  const base = priceInCents(service.price);
  return [`Service: ${service.name}`, ...extras.map((item) => `${item.name}: +${formatPrice(priceInCents(item.price) ?? 0)}`),
    base === null ? `Base price: ${service.price}; add-ons: ${formatPrice(extraCents)}` : `Starting total: ${formatPrice(base + extraCents)}`].join("\n");
}

export function validateContact(data: unknown): data is { name: string; phone: string; email: string; message: string; website?: string; selection: Selection | null } {
  if (!data || typeof data !== "object") return false;
  const value = data as Record<string, unknown>;
  for (const [key, limit] of [["name", 120], ["phone", 60], ["email", 254], ["message", 4000]] as const) {
    if (typeof value[key] !== "string" || value[key].length > limit || (key !== "message" && !value[key].trim())) return false;
  }
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value.email as string)) return false;
  if (value.website !== undefined && typeof value.website !== "string") return false;
  if (value.selection === null) return true;
  const selection = value.selection as Selection | undefined;
  return !!selection && Number.isInteger(selection.serviceIndex) && selection.serviceIndex >= 0 && typeof selection.serviceName === "string" &&
    Array.isArray(selection.addOns) && selection.addOns.length <= 100 && selection.addOns.every((item) => item && Number.isInteger(item.index) && item.index >= 0 && typeof item.name === "string");
}
