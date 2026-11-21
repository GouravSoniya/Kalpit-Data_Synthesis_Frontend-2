/* Decorative four-pointed star pattern, drawn as SVG rows (server component). */

const W = 1440;
const STEP = 100;

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
}: {
  className: string;
  offset?: number;
  base?: number;
  amp?: number;
  scallops?: boolean;
}) {
  const count = Math.ceil(W / STEP) + 2;
  const cy = 60;
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${W} 120`}
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-x-0 h-[120px] w-full fill-none stroke-clay ${className}`}
      strokeWidth={1.4}
    >
      {Array.from({ length: count }, (_, i) => {
        const x = i * STEP + offset;
        const r = base + amp * Math.abs(Math.sin(i * 0.62 + 0.4));
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
            const x = i * STEP + offset;
            return (
              <path
                key={i}
                d={`M${x - 50} 60Q${x - 6} 66 ${x} 92Q${x + 6} 66 ${x + 50} 60`}
              />
            );
          })}
        </g>
      )}
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-screen flex-col overflow-hidden bg-cream">
      {/* pattern rows */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <StarRow className="top-[-30px] opacity-90" offset={0} scallops />
        <StarRow className="top-[40px] opacity-90" offset={50} />
        <StarRow className="top-[140px] opacity-35" offset={0} base={14} amp={12} />
        <StarRow className="bottom-[140px] opacity-40" offset={50} base={14} amp={12} />
        <StarRow className="bottom-[40px] opacity-90" offset={0} />
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
      <div className="border-t border-clay/25 bg-cream px-6 py-5">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-medium uppercase tracking-[0.16em] text-brown">
          <span>Supported by</span>
          <span className="font-serif text-2xl font-semibold normal-case tracking-normal text-clay">
            Cartesia
          </span>
          <span className="font-serif text-2xl font-semibold normal-case tracking-normal text-clay">
            Render
          </span>
          <span aria-hidden className="text-brown/50">|</span>
          <span>Through their startup programmes</span>
        </div>
      </div>
    </section>
  );
}