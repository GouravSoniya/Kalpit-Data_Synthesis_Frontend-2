import Link from "next/link";

const star = (cx: number, cy: number, r: number) =>
  `M${cx} ${cy - r}Q${cx} ${cy} ${cx + r} ${cy}Q${cx} ${cy} ${cx} ${cy + r}Q${cx} ${cy} ${cx - r} ${cy}Q${cx} ${cy} ${cx} ${cy - r}Z`;

/* ---------- card illustrations ---------- */

function PatternArt() {
  return (
    <div className="relative size-full bg-clay">
      <svg aria-hidden className="absolute inset-0 size-full fill-none stroke-cream/35" strokeWidth={1.2}>
        <defs>
          <pattern id="updates-stars" width="170" height="170" patternUnits="userSpaceOnUse" x="20" y="30">
            <path d={star(0, 0, 22)} />
            <path d={star(85, 0, 18)} />
            <path d={star(42, 85, 24)} />
            <path d={star(127, 85, 17)} />
            <path d={star(0, 170, 22)} />
            <path d={star(85, 170, 18)} />
          </pattern>
          <pattern id="updates-scallops" width="84" height="30" patternUnits="userSpaceOnUse">
            <path d="M0 0Q38 4 42 24Q46 4 84 0" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#updates-stars)" />
        <rect width="100%" height="30" fill="url(#updates-scallops)" />
      </svg>
    </div>
  );
}

const bars = [20, 58, 24, 60, 28, 66, 32, 70, 36, 74, 40, 78, 44, 80, 50, 86, 52, 58, 42, 22, 60, 28];
const amberBars = new Set([3, 8, 13, 18]);

function WaveformArt() {
  return (
    <div className="flex size-full items-center justify-center gap-[6px] bg-[#efe2cc]">
      {bars.map((h, i) => (
        <span
          key={i}
          className={`w-2 rounded-full ${amberBars.has(i) ? "bg-[#c8922f]" : "bg-clay"}`}
          style={{ height: h * 1.0 }}
        />
      ))}
    </div>
  );
}

const hits = new Set(["0-3", "1-1", "1-7", "2-4", "3-1", "3-8", "4-4", "5-2"]);

function DotsArt() {
  return (
    <div className="grid size-full place-items-center bg-paper">
      <div className="grid grid-cols-10 gap-3">
        {Array.from({ length: 60 }, (_, i) => {
          const key = `${Math.floor(i / 10)}-${i % 10}`;
          return (
            <span
              key={key}
              className={`size-[14px] rounded-full ${hits.has(key) ? "bg-clay" : "bg-[#d9c8b0]"}`}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ---------- content ---------- */

const cards = [
  {
    kind: "Experiment",
    title: "Title of an experiment",
    preview: "A short preview of what was tried and what came out of it.",
    art: <PatternArt />,
  },
  {
    kind: "Build note",
    title: "Title of a build note",
    preview: "A short preview of something we made and how it works.",
    art: <WaveformArt />,
  },
  {
    kind: "What we're learning",
    title: "Title of a learning",
    preview: "A short preview of a lesson, an open question or a result.",
    art: <DotsArt />,
  },
];

export default function Updates() {
  return (
    <section id="updates" className="bg-cream px-6 py-16 md:px-[110px]">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-clay">
            From the lab
          </p>
          <h2 className="font-serif text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-tight text-ink">
            Research &amp; <em className="text-clay">updates.</em>
          </h2>
        </div>
        <Link
          href="/updates"
          className="inline-flex items-center gap-2 rounded-full border border-clay px-7 py-3.5 text-base font-semibold text-clay transition-colors hover:bg-clay hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
        >
          View all <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {cards.map((c) => (
          <article
            key={c.kind}
            className="flex flex-col overflow-hidden rounded-3xl border border-clay/25 bg-paper"
          >
            <div className="h-[230px] overflow-hidden border-b border-clay/25">{c.art}</div>
            <div className="flex flex-1 flex-col p-[30px]">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-clay">
                {c.kind}
              </p>
              <h3 className="mt-3 font-serif text-[1.75rem] leading-tight text-ink">{c.title}</h3>
              <p className="mt-3 max-w-[30ch] text-base leading-7 text-brown">{c.preview}</p>
              <p className="mt-auto pt-6 text-[11px] font-medium uppercase tracking-[0.14em] text-brown/60">
                Placeholder · not published
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}