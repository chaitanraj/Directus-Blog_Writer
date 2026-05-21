import { Container } from "@/components/Container";

export default function BlogPostLoading() {
  return (
    <main className="pb-20 pt-10">
      <Container className="max-w-4xl">
        <div className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <div className="h-4 w-32 animate-pulse rounded-full bg-white/10" />
          <div className="h-12 w-full animate-pulse rounded-2xl bg-white/10" />
          <div className="h-80 animate-pulse rounded-[2rem] bg-white/10" />
          <div className="h-48 animate-pulse rounded-[2rem] bg-white/5" />
        </div>
      </Container>
    </main>
  );
}
