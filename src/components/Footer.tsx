import Link from "next/link";

const explore = [
  { label: "Research", href: "/research" },
  { label: "Problems", href: "/problems" },
  { label: "Updates", href: "/updates" },
  { label: "Team", href: "/team" },
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
        <pattern id="footer-stars" width="168" height="168" patternUnits="userSpaceOnUse" x="-20" y="40">
          <path d={star(42, 42, 14)} />
          <path d={star(126, 42, 24)} />
          <path d={star(84, 126, 22)} />
          <path d={star(0, 126, 14)} />
          <path d={star(168, 126, 14)} />
        </pattern>
        <pattern id="footer-scallops" width="84" height="30" patternUnits="userSpaceOnUse">
          <path d="M0 0Q38 4 42 24Q46 4 84 0" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#footer-stars)" />
      <rect width="100%" height="30" fill="url(#footer-scallops)" />
    </svg>
  );
}

const colHeading = "mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-brown/70";
const footLink = "text-[17px] text-ink transition-colors hover:text-clay";

export default function Footer() {
  return (
    <>
      {/* Contact CTA */}
      <section id="contact" className="bg-cream px-6 pt-6 md:px-[110px]">
        <div className="relative isolate overflow-hidden rounded-[28px] bg-clay px-6 py-20 text-center md:py-24">
          <PanelPattern />
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-[#f4c77b]">
            Contact
          </p>
          <h2 className="mx-auto max-w-4xl font-serif text-[clamp(2.25rem,5vw,4rem)] leading-[1.08] tracking-tight text-cream">
            Have a problem <em className="text-[#f4c77b]">worth exploring?</em>
          </h2>
          <p className="mt-6 text-lg text-cream/90 md:text-xl">
            Tell us what you are building and where it breaks.
          </p>
          <Link
            href="/contact"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-paper px-9 py-4 text-lg font-semibold text-clay shadow-[0_14px_30px_-10px] shadow-ink/40 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
          >
            Talk to us <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cream px-6 md:px-[110px]">
        <div className="grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_0.85fr] md:py-[100px] md:pb-[50px]">
          <div>
            <Link href="/" className="inline-flex items-center gap-4">
              <span
                aria-hidden
                className="grid size-10 place-items-center rounded-t-[14px] rounded-b-md bg-clay font-serif text-lg text-cream"
              >
                क
              </span>
              <span className="text-xl text-ink">Kalpit Labs</span>
            </Link>
            <p className="mt-5 max-w-[22rem] text-base leading-7 text-brown">
              An applied AI lab exploring synthetic data, simulation and evaluation.
            </p>
          </div>

          <nav aria-label="Explore">
            <p className={colHeading}>Explore</p>
            <ul className="flex flex-col gap-3.5">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={footLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={colHeading}>Contact</p>
            <ul className="flex flex-col gap-3.5 text-[17px] text-ink">
              <li>Email address to be added</li>
              <li>Location to be added</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-clay/25 py-7 text-sm text-brown/70">
          <p>© 2026 Kalpit Labs</p>
          <p>Footer links are placeholders</p>
        </div>
      </footer>
    </>
  );
}