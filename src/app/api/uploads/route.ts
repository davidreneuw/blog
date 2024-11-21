import { BlobDelete } from "@/types/global";
import { del, put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let formData = await request.formData();
  const file = formData.get("file") as File;
  try {
    const blob = await put(`${file.name}`, file, { access: "public" });
    return NextResponse.json(blob);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function DELETE(request: NextRequest) {
  const postRequest: BlobDelete = await request.json();
  try {
    let result = await del(`uploads/${postRequest.id}`);
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
