import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { getDirectusAssetUrl, getPostBySlug } from "@/lib/directus";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 60;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const imageUrl = getDirectusAssetUrl(post.cover_image);

  return (
    <main className="pb-20 pt-10">
      <Container className="max-w-4xl">
        <div className="space-y-8 rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/25 sm:p-10">
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400/40 hover:text-white"
          >
            Back to posts
          </Link>

          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 capitalize text-cyan-300">
                {post.status ?? "unknown"}
              </span>
              <span>
                {post.published_at
                  ? new Date(post.published_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Not published yet"}
              </span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {post.title}
            </h1>
          </div>

          {imageUrl ? (
            <div className="relative h-[320px] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 sm:h-[420px]">
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
                priority
              />
            </div>
          ) : null}

          <article className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 text-base leading-8 text-slate-300 sm:p-8">
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <p>No content has been added to this post yet.</p>
            )}
          </article>
        </div>
      </Container>
    </main>
  );
}
