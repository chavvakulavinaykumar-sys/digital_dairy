import type { Config } from "@netlify/functions";
import { desc } from "drizzle-orm";
import { db } from "../../db/index.js";
import { entries } from "../../db/schema.js";

export default async (req: Request) => {
  if (req.method === "GET") {
    const rows = await db.select().from(entries).orderBy(desc(entries.id));
    return Response.json(rows);
  }

  const { date, content } = await req.json();
  await db.insert(entries).values({ date, content });
  return Response.json({ success: true });
};

export const config: Config = {
  path: "/entries",
  method: ["GET", "POST"],
};
