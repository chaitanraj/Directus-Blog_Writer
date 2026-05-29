import type { Comment } from "@/types/blog";

const directusUrl = (process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "http://localhost:8056").replace(
  /\/$/,
  "",
);

async function directusFetch<T>(path: string, init?: RequestInit) {
  const response = await fetch(`${directusUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error("Directus request failed.");
  }

  return (await response.json()) as T;
}

export async function getComments(postId: number | string) {
  const params = new URLSearchParams({
    fields: "id,content,post,date_created",
    "filter[post][_eq]": String(postId),
    sort: "date_created",
  });

  const response = await directusFetch<{ data: Comment[] }>(`/items/comments?${params}`);

  return response.data;
}

export async function createComment(postId: number | string, content: string) {
  const response = await directusFetch<{ data: Comment }>("/items/comments", {
    method: "POST",
    body: JSON.stringify({
      content,
      post: postId,
    }),
  });

  return response.data;
}
