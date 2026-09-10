import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { readFile } from "node:fs/promises";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required.");
// Bootstrap both new databases and databases created by older app versions.
// The checked-in migration remains the schema source of truth.
const migration = await readFile(new URL("../drizzle/0000_slim_killer_shrike.sql", import.meta.url), "utf8");
await neon(process.env.DATABASE_URL).query(migration.replace('CREATE TABLE "site_content"', 'CREATE TABLE IF NOT EXISTS "site_content"'));
console.log("Site content table is ready.");
