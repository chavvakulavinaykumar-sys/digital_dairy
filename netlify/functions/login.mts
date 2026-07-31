import type { Config } from "@netlify/functions";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { ensureDefaultUser } from "../../db/seed.js";

export default async (req: Request) => {
  const { pin } = await req.json();

  await ensureDefaultUser();

  const [row] = await db.select().from(users).where(eq(users.pin, pin)).limit(1);

  return Response.json({ success: !!row });
};

export const config: Config = {
  path: "/login",
  method: "POST",
};
