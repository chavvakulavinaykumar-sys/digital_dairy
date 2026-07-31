import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial().primaryKey(),
  pin: text().notNull(),
});

export const entries = pgTable("entries", {
  id: serial().primaryKey(),
  date: text().notNull(),
  content: text().notNull(),
});
