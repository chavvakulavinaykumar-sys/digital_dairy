import type { Config } from "@netlify/functions";
import { getDatabase } from "@netlify/database";

export default async (req: Request) => {
  const db = getDatabase();

  if (req.method === "GET") {
    const rows = await db.sql`SELECT id, date, content FROM entries ORDER BY id DESC`;
    return Response.json(rows);
  }

  if (req.method === "POST") {
    const { date, content } = await req.json();
    if (!date || !content) {
      return Response.json({ success: false, message: "Fill all fields" }, { status: 400 });
    }
    await db.sql`INSERT INTO entries (date, content) VALUES (${String(date)}, ${String(content)})`;
    return Response.json({ success: true });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/entries",
};
