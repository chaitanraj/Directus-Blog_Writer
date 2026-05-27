import { BlogCard } from "@/components/BlogCard";
import { Container } from "@/components/Container";
import { EmptyState } from "@/components/EmptyState";
import { getPosts } from "@/lib/directus";
import type { BlogPost } from "@/types/blog";

export const revalidate = 0;

export default async function HomePage() {
  let posts: BlogPost[] = [];
  let errorMessage: string | null = null;

  try {
    const all = (await getPosts()) as BlogPost[];
    posts = all;
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Failed to fetch posts from Directus.";
  }

  return (
    <main className="py-10">
      <Container>
        <h1 className="text-2xl font-semibold">Posts</h1>
        <p className="mt-2 text-sm text-gray-600">{posts.length} total</p>

        <section className="mt-8">
          {errorMessage ? (
            <EmptyState title="Unable to load posts" description={errorMessage} />
          ) : posts.length === 0 ? (
            <EmptyState title="No posts" description="No posts found in Directus." />
          ) : (
            <ul className="flex flex-col gap-4">
              {posts.map((post) => (
                <li key={post.id}>
                  <BlogCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </Container>
    </main>
  );
}
