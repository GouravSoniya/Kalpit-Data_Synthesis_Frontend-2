import { getAllPosts } from "@/lib/blog";
import { getAllUpdates } from "@/lib/updates";

export type FeedItem = {
  id: string;
  kind: "Blog" | "Update";
  href: string;
  title: string;
  preview: string;
  date: string;
};

/* strip the little bit of markdown updates can contain */
const plain = (md: string) =>
  md
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();

/* updates have no title: first sentence becomes the title, the rest the preview */
function splitUpdate(md: string) {
  const text = plain(md);
  const m = text.match(/^(.+?[.!?])\s+(.*)$/);
  return m ? { title: m[1], preview: m[2] } : { title: text, preview: "" };
}

export function getLatestFeed(limit = 3): FeedItem[] {
  const blogs: FeedItem[] = getAllPosts().map((p) => ({
    id: `blog-${p.slug}`,
    kind: "Blog",
    href: `/blogs/${p.slug}`,
    title: p.title,
    preview: p.description,
    date: p.date,
  }));

  const updates: FeedItem[] = getAllUpdates().map((u) => ({
    id: `update-${u.slug}`,
    kind: "Update",
    href: `/updates#${u.slug}`,
    ...splitUpdate(u.content),
    date: u.date,
  }));

  return [...blogs, ...updates]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, limit);
}