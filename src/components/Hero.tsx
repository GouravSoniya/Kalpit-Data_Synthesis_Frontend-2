import Image from "next/image";

/* Drop the official logo files in /public/logos/ with these names. */
const supporters = [
  { name: "Cartesia", href: "https://cartesia.ai", logo: "/logos/cartesia.svg", w: 90 },
  { name: "Render", href: "https://render.com", logo: "/logos/render.svg", w: 76 },
];

/* Decorative four-pointed star pattern, drawn as SVG rows (server component). */

const W = 1440;
const STEP = 100;
const PERIOD = 10; // stars per repeat, so the loop is seamless
const LOOP = PERIOD * STEP; // px travelled per animation cycle

const r2 = (n: number) => Math.round(n * 100) / 100;

// concave four-pointed star centered on (cx, cy)
function star(cx: number, cy: number, r: number) {
  return `M${cx} ${r2(cy - r)}Q${cx} ${cy} ${r2(cx + r)} ${cy}Q${cx} ${cy} ${cx} ${r2(cy + r)}Q${cx} ${cy} ${r2(cx - r)} ${cy}Q${cx} ${cy} ${cx} ${r2(cy - r)}Z`;
}

function StarRow({
  className,
  offset = 0,
  base = 16,
  amp = 14,
  scallops = false,
  move,
  duration = 40,
}: {
  className: string;
  offset?: number;
  base?: number;
  amp?: number;
  scallops?: boolean;
  move?: "left" | "right";
  duration?: number;
}) {
  // extra stars on both sides so either direction always has stars to show
  const count = Math.ceil(W / STEP) + 2 * PERIOD + 2;
  const cy = 60;
  const xAt = (i: number) => (i - PERIOD) * STEP + offset;
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${W} 120`}
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-x-0 h-[120px] w-full fill-none stroke-clay ${className}`}
      strokeWidth={1.4}
    >
      <g
        className={move ? `star-move-${move}` : undefined}
        style={move ? { animationDuration: `${duration}s` } : undefined}
      >
        {Array.from({ length: count }, (_, i) => {
          const x = xAt(i);
          // i % PERIOD keeps the size pattern identical every LOOP px
          const r = base + amp * Math.abs(Math.sin((i % PERIOD) * 0.62 + 0.4));
          return (
            <g key={i}>
              <path d={star(x, cy, r)} />
              <circle cx={x} cy={cy} r={1.4} className="fill-clay" stroke="none" />
            </g>
          );
        })}
        {scallops && (
          <g transform="translate(0,-60)">
            {Array.from({ length: count }, (_, i) => {
              const x = xAt(i);
              return (
                <path
                  key={i}
                  d={`M${x - 50} 60Q${x - 6} 66 ${x} 92Q${x + 6} 66 ${x + 50} 60`}
                />
              );
            })}
          </g>
        )}
      </g>
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-screen flex-col overflow-hidden bg-cream">
      <style>{`
        @keyframes star-move-left {
          from { transform: translateX(0); }
          to { transform: translateX(-${LOOP}px); }
        }
        @keyframes star-move-right {
          from { transform: translateX(0); }
          to { transform: translateX(${LOOP}px); }
        }
        .star-move-left { animation: star-move-left 40s linear infinite; }
        .star-move-right { animation: star-move-right 40s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .star-move-left, .star-move-right { animation: none; }
        }
      `}</style>

      {/* pattern rows */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {/* upper rows: all go left */}
        <StarRow className="top-[-30px] opacity-90" offset={0} scallops move="left" duration={60} />
        <StarRow className="top-[40px] opacity-90" offset={50} move="left" duration={50} />
        {/* faint middle rows follow their half */}
        <StarRow className="top-[140px] opacity-35" offset={0} base={14} amp={12} move="left" duration={70} />
        <StarRow className="bottom-[140px] opacity-40" offset={50} base={14} amp={12} move="right" duration={65} />
        {/* lower rows: all go right */}
        <StarRow className="bottom-[40px] opacity-90" offset={0} move="right" duration={55} />
      </div>

      {/* content */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-24 pt-40 text-center">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-clay">
          Kalpit means imagined
        </p>

        <h1 className="font-serif text-[clamp(2.5rem,7vw,5.25rem)] leading-[1.08] tracking-tight text-ink">
          We imagine the worlds
          <br />
          <em className="text-clay">AI has yet to meet.</em>
        </h1>

        <p className="mt-8 text-lg text-brown md:text-xl">
          An applied AI lab. Led by curiosity.
        </p>
      </div>

      {/* supporters strip */}
      <div className="border-t-2 border-clay/30 bg-cream/95 px-6 py-4 shadow-[0_-8px_24px_-12px] shadow-clay/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-center gap-x-10 gap-y-3 text-[11px] font-medium uppercase tracking-[0.16em] text-brown md:flex-row">
          <span>Supported by</span>

          <ul className="flex items-center gap-10 md:gap-14">
            {supporters.map((c, i) => (
              <li key={c.name} className="flex items-center gap-10 md:gap-14">
                {i > 0 && (
                    <span
                      aria-hidden
                      className="font-serif text-lg font-normal normal-case tracking-normal text-clay"
                    >
                      &amp;
                    </span>
                )}
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${c.name} (opens in a new tab)`}
                  className="block opacity-80 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
                >
                  <Image
                    src={c.logo}
                    alt={c.name}
                    width={c.w}
                    height={20}
                    className="h-5 w-auto"
                  />
                </a>
              </li>
            ))}
          </ul>

          <span aria-hidden className="hidden h-6 w-px bg-clay/30 md:block" />
          <span className="text-center">Through their startup programmes</span>
        </div>
      </div>
    </section>
  );
}