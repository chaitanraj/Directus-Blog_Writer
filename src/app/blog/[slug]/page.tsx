import Link from "next/link";
import { notFound } from "next/navigation";

import { Comments } from "@/components/Comments";
import { getDirectusAssetUrl, getPostById, getPostImage, getPostTitle } from "@/lib/directus";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 0;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostById(slug);

  if (!post) {
    notFound();
  }

  const title = getPostTitle(post);
  const imageUrl = getDirectusAssetUrl(getPostImage(post));

  return (
    <main
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "40px 16px",
        background: "#fff",
        color: "#000",
      }}
    >
      <Link href="/">Back to posts</Link>

      <h1 style={{ fontSize: "24px", marginTop: "24px" }}>{title}</h1>

      {imageUrl ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={title}
            style={{
              display: "block",
              width: "100%",
              maxWidth: "320px",
              height: "auto",
              marginTop: "24px",
            }}
          />
        </>
      ) : null}

      <article style={{ marginTop: "24px" }}>
        {post.post_data ? (
          <div dangerouslySetInnerHTML={{ __html: post.post_data }} />
        ) : (
          <p>No content yet.</p>
        )}
      </article>

      <Comments postId={post.id} />
    </main>
  );
}
