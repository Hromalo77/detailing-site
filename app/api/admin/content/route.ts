import { isAdminAuthenticated } from "@/app/admin/auth";
import type { SiteContent } from "@/app/site-content";
import { validateServiceAddOns } from "@/app/site-content";
import { saveSiteContent } from "@/db/content";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let content: SiteContent;
  try {
    content = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }
  const error = validateServiceAddOns(content?.services);
  if (error) return Response.json({ error }, { status: 400 });
  try {
    await saveSiteContent(content);
  } catch {
    return Response.json(
      { error: "Could not confirm the save. Your edits are still here; please try again." },
      { status: 503 }
    );
  }

  return Response.json({ ok: true });
}
