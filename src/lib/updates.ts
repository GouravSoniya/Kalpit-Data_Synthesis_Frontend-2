import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const UPDATES_DIR = path.join(process.cwd(), "public/content/updates");

export type Update = {
  slug: string;
  date: string; // ISO string
  content: string; // short markdown
  link?: { href: string; label: string };
};

const SLUG_RE = /^[a-z0-9-]+$/i;

export function getAllUpdates(): Update[] {
  if (!fs.existsSync(UPDATES_DIR)) return [];

  return fs
    .readdirSync(UPDATES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f): Update | null => {
      const slug = f.replace(/\.md$/, "");
      if (!SLUG_RE.test(slug)) return null;

      const { data, content } = matter(
        fs.readFileSync(path.join(UPDATES_DIR, f), "utf8"),
      );
      if (data.draft) return null;

      return {
        slug,
        date:
          data.date instanceof Date
            ? data.date.toISOString()
            : String(data.date ?? new Date(0).toISOString()),
        content: content.trim(),
        link: data.link
          ? { href: String(data.link), label: String(data.linkLabel ?? "Read more") }
          : undefined,
      };
    })
    .filter((u): u is Update => u !== null)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function formatUpdateDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}