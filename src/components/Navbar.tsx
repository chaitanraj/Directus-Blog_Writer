import Link from "next/link";

import { Container } from "@/components/Container";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-cyan-400/15 text-sm font-semibold text-cyan-300 ring-1 ring-cyan-400/20">
            BW
          </span>
          <div>
            <p className="text-sm font-semibold tracking-[0.22em] text-slate-100 uppercase">
              Blog Writer
            </p>
            <p className="text-xs text-slate-400">Directus publishing dashboard</p>
          </div>
        </Link>

        <nav className="flex items-center gap-3 text-sm text-slate-300">
          <Link
            href="/"
            className="rounded-full border border-white/10 px-4 py-2 transition hover:border-cyan-400/40 hover:bg-white/5 hover:text-white"
          >
            Posts
          </Link>
          <a
            href={process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "http://localhost:8056"}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-cyan-400 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-300"
          >
            Open CMS
          </a>
        </nav>
      </Container>
    </header>
  );
}
