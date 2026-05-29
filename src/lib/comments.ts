import type { Comment } from "@/types/blog";

async function commentsFetch<T>(path = "", init?: RequestInit) {
  const response = await fetch(`/api/comments${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error ?? "Directus request failed.");
  }

  return (await response.json()) as T;
}

export async function getComments(postId: number | string) {
  const params = new URLSearchParams({ post: String(postId) });
  const response = await commentsFetch<{ data: Comment[] }>(`?${params}`);

  return response.data;
}

export async function createComment(postId: number | string, content: string) {
  const response = await commentsFetch<{ data: Comment }>("", {
    method: "POST",
    body: JSON.stringify({
      content,
      post: postId,
    }),
  });

  return response.data;
}
