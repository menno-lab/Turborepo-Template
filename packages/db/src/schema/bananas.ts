import { pgTable, integer, text } from "drizzle-orm/pg-core";

export const bananas = pgTable("bananas", {
  id: integer(),
  name: text(),
});
