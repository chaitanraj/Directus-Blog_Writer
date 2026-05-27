import Link from "next/link";

import { getDirectusAssetUrl, getPostImage, getPostPreview, getPostTitle } from "@/lib/directus";
import type { BlogPost } from "@/types/blog";

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  const title = getPostTitle(post);
  const imageUrl = getDirectusAssetUrl(getPostImage(post));

  return (
    <Link
      href={`/blog/${post.id}`}
      className="block overflow-hidden border border-gray-300 hover:bg-gray-50"
    >
      {imageUrl ? (
        <div className="aspect-[16/9] w-full bg-gray-100 sm:w-1/2 lg:w-1/4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}

      <div className="p-4">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Post #{post.id}</span>
          <span>{post.status ?? "unknown"}</span>
        </div>
        <h2 className="mt-2 text-lg font-medium text-black">{title}</h2>
        <p className="mt-2 text-sm text-gray-700">{getPostPreview(post.post_data, 165)}</p>
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>
            {post.date_created
              ? new Date(post.date_created).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "No date"}
          </span>
          <span>Read post &rarr;</span>
        </div>
      </div>
    </Link>
  );
}
