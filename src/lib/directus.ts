import { createDirectus, readItems, rest, withToken } from "@directus/sdk";

import type { BlogPost, DirectusSchema } from "@/types/blog";

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "http://localhost:8056";
const directusToken = process.env.DIRECTUS_TOKEN;

export const directus = createDirectus<DirectusSchema>(directusUrl).with(rest());

function withOptionalToken<T>(query: T) {
  return directusToken ? withToken(directusToken, query) : query;
}

export async function getPosts() {
  return directus.request(
    withOptionalToken(
      readItems("posts", {
        fields: ["id", "status", "sort", "user_created", "date_created", "post_data"],
        sort: ["sort", "-date_created"],
      }),
    ),
  );
}

export async function getPostById(id: string) {
  const posts = await directus.request(
    withOptionalToken(
      readItems("posts", {
        fields: ["id", "status", "sort", "user_created", "date_created", "post_data"],
        filter: {
          id: {
            _eq: id,
          },
        },
        limit: 1,
      }),
    ),
  );

  return posts[0] ?? null;
}

export function stripRichText(content?: string | null) {
  if (!content) {
    return "";
  }

  return content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function getPostTitle(post: BlogPost) {
  const plainText = stripRichText(post.post_data);

  if (!plainText) {
    return `Post #${post.id}`;
  }

  return plainText.slice(0, 64).trimEnd();
}

export function getPostPreview(content?: string | null, maxLength = 140) {
  const plainText = stripRichText(content);

  if (!plainText) {
    return "No content preview is available for this post yet.";
  }

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return `${plainText.slice(0, maxLength).trimEnd()}...`;
}
