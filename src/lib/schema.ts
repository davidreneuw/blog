import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const PostsTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  tags: text("tags").notNull(),
  backgroundImage: text("backgroundImage"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
