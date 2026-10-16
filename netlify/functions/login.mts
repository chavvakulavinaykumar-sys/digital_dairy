import type { Config } from "@netlify/functions";
import { getDatabase } from "@netlify/database";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { pin } = await req.json();
  const db = getDatabase();
  const rows = await db.sql`SELECT id FROM app_user WHERE pin = ${String(pin ?? "")} LIMIT 1`;

  return Response.json({ success: rows.length > 0 });
};

export const config: Config = {
  path: "/login",
};
