import type { Config } from "@netlify/functions";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";

export default async (req: Request) => {
  const { pin } = await req.json();

  const [existing] = await db.select().from(users).limit(1);

  if (existing) {
    await db.update(users).set({ pin }).where(eq(users.id, existing.id));
  } else {
    await db.insert(users).values({ pin });
  }

  return Response.json({ success: true });
};

export const config: Config = {
  path: "/register",
  method: "POST",
};
