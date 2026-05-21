import { createDirectus, readItems, rest } from "@directus/sdk";

import type { BlogPost, DirectusSchema } from "@/types/blog";

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "http://localhost:8056";

export const directus = createDirectus<DirectusSchema>(directusUrl).with(rest());

export async function getPosts() {
  return directus.request(
    readItems("posts", {
      fields: [
        "id",
        "slug",
        "title",
        "content",
        "status",
        "cover_image",
        "published_at",
        "date_created",
      ],
      sort: ["-published_at", "-date_created"],
    }),
  );
}

export async function getPostBySlug(slug: string) {
  const posts = await directus.request(
    readItems("posts", {
      fields: [
        "id",
        "slug",
        "title",
        "content",
        "status",
        "cover_image",
        "published_at",
        "date_created",
      ],
      filter: {
        slug: {
          _eq: slug,
        },
      },
      limit: 1,
    }),
  );

  return posts[0] ?? null;
}

export function getDirectusAssetUrl(file: BlogPost["cover_image"]) {
  if (!file) {
    return null;
  }

  const assetId = typeof file === "string" ? file : file.id;

  return `${directusUrl}/assets/${assetId}`;
}

export function getPostPreview(content?: string | null, maxLength = 140) {
  if (!content) {
    return "No content preview is available for this post yet.";
  }

  const plainText = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return `${plainText.slice(0, maxLength).trimEnd()}...`;
}
