import { isAdminAuthenticated } from "@/app/admin/auth";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return Response.json({ error: "Invalid origin." }, { status: 403 });
  }
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const secret = process.env.CLOUDINARY_API_SECRET?.trim();
  if (!cloudName || !apiKey || !secret) {
    return Response.json({ error: "Image uploads are not configured." }, { status: 503 });
  }
  const params = {
    allowed_formats: "jpg,jpeg,png,webp,gif,avif",
    folder: "cape-cod-mobile-detailing",
    overwrite: "false",
    public_id: crypto.randomUUID(),
    timestamp: String(Math.floor(Date.now() / 1000)),
  };
  const payload = Object.entries(params).sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`).join("&");
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(payload + secret));
  const signature = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
  return Response.json({ cloudName, apiKey, params, signature }, {
    headers: { "Cache-Control": "no-store" },
  });
}
