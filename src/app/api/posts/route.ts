import { db } from "@/lib/drizzle";
import { PostsTable } from "@/lib/schema";
import { Post, PostDelete, PostInsert, PostUpdate } from "@/types/global";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (slug) {
    let result = await db
      .select()
      .from(PostsTable)
      .where(eq(PostsTable.slug, slug));
    return NextResponse.json({ result });
  }
  try {
    let result = await db.select().from(PostsTable);
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request: NextRequest) {
  const postRequest: PostInsert = await request.json();
  try {
    let result = await db.insert(PostsTable).values(postRequest).returning();
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PUT(request: NextRequest) {
  const postRequest: PostUpdate = await request.json();
  const posts = await db
    .select()
    .from(PostsTable)
    .where(eq(PostsTable.id, postRequest.id));

  if (!posts) {
    return NextResponse.json({ error: "Post not found" });
  }
  const post = posts[0];

  let updatedPost: Post = {
    ...post,
    ...postRequest,
    createdAt: post.createdAt,
    updatedAt: new Date(),
  };

  try {
    let result = await db
      .update(PostsTable)
      .set(updatedPost)
      .where(eq(PostsTable.id, updatedPost.id))
      .returning();
    return NextResponse.json({ result });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function DELETE(request: NextRequest) {
  const postDelete: PostDelete = await request.json();
  try {
    let result = await db
      .delete(PostsTable)
      .where(eq(PostsTable.id, postDelete.id))
      .returning();
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.error();
  }
}
