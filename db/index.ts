import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

type DatabaseEnv = {
  DATABASE_URL?: string;
};

export function getDb() {
  const databaseUrl =
    (env as DatabaseEnv).DATABASE_URL ?? process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is unavailable. Set it in your local .env file and production environment variables before using the database."
    );
  }

  return drizzle(databaseUrl, { schema });
}
