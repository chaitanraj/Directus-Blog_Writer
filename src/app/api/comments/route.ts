import { NextResponse } from "next/server";

import { fetchDirectus } from "@/lib/directus";
import type { Comment } from "@/types/blog";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const post = searchParams.get("post");

    if (!post) {
      return NextResponse.json({ error: "Missing post id." }, { status: 400 });
    }

    const params = new URLSearchParams({
      fields: "id,content,post,date_created",
      "filter[post][_eq]": post,
      sort: "date_created",
    });
    const response = await fetchDirectus<{ data: Comment[] }>(`/items/comments?${params}`);

    return NextResponse.json({ data: response.data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch comments.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      content?: string;
      post?: number | string;
    };

    const response = await fetchDirectus<{ data: Comment }>("/items/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: body.content,
        post: body.post,
      }),
    });

    return NextResponse.json({ data: response.data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create comment.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
