import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const portfolioMessages = sqliteTable("portfolio_messages", {
  id: text("id").primaryKey(),
  type: text("type", { enum: ["meeting", "review"] }).notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  preferredDate: text("preferred_date"),
  rating: integer("rating"),
  message: text("message").notNull(),
  consent: integer("consent", { mode: "boolean" }).notNull().default(false),
  status: text("status").notNull().default("new"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
