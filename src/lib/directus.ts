import type { BlogPost } from "@/types/blog";

const configuredDirectusUrl =
  process.env.DIRECTUS_URL ?? process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "http://127.0.0.1:8056";
const directusToken = process.env.DIRECTUS_SERVER_TOKEN ?? process.env.DIRECTUS_TOKEN;

function normalizeDirectusUrl(url: string) {
  return url.replace(/\/$/, "");
}

const directusUrls = Array.from(
  new Set([
    normalizeDirectusUrl(configuredDirectusUrl),
    "http://127.0.0.1:8056",
    "http://localhost:8056",
  ]),
);

export async function fetchDirectus<T>(path: string) {
  let lastError: unknown;

  for (const url of directusUrls) {
    try {
      const response = await fetch(`${url}${path}`, {
        headers: directusToken ? { Authorization: `Bearer ${directusToken}` } : undefined,
        cache: "no-store",
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`Directus returned ${response.status}: ${body || response.statusText}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Failed to fetch posts from Directus.");
}

export async function getPosts() {
  const params = new URLSearchParams({
    fields: "*,featured_image.*",
    sort: "sort,-date_created",
  });
  const response = await fetchDirectus<{ data: BlogPost[] }>(`/items/posts?${params}`);

  return response.data;
}

export async function getPostById(id: string) {
  const params = new URLSearchParams({
    fields: "*,featured_image.*",
    "filter[id][_eq]": id,
    limit: "1",
  });
  const response = await fetchDirectus<{ data: BlogPost[] }>(`/items/posts?${params}`);

  return response.data[0] ?? null;
}

export function getPostImage(post: BlogPost) {
  return post.featured_image ?? post.image ?? null;
}

export function getDirectusAssetUrl(file: BlogPost["featured_image"] | BlogPost["image"]) {
  if (!file) {
    return null;
  }

  const firstFile = Array.isArray(file) ? file[0] : file;

  if (!firstFile) {
    return null;
  }

  if (typeof firstFile !== "object") {
    return `/api/assets/${firstFile}`;
  }

  const relatedFile = "directus_files_id" in firstFile ? firstFile.directus_files_id : null;
  const id = typeof relatedFile === "object" ? relatedFile?.id : relatedFile ?? firstFile.id;

  return id ? `/api/assets/${id}` : null;
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
