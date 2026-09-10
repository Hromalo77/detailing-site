import { unstable_cache } from "next/cache";
import { getSiteContent } from "./content";

export const PUBLIC_CONTENT_TAG = "public-site-content";

// Only public page reads use this cache. Admin and quote validation stay fresh.
export const getPublicSiteContent = unstable_cache(
  getSiteContent,
  ["public-site-content-v2"],
  { revalidate: false, tags: [PUBLIC_CONTENT_TAG] }
);
