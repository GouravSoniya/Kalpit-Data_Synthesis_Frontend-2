import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/blog";

export default function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-clay/25 bg-paper p-8 transition-colors hover:border-clay/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay md:p-10"
    >
      <p className="text-xs font-medium tracking-[0.2em] text-clay uppercase">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden className="mx-2">✦</span>
        {post.readingTime} min read
      </p>

      <h2 className="mt-5 font-serif text-[clamp(1.6rem,2.4vw,2.1rem)] leading-[1.15] tracking-tight text-ink">
        {post.title}
      </h2>

      <p className="mt-4 line-clamp-3 text-base leading-7 text-brown">
        {post.description}
      </p>

      <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-clay">
        Read post
        <span
          aria-hidden
          className="transition-transform group-hover:translate-x-1"
        >
          →
        </span>
      </span>
    </Link>
  );
}