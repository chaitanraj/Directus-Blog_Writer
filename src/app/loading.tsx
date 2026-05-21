import { Container } from "@/components/Container";

export default function Loading() {
  return (
    <main className="pb-16 pt-10">
      <Container>
        <div className="mb-8 space-y-4">
          <div className="h-4 w-32 animate-pulse rounded-full bg-white/10" />
          <div className="h-12 w-full max-w-2xl animate-pulse rounded-2xl bg-white/10" />
          <div className="h-5 w-full max-w-3xl animate-pulse rounded-full bg-white/5" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5"
            >
              <div className="h-56 animate-pulse bg-white/10" />
              <div className="space-y-4 p-6">
                <div className="h-6 animate-pulse rounded-full bg-white/10" />
                <div className="h-20 animate-pulse rounded-3xl bg-white/5" />
                <div className="h-4 w-1/3 animate-pulse rounded-full bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
