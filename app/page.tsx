import { getPublicSiteContent } from "@/db/public-content";
import HomeClient from "./home-client";
import { connection } from "next/server";

export default async function Home() {
  // Render at request time without disabling the explicit public content cache.
  await connection();
  const content = await getPublicSiteContent();

  return <HomeClient content={content} />;
}
