"use client";

import { useEffect, useState } from "react";

const CYCLE_MS = 3000; // time per domain

type Probe = { text: string; result: "held" | "broke" };

const domains: {
  id: string;
  title: string;
  description: string;
  panelTitle: string;
  probes: Probe[];
}[] = [
  {
    id: "synthetic-data",
    title: "Synthetic data",
    description:
      "Generating realistic data to train and test models where real data is scarce or sensitive.",
    panelTitle: "Synthetic data checks",
    probes: [
      { text: "Preserves rare edge cases", result: "held" },
      { text: "Keeps label balance", result: "held" },
      { text: "Leaks a private record", result: "broke" },
    ],
  },
  {
    id: "simulation",
    title: "Simulation",
    description:
      "Running AI systems through simulated worlds to see how they behave before they meet real ones.",
    panelTitle: "Simulated runs",
    probes: [
      { text: "Recovers from a failed tool call", result: "held" },
      { text: "Stays on task over 50 turns", result: "held" },
      { text: "Follows a user who changes goals", result: "broke" },
    ],
  },
  {
    id: "adversarial-testing",
    title: "Adversarial testing",
    description:
      "Deliberately pushing a system with difficult, misleading and unexpected input to find where it breaks.",
    panelTitle: "Adversarial probes",
    probes: [
      { text: "Contradicts itself mid-call", result: "held" },
      { text: "Pressures for an exception", result: "held" },
      { text: "Tells it to ignore its instructions", result: "broke" },
    ],
  },
];

const badge = {
  held: "bg-[#e1edd9] text-[#3d5a30]",
  broke: "bg-[#f5d9d0] text-[#9a3a22]",
};

/* tiled four-pointed star pattern for the feature panel */
function PanelPattern() {
  const star = (cx: number, cy: number, r: number) =>
    `M${cx} ${cy - r}Q${cx} ${cy} ${cx + r} ${cy}Q${cx} ${cy} ${cx} ${cy + r}Q${cx} ${cy} ${cx - r} ${cy}Q${cx} ${cy} ${cx} ${cy - r}Z`;

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full fill-none stroke-cream/35"
      strokeWidth={1.2}
    >
      <defs>
        <pattern id="panel-stars" width="168" height="168" patternUnits="userSpaceOnUse" x="-20" y="30">
          <path d={star(42, 42, 14)} />
          <path d={star(126, 42, 22)} />
          <path d={star(84, 126, 20)} />
          <path d={star(0, 126, 14)} />
          <path d={star(168, 126, 14)} />
        </pattern>
        <pattern id="panel-scallops" width="84" height="30" patternUnits="userSpaceOnUse">
          <path d="M0 0Q38 4 42 24Q46 4 84 0" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#panel-stars)" />
      <rect width="100%" height="30" fill="url(#panel-scallops)" />
    </svg>
  );
}

export default function ResearchDomains() {
  const [activeId, setActiveId] = useState("adversarial-testing");

  useEffect(() => {
    const timer = setTimeout(() => {
      const i = domains.findIndex((d) => d.id === activeId);
      setActiveId(domains[(i + 1) % domains.length].id);
    }, CYCLE_MS);

    return () => clearTimeout(timer);
  }, [activeId]);
  const active = domains.find((d) => d.id === activeId)!;

  return (
    <section
      id="research"
      className="flex min-h-screen flex-col justify-center bg-cream px-6 py-16 md:px-27.5"
    >
      <style>{`
        @keyframes domain-in {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to { opacity: 1; transform: none; }
        }
        @keyframes probe-in {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: none; }
        }
        .domain-enter { animation: domain-in 1s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .probe-enter { animation: probe-in 1s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .domain-enter, .probe-enter { animation: none; }
        }
      `}</style>
      <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-clay">
        Research domains
      </p>
      <h2 className="font-serif text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[1.05] tracking-tight text-ink">
        Where we
        <br />
        <em className="text-clay">experiment.</em>
      </h2>

      <div className="mt-10 grid gap-6 lg:min-h-[clamp(440px,62vh,620px)] lg:grid-cols-[1.7fr_1fr]">
        {/* Feature panel */}
        <div
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
          className="relative isolate flex items-center overflow-hidden rounded-[28px] bg-clay p-8 md:p-[52px]"
        >
          <PanelPattern />

          <div
            key={active.id}
            className="domain-enter flex w-full flex-col items-start gap-8 md:flex-row md:items-center md:gap-10"
          >
            <div className="md:w-[40%] md:shrink-0">
              <span className="inline-block rounded-full bg-cream px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-clay">
                Research domain
              </span>
              <h3 className="mt-5 font-serif text-4xl leading-[1.1] text-cream md:text-[2.75rem]">
                {active.title}
              </h3>
              <p className="mt-5 text-[17px] leading-7 text-cream/80">
                {active.description}
              </p>
            </div>

            {/* Illustrative results card */}
            <div className="w-full rounded-2xl border border-ink/10 bg-paper p-6 shadow-xl shadow-ink/10">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-brown">
                {active.panelTitle}
              </p>
              <ul className="mt-4 border-t border-clay/25">
                {active.probes.map((p, i) => (
                  <li
                    key={p.text}
                    style={{ animationDelay: `${150 + i * 110}ms` }}
                    className="probe-enter flex items-center justify-between gap-4 border-b border-clay/25 py-3.5 text-[15px] text-ink"
                  >
                    <span>{p.text}</span>
                    <span
                      className={`shrink-0 rounded-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] ${badge[p.result]}`}
                    >
                      {p.result}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Domain list */}
        <div role="tablist" aria-orientation="vertical" className="hidden gap-5 lg:grid lg:grid-rows-3">
          {domains.map((d) => {
            const isActive = d.id === activeId;
            return (
              <button
                key={d.id}
                id={`tab-${d.id}`}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={`panel-${d.id}`}
                onClick={() => setActiveId(d.id)}
                className={`flex min-h-32 items-center justify-between gap-6 rounded-3xl border px-8 py-6 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay ${
                  isActive
                    ? "border-clay bg-paper shadow-[0_18px_40px_-18px] shadow-clay/50"
                    : "border-clay/25 hover:border-clay/60"
                }`}
              >
                {isActive ? (
                  <>
                    <span>
                      <span className="block font-serif text-[1.65rem] leading-tight text-ink">
                        {d.title}
                      </span>
                      <span className="mt-3 block max-w-[28ch] text-[15px] leading-6 text-brown">
                        {d.description}
                      </span>
                    </span>
                    <span aria-hidden className="size-3 shrink-0 rounded-full bg-clay" />
                  </>
                ) : (
                  <>
                    <span className="font-serif text-[1.65rem] leading-tight text-ink">
                      {d.title}
                    </span>
                    <span aria-hidden className="text-xl text-clay">→</span>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}