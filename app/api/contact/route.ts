import nodemailer from "nodemailer";
import { getSiteContent } from "@/db/content";
import { serviceSummary, validateContact } from "@/app/contact-request";
import { priceInCents } from "@/app/service-price";

export const runtime = "nodejs";
const attempts = new Map<string, { count: number; expires: number }>();

export async function POST(request: Request) {
  const fail = (error: string, status = 400) => Response.json({ error }, { status });
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return fail("Please submit from our website.", 403);
  let data: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 16000) return fail("Your request is too long.", 413);
    data = JSON.parse(raw);
  } catch { return fail("Invalid request."); }
  if (!validateContact(data) || data.website) return fail("Please check your contact details and try again.");
  const user = process.env.GMAIL_USER?.trim();
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
  const to = process.env.CONTACT_TO_EMAIL?.trim() || user;
  const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
  if (!user || !pass || !to || !emailPattern.test(user) || !emailPattern.test(to)) return fail("Online requests are temporarily unavailable. Please call us.", 503);
  // Per-instance throttle; use hosting-level limits across multiple instances.
  const now = Date.now();
  for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key);
  const key = data.email.toLowerCase();
  const attempt = attempts.get(key) ?? { count: 0, expires: now + 600000 };
  if (attempt.count >= 3 || attempts.size >= 1000) return fail("Too many requests. Please try later or call us.", 429);
  attempt.count++;
  attempts.set(key, attempt);
  try {
    const content = await getSiteContent();
    let summary = "General detailing inquiry";
    if (data.selection) {
      const selection = data.selection;
      const service = content.services[selection.serviceIndex];
      if (!service || service.name !== selection.serviceName || new Set(selection.addOns.map((item) => item.index)).size !== selection.addOns.length) return fail("Services have changed. Please refresh and select your service again.");
      for (const item of selection.addOns) {
        const addOn = service.addOns?.[item.index];
        if (!addOn || addOn.name !== item.name || priceInCents(addOn.price) === null) return fail("Add-ons have changed. Please refresh and select them again.");
      }
      summary = serviceSummary(service, selection.addOns.map((item) => item.index));
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", port: 465, secure: true,
      auth: { user, pass }, connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 20000,
      disableFileAccess: true, disableUrlAccess: true,
    });
    const result = await transporter.sendMail({
      from: { name: "Detailing website", address: user }, to, replyTo: data.email,
      subject: "New mobile detailing request",
      text: `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\n\n${summary}\n\nVehicle / question:\n${data.message}`,
    });
    if (!result.accepted.length) return fail("We couldn’t confirm your request. Please call us.", 502);
    return Response.json({ ok: true });
  } catch {
    // Do not retry an uncertain SMTP send or expose SMTP/customer data.
    return fail("We couldn’t confirm your request. Please try again or call us.", 503);
  }
}
