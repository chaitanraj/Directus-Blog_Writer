import { NextResponse } from "next/server";

import { getPosts } from "@/lib/directus";

export async function GET() {
  try {
    const posts = await getPosts();

    return NextResponse.json({
      data: posts,
      example: 'directus.request(readItems("posts"))',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
