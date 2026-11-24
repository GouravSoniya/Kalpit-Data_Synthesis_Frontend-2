import type { Metadata } from "next";
import ProjectCard from "@/components/projects/ProjectCard";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "What we are building and researching, and where each project stands.",
};

const star = (cx: number, cy: number, r: number) =>
  `M${cx} ${cy - r}Q${cx} ${cy} ${cx + r} ${cy}Q${cx} ${cy} ${cx} ${cy + r}Q${cx} ${cy} ${cx - r} ${cy}Q${cx} ${cy} ${cx} ${cy - r}Z`;

function PanelPattern() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 size-full fill-none stroke-cream/30"
      strokeWidth={1.2}
    >
      <defs>
        <pattern id="projects-stars" width="168" height="168" patternUnits="userSpaceOnUse" x="-20" y="40">
          <path d={star(42, 42, 14)} />
          <path d={star(126, 42, 24)} />
          <path d={star(84, 126, 22)} />
          <path d={star(0, 126, 14)} />
          <path d={star(168, 126, 14)} />
        </pattern>
        <pattern id="projects-scallops" width="84" height="30" patternUnits="userSpaceOnUse">
          <path d="M0 0Q38 4 42 24Q46 4 84 0" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#projects-stars)" />
      <rect width="100%" height="30" fill="url(#projects-scallops)" />
    </svg>
  );
}

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="min-h-screen bg-cream px-6 pt-28 pb-24 md:px-[110px]">
      <div className="mx-auto max-w-[1440px]">
        {/* header panel */}
        <header className="relative isolate overflow-hidden rounded-[28px] bg-clay px-8 py-16 md:px-[60px] md:py-14">
          <PanelPattern />
          <p className="mb-5 text-xs font-medium tracking-[0.2em] text-[#f4c77b] uppercase">
            Projects
          </p>
          <h1 className="max-w-[16ch] font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.08] tracking-tight text-cream">
            What we are <em className="text-[#f4c77b]">making.</em>
          </h1>
          <p className="mt-6 max-w-[34rem] text-lg leading-8 text-cream/85">
            Every project moves from research to building to live. Here is where each one stands.
          </p>
        </header>

        {/* project rows */}
        {projects.length === 0 ? (
          <p className="mt-10 rounded-[28px] border border-clay/25 bg-paper p-10 text-lg text-brown">
            No projects yet. Add a .md file to <code>public/content/projects</code> to list one.
          </p>
        ) : (
          <ul className="mt-10 divide-y divide-clay/25 overflow-hidden rounded-[28px] border border-clay/25 bg-paper">
            {projects.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}