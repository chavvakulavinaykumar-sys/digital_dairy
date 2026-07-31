import { db } from "./index.js";
import { users } from "./schema.js";

const DEFAULT_PIN = "1234";

export async function ensureDefaultUser() {
  const [existing] = await db.select().from(users).limit(1);
  if (!existing) {
    await db.insert(users).values({ pin: DEFAULT_PIN });
  }
}
