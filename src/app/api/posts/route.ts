import { NextResponse } from "next/server";

import { getPosts } from "@/lib/directus";

export async function GET() {
  try {
    const posts = await getPosts();

    return NextResponse.json({
      data: posts,
      count: posts.length,
      example: 'directus.request(readItems("posts"))',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        error: message,
        hint: "Check Directus public role permissions for `posts`, or provide DIRECTUS_TOKEN in .env.local.",
      },
      { status: 500 },
    );
  }
}
