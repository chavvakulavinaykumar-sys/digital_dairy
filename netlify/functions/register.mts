import type { Config } from "@netlify/functions";
import { getDatabase } from "@netlify/database";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { pin } = await req.json();
  if (!pin) {
    return Response.json({ success: false, message: "PIN is required" });
  }

  try {
    const db = getDatabase();
    await db.sql`UPDATE app_user SET pin = ${String(pin)}`;
    return Response.json({ success: true });
  } catch {
    return Response.json({ success: false, message: "Error creating PIN" });
  }
};

export const config: Config = {
  path: "/register",
};
