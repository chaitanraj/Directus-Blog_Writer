import { BlogCard } from "@/components/BlogCard";
import { Container } from "@/components/Container";
import { EmptyState } from "@/components/EmptyState";
import { getPosts } from "@/lib/directus";

export const revalidate = 60;

export default async function HomePage() {
  const posts = await getPosts().catch(() => []);

  return (
    <main className="pb-20 pt-10">
      <Container>
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.95),rgba(15,23,42,0.7)),radial-gradient(circle_at_top_right,rgba(34,211,238,0.22),transparent_30%)] px-6 py-10 shadow-2xl shadow-black/25 sm:px-10">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium tracking-[0.2em] text-cyan-300 uppercase">
              Directus Blog Overview
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Minimal publishing dashboard for your Directus posts.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Browse articles, review publish status, and jump straight into each post with a dark
                editorial interface built with Next.js App Router and Tailwind CSS.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <span className="rounded-full border border-white/10 px-4 py-2">
                {posts.length} total posts
              </span>
              <span className="rounded-full border border-white/10 px-4 py-2">
                Source: {process.env.NEXT_PUBLIC_DIRECTUS_URL}
              </span>
            </div>
          </div>
        </section>

        <section className="mt-10">
          {posts.length === 0 ? (
            <EmptyState
              title="No blog posts found"
              description="Your Directus collection `posts` is connected, but there are no items to display yet. Add a post in Directus and refresh the page."
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>
      </Container>
    </main>
  );
}
