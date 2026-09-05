import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const TOKEN_BODY = "admin";

function getAdminPassword() {
  const password = process.env.ADMIN_PASSWORD;

  return password?.trim();
}

async function sign(value: string) {
  const password = getAdminPassword();

  if (!password) {
    return null;
  }

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value)
  );

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function isAdminPassword(password: string) {
  const adminPassword = getAdminPassword();

  return Boolean(adminPassword) && password.trim() === adminPassword;
}

export function hasAdminPassword() {
  return Boolean(getAdminPassword());
}

export async function createAdminSession() {
  const signature = await sign(TOKEN_BODY);

  if (!signature) {
    throw new Error("ADMIN_PASSWORD is required for admin access.");
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, `${TOKEN_BODY}.${signature}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const signature = await sign(TOKEN_BODY);

  return Boolean(signature && token === `${TOKEN_BODY}.${signature}`);
}
