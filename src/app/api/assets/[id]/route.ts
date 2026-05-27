import { NextResponse } from "next/server";

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

type AssetRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: AssetRouteProps) {
  const { id } = await params;
  let lastError: unknown;

  for (const url of directusUrls) {
    try {
      const response = await fetch(`${url}/assets/${id}`, {
        headers: directusToken ? { Authorization: `Bearer ${directusToken}` } : undefined,
        cache: "no-store",
      });

      if (!response.ok) {
        lastError = new Error(`Directus returned ${response.status}`);
        continue;
      }

      return new NextResponse(response.body, {
        headers: {
          "Content-Type": response.headers.get("content-type") ?? "application/octet-stream",
          "Cache-Control": "no-store",
        },
      });
    } catch (error) {
      lastError = error;
    }
  }

  const message = lastError instanceof Error ? lastError.message : "Unable to load asset";

  return NextResponse.json({ error: message }, { status: 502 });
}
