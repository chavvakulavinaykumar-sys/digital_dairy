CREATE TABLE "entries" (
	"id" serial PRIMARY KEY,
	"date" text NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"pin" text NOT NULL
);
