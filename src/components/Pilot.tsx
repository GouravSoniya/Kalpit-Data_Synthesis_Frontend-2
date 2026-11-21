import Link from "next/link";

const audience = [
  "Teams building voice agents",
  "Teams who want to see where theirs breaks",
  "Teams happy to share feedback",
];

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
        <pattern id="pilot-stars" width="168" height="168" patternUnits="userSpaceOnUse" x="-20" y="40">
          <path d={star(42, 42, 14)} />
          <path d={star(126, 42, 24)} />
          <path d={star(84, 126, 22)} />
          <path d={star(0, 126, 14)} />
          <path d={star(168, 126, 14)} />
        </pattern>
        <pattern id="pilot-scallops" width="84" height="30" patternUnits="userSpaceOnUse">
          <path d="M0 0Q38 4 42 24Q46 4 84 0" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pilot-stars)" />
      <rect width="100%" height="30" fill="url(#pilot-scallops)" />
    </svg>
  );
}

export default function Pilot() {
  return (
    <section id="pilot" className="bg-cream px-6 py-20 md:px-[110px]">
      <div className="grid overflow-hidden rounded-[28px] border border-clay/25 bg-paper md:grid-cols-[1.15fr_1fr]">
        {/* Left: pitch */}
        <div className="px-8 py-12 md:px-[60px] md:py-[62px]">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-clay">Pilot</p>
          <h2 className="max-w-[14ch] font-serif text-[clamp(2.25rem,4.2vw,3.4rem)] leading-[1.05] tracking-tight text-ink">
            Building a voice agent?{" "}
            <em className="text-clay">Help shape what we test.</em>
          </h2>
          <p className="mt-7 max-w-[34rem] text-lg leading-8 text-brown">
            We are looking for teams to try our voice evaluation approach early and tell us what
            they need.
          </p>
          <Link
            href="/contact"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-clay px-8 py-4 text-base font-semibold text-cream shadow-[0_10px_24px_-8px] shadow-clay/60 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
          >
            Discuss a pilot <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Right: who it's for */}
        <div className="relative isolate flex items-center overflow-hidden bg-clay px-8 py-12 md:px-[52px]">
          <PanelPattern />
          <div className="w-full">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#f4c77b]">
              Who it&apos;s for
            </p>
            <ul className="border-t border-cream/30">
              {audience.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 border-b border-cream/30 py-5 text-[19px] text-cream last:border-b-0"
                >
                  <span aria-hidden className="text-xl text-[#f4c77b]">
                    ✦
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}