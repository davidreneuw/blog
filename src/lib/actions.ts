"use server";
import { db } from "@/lib/drizzle";
import * as schema from "@/lib/schema";
import { Post } from "@/types/global";
import { put } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export async function GetPost(slug: string) {
  let result = await db
    .select()
    .from(schema.PostsTable)
    .where(eq(schema.PostsTable.slug, slug));
  if (result.length > 0) {
    return result[0];
  } else {
    return null;
  }
}

export async function GetPostById(id: number) {
  let result = await db
    .select()
    .from(schema.PostsTable)
    .where(eq(schema.PostsTable.id, id));
  if (result.length > 0) {
    return result[0];
  } else {
    return null;
  }
}

export async function GetPosts() {
  let result = await db.select().from(schema.PostsTable);
  return result;
}

export async function GetTags() {
  let result = await GetPosts();
  let tags: string[] = [];
  result.forEach((post: Post) => {
    post.tags.split(",").forEach((tag: string) => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });
  return tags;
}

export async function CreatePost(post: Post) {
  let createdPost = await db.insert(schema.PostsTable).values(post).returning();
  return createdPost;
}

export async function UpdatePost(post: Post) {
  let updatedPost = await db
    .update(schema.PostsTable)
    .set(post)
    .where(eq(schema.PostsTable.id, post.id));
  return updatedPost;
}

export async function UpdatePostFormAction(postId: number, formData: FormData) {
  console.log(formData);
  let post = await GetPostById(postId);
  if (post) {
    post.title = formData.get("title") as string;
    post.content = formData.get("content") as string;
    post.tags = formData.get("tags") as string;
    let localBackgroundImageUrl = formData.get("backgroundImage") as string;
    let backgroundImageUrl = await UploadToBlob(localBackgroundImageUrl);
    post.backgroundImage = backgroundImageUrl.url;
    await UpdatePost(post);
    redirect(`/${post.slug}`);
  }
}

export async function UploadToBlob(localFilePath: string) {
  console.log(localFilePath);
  let blob = await fetch(localFilePath).then((r) => r.blob());
  let blobName = uuidv4();
  let response = await put(blobName, blob, { access: "public" });
  return response;
}

export async function DeletePost(id: number) {
  let deletedPost = await db
    .delete(schema.PostsTable)
    .where(eq(schema.PostsTable.id, id));
  return deletedPost;
}
