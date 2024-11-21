import { PostsTable } from "@/lib/schema";
import { InferSelectModel } from "drizzle-orm";

export type PostRequest = {
  post: Post;
};

export type Post = InferSelectModel<typeof PostsTable>;
export type PostGet = Pick<Post, "slug">;
export type PostInsert = Omit<Post, "id" | "createdAt" | "updatedAt">;
export type PostUpdate = Omit<Post, "createdAt" | "updatedAt">;
export type PostDelete = Pick<Post, "id">;

export type BlobPost = {
  file: File;
};
export type BlobDelete = {
  id: string;
};
