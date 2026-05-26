import Link from "next/link";

import { Container } from "@/components/Container";

export function Navbar() {
  return (
    <header className="border-b border-gray-300 bg-white">
      <Container className="flex h-14 items-center justify-between">
        <Link href="/" className="text-sm font-semibold text-black">
          Blog Writer
        </Link>
        <nav className="flex items-center gap-4 text-sm text-black">
          <Link href="/" className="hover:underline">
            Posts
          </Link>
          <a
            href={process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "http://localhost:8056"}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            Open CMS
          </a>
        </nav>
      </Container>
    </header>
  );
}
