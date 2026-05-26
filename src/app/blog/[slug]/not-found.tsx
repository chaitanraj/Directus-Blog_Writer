import Link from "next/link";

import { Container } from "@/components/Container";
import { EmptyState } from "@/components/EmptyState";

export default function BlogPostNotFound() {
  return (
    <main className="pb-20 pt-10">
      <Container className="max-w-3xl">
        <EmptyState
          title="Post not found"
          description="The requested post ID does not exist in the Directus `posts` collection, or it is not available to this public client."
        />
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex rounded-full bg-cyan-400 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-300"
          >
            Return home
          </Link>
        </div>
      </Container>
    </main>
  );
}
