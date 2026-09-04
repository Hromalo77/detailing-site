import { isAdminAuthenticated } from "@/app/admin/auth";
import type { SiteContent } from "@/app/site-content";
import { saveSiteContent } from "@/db/content";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = (await request.json()) as SiteContent;
  await saveSiteContent(content);

  return Response.json({ ok: true });
}
