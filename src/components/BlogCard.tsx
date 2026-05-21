import Image from "next/image";
import Link from "next/link";

import { getDirectusAssetUrl, getPostPreview } from "@/lib/directus";
import type { BlogPost } from "@/types/blog";

type BlogCardProps = {
  post: BlogPost;
};

function formatStatus(status?: string | null) {
  if (!status) {
    return "unknown";
  }

  return status.replace(/_/g, " ");
}

export function BlogCard({ post }: BlogCardProps) {
  const imageUrl = getDirectusAssetUrl(post.cover_image);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 shadow-xl shadow-black/25 transition duration-300 hover:-translate-y-1.5 hover:border-cyan-400/30 hover:bg-slate-900"
    >
      <div className="relative h-56 overflow-hidden bg-slate-800">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.22),_transparent_45%),linear-gradient(135deg,_rgba(15,23,42,1),_rgba(30,41,59,0.92))] px-6 text-center text-sm text-slate-300">
            No cover image available
          </div>
        )}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-medium capitalize text-cyan-200 backdrop-blur">
            {formatStatus(post.status)}
          </span>
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold leading-tight text-white transition group-hover:text-cyan-300">
            {post.title}
          </h2>
          <p className="text-sm leading-7 text-slate-400">{getPostPreview(post.post_data, 165)}</p>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>
            {post.published_at
              ? new Date(post.published_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Draft"}
          </span>
          <span className="text-cyan-300 transition group-hover:translate-x-1">Read post</span>
        </div>
      </div>
    </Link>
    
  );
}
