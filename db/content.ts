import { eq, sql } from "drizzle-orm";
import { getDb } from ".";
import { defaultSiteContent, type SiteContent } from "@/app/site-content";
import { siteContent } from "./schema";

const CONTENT_KEY = "default";

function mergeSiteContent(value: unknown): SiteContent {
  if (!value || typeof value !== "object") {
    return defaultSiteContent;
  }

  return {
    ...defaultSiteContent,
    ...(value as Partial<SiteContent>),
  };
}

async function ensureSiteContentTable() {
  const db = getDb();

  await db.execute(sql`
    create table if not exists site_content (
      key text primary key,
      value jsonb not null,
      updated_at timestamptz not null default now()
    )
  `);

  return db;
}

export async function getSiteContent(): Promise<SiteContent> {
  const db = await ensureSiteContentTable();
  const [row] = await db
    .select({ value: siteContent.value })
    .from(siteContent)
    .where(eq(siteContent.key, CONTENT_KEY))
    .limit(1);

  return mergeSiteContent(row?.value);
}

export async function saveSiteContent(value: SiteContent) {
  const db = await ensureSiteContentTable();

  await db
    .insert(siteContent)
    .values({ key: CONTENT_KEY, value })
    .onConflictDoUpdate({
      target: siteContent.key,
      set: {
        value,
        updatedAt: sql`now()`,
      },
    });
}
