import { db } from "@/lib/drizzle";
import { PostsTable } from "@/lib/schema";
import { PostInsert } from "@/types/global";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let result = await db.select().from(PostsTable);
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(request: NextRequest) {
  const postRequest: PostInsert = await request.json();
  try {
    let result = await db.insert(PostsTable).values(postRequest).returning();
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function PUT(request: NextRequest) {
  return NextResponse.json({ data: "world" });
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({ data: "world" });
}
