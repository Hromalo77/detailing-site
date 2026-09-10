import { eq, sql } from "drizzle-orm";
import { getDb } from ".";
import { defaultSiteContent, type SiteContent } from "@/app/site-content";
import { siteContent } from "./schema";
import { retryDatabaseRead } from "./retry";

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

export async function getSiteContent(): Promise<SiteContent> {
  return retryDatabaseRead(async () => {
    const db = getDb();
    const [row] = await db
      .select({ value: siteContent.value })
      .from(siteContent)
      .where(eq(siteContent.key, CONTENT_KEY))
      .limit(1);

    return mergeSiteContent(row?.value);
  });
}

export async function saveSiteContent(value: SiteContent) {
  const db = getDb();

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
