import type { Project } from "@/lib/projects";

/* the journey a project takes; a status maps to one of these stops */
const stages = ["Research", "Building", "Live"] as const;

function stageIndex(status: string) {
  return stages.findIndex((s) => s.toLowerCase() === status.toLowerCase());
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`size-6 ${filled ? "fill-clay stroke-clay" : "fill-none stroke-clay/40"}`}
      strokeWidth={1.2}
    >
      <path d="M12 1Q12 12 23 12Q12 12 12 23Q12 12 1 12Q12 12 12 1Z" />
    </svg>
  );
}

/* three stars joined by a line: filled up to the current stage */
function StageTrack({ current }: { current: number }) {
  return (
    <ol className="grid grid-cols-3 text-center" aria-hidden>
      {stages.map((label, i) => (
        <li key={label} className="relative flex flex-col items-center gap-2">
          {i > 0 && (
            <span
              className={`absolute top-3 right-1/2 h-px w-full ${
                i <= current ? "bg-clay" : "bg-clay/25"
              }`}
            />
          )}
          <span className="relative grid size-7 place-items-center bg-paper">
            <Star filled={i <= current} />
          </span>
          <span
            className={`text-[10px] font-medium uppercase tracking-[0.14em] ${
              i === current ? "text-clay" : "text-brown/50"
            }`}
          >
            {label}
          </span>
        </li>
      ))}
    </ol>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const current = stageIndex(project.status);
  const external = project.link ? /^https?:\/\//.test(project.link.href) : false;
  const dimmed = current === -1;

  return (
    <article
      className={`grid items-center gap-6 p-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_260px] md:gap-12 md:p-10 ${
        dimmed ? "opacity-75" : ""
      }`}
    >
      <div>
        <p
          className={`text-xs font-semibold uppercase tracking-[0.2em] ${
            dimmed ? "text-brown/70" : "text-clay"
          }`}
        >
          {project.status}
        </p>
        <h2 className="mt-3 font-serif text-[clamp(1.75rem,2.8vw,2.5rem)] leading-[1.1] tracking-tight text-ink">
          {project.title}
        </h2>
      </div>

      <div>
        <p className="text-base leading-7 text-brown md:text-lg md:leading-8">
          {project.description}
        </p>
        {project.link && (
          <a
            href={project.link.href}
            {...(external && { target: "_blank", rel: "noopener noreferrer" })}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-clay underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
          >
            {project.link.label} <span aria-hidden>→</span>
          </a>
        )}
      </div>

      <StageTrack current={current} />
    </article>
  );
}