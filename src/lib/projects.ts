import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "public/content/projects");

export type Project = {
  slug: string;
  title: string;
  description: string;
  status: string; // e.g. Live, Building, Research, Paused
  order: number;
  link?: { href: string; label: string };
};

const SLUG_RE = /^[a-z0-9-]+$/i;

export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f): Project | null => {
      const slug = f.replace(/\.md$/, "");
      if (!SLUG_RE.test(slug)) return null;

      const { data } = matter(fs.readFileSync(path.join(PROJECTS_DIR, f), "utf8"));
      if (data.draft) return null;

      return {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ""),
        status: String(data.status ?? "Building"),
        order: typeof data.order === "number" ? data.order : 999,
        link: data.link
          ? { href: String(data.link), label: String(data.linkLabel ?? "Learn more") }
          : undefined,
      };
    })
    .filter((p): p is Project => p !== null)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}