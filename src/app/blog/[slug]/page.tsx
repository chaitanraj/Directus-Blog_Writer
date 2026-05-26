import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { getPostById, getPostTitle } from "@/lib/directus";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 60;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostById(slug);

  if (!post) {
    notFound();
  }

  const title = getPostTitle(post);

  return (
    <main className="py-10">
      <Container className="max-w-3xl">
        <Link href="/" className="text-sm text-gray-600 hover:underline">
          ← Back to posts
        </Link>

        <div className="mt-6 flex items-center gap-3 text-xs text-gray-500">
          <span>{post.status ?? "unknown"}</span>
          <span>·</span>
          <span>
            {post.date_created
              ? new Date(post.date_created).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : "No date"}
          </span>
        </div>

        <h1 className="mt-2 text-2xl font-semibold text-black">{title}</h1>

        <div className="mt-4 text-xs text-gray-500">
          <div>Post ID: {post.id}</div>
          {post.sort !== null && post.sort !== undefined ? <div>Sort: {post.sort}</div> : null}
          {post.user_created ? <div>Author ID: {post.user_created}</div> : null}
        </div>

        <article className="mt-6 text-sm leading-7 text-black">
          {post.post_data ? (
            <div dangerouslySetInnerHTML={{ __html: post.post_data }} />
          ) : (
            <p className="text-gray-600">No content yet.</p>
          )}
        </article>
      </Container>
    </main>
  );
}
