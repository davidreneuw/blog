import { PostsTable } from "@/lib/schema";
import { InferSelectModel } from "drizzle-orm";

export type GetPostRequest = {
  slug: string;
};

export type PostRequest = {
  post: Post;
};

export type Post = InferSelectModel<typeof PostsTable>;
export type PostInsert = Omit<Post, "id" | "createdAt" | "updatedAt">;
