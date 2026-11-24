import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Markdown from "@/components/blogs/Markdown";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  return (
    <main className="min-h-screen bg-cream px-6 pt-36 pb-24">
      <Suspense
        fallback={
          <p className="mx-auto max-w-[44rem] text-brown">Loading post…</p>
        }
      >
        <PostContent params={params} />
      </Suspense>
    </main>
  );
}

async function PostContent({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-[44rem]">
      <Link
        href="/blogs"
        className="text-sm font-medium text-clay underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
      >
        ← All posts
      </Link>

      <header className="mt-10">
        <p className="text-xs font-medium tracking-[0.2em] text-clay uppercase">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden className="mx-2">✦</span>
          {post.readingTime} min read
        </p>
        <h1 className="mt-5 font-serif text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.08] tracking-tight text-ink">
          {post.title}
        </h1>
        <p className="mt-6 text-xl leading-9 text-brown">{post.description}</p>
      </header>

      <div aria-hidden className="my-12 border-t-2 border-clay/30" />

      <Markdown>{post.content}</Markdown>

      <footer className="mt-20 rounded-[28px] border border-clay/25 bg-paper p-8 md:p-10">
        <p className="font-serif text-2xl leading-snug text-ink">
          Building a voice agent?{" "}
          <em className="text-clay">Help shape what we test.</em>
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex items-center gap-3 rounded-full bg-clay px-7 py-3.5 text-base font-semibold text-cream shadow-[0_10px_24px_-8px] shadow-clay/60 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
        >
          Discuss a pilot <span aria-hidden>→</span>
        </Link>
      </footer>
    </article>
  );
}