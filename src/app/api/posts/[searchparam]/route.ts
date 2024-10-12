import { db } from "@/lib/drizzle";
import { PostsTable } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { searchparam: string } }
) {
  const searchparam = params.searchparam;
  let id: number = parseInt(searchparam);
  try {
    let result;
    if (!isNaN(id)) {
      result = await db.select().from(PostsTable).where(eq(PostsTable.id, id));
    } else if (typeof searchparam === "string") {
      let slug: string = searchparam;
      result = await db
        .select()
        .from(PostsTable)
        .where(eq(PostsTable.slug, slug));
    }
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
