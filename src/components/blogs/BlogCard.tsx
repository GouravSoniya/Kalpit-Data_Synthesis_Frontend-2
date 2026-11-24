import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/blog";

export default function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group relative flex h-[340px] w-full flex-col overflow-hidden rounded-[28px] border border-clay/25 bg-paper p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-clay hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.3)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay md:h-[250px] md:flex-row md:items-center md:justify-between md:gap-12 md:p-10"
    >
      <div className="min-w-0 md:max-w-[60%]">
        <p className="text-xs font-medium tracking-[0.2em] text-clay uppercase">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden className="mx-2">✦</span>
          {post.readingTime} min read
        </p>

        <h2 className="mt-5 line-clamp-2 font-serif text-[clamp(1.6rem,2.4vw,2.1rem)] leading-[1.15] tracking-tight text-ink transition-colors duration-300 group-hover:text-clay">
          {post.title}
        </h2>

        <p className="mt-4 line-clamp-2 text-base leading-7 text-brown">
          {post.description}
        </p>
      </div>

      <span className="mt-auto inline-flex shrink-0 items-center gap-2 pt-6 text-sm font-semibold text-clay md:mt-0 md:pt-0">
        Read post
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-1.5"
        >
          →
        </span>
      </span>
    </Link>
  );
}