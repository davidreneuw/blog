import { db } from "@/lib/drizzle";
import { PostsTable } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";
var slugify = require("slugify");

export async function POST(request: NextRequest) {
  const title = await request.json();
  let slug = slugify(title, { lower: true });
  const existingSlugs = await db
    .selectDistinct({ slug: PostsTable.slug })
    .from(PostsTable);

  const restrictedSlugs = ["about", "explore", "write"];

  while (existingSlugs.includes(slug) || restrictedSlugs.includes(slug)) {
    slug += "-1";
  }
  return NextResponse.json({ slug });
}
