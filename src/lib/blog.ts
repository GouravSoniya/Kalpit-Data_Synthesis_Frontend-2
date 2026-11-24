import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "public/content/blogs");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO string
  readingTime: number; // minutes
};

export type Post = PostMeta & { content: string };

const SLUG_RE = /^[a-z0-9-]+$/i;

function minutes(text: string) {
  return Math.max(1, Math.round(text.trim().split(/\s+/).length / 200));
}

function parse(slug: string): Post | null {
  if (!SLUG_RE.test(slug)) return null; // blocks path traversal
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  if (data.draft) return null;

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date:
      data.date instanceof Date
        ? data.date.toISOString()
        : String(data.date ?? new Date(0).toISOString()),
    readingTime: minutes(content),
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parse(f.replace(/\.md$/, "")))
    .filter((p): p is Post => p !== null)
    .map(({ content: _content, ...meta }) => meta)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPost(slug: string): Post | null {
  return parse(slug);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}