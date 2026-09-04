import { getSiteContent } from "@/db/content";
import HomeClient from "./home-client";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getSiteContent();

  return <HomeClient content={content} />;
}
