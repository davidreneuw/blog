import * as schema from "@/lib/schema";
import { sql } from "@vercel/postgres";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/vercel-postgres";

config({ path: ".env.development.local" });

// Connect to Vercel Postgres
export const db = drizzle(sql, { schema });
