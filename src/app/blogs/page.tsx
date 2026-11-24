import type { Metadata } from "next";
import BlogCard from "@/components/blogs/BlogCard";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes from the lab on voice agents, evaluation and applied AI.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-cream px-6 pt-36 pb-24 md:px-[110px]">
      <header className="mx-auto max-w-[1440px]">
        <p className="mb-5 text-xs font-medium tracking-[0.2em] text-clay uppercase">
          Blog
        </p>
        <h1 className="max-w-[18ch] font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.08] tracking-tight text-ink">
          Notes from <em className="text-clay">the lab.</em>
        </h1>
        <p className="mt-6 max-w-[34rem] text-lg leading-8 text-brown">
          What we are testing, breaking and learning along the way.
        </p>
      </header>

      <section className="mx-auto mt-16 max-w-[1440px]">
        {posts.length === 0 ? (
          <p className="rounded-[28px] border border-clay/25 bg-paper p-10 text-lg text-brown">
            No posts yet. Add a .md file to <code>content/blog</code> to publish one.
          </p>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}