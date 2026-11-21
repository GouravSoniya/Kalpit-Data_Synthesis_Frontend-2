import Link from "next/link";
import Workflow from "./Workflow";

export default function HowWeTackle() {
  return (
    <section className="bg-cream px-3 pb-4 md:px-4">
      {/* Sits flush under VoiceFocus so the two read as one bordered card */}
      <div className="rounded-b-[28px] border border-t-0 border-clay/25 bg-paper px-6 py-12 md:px-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-clay">
            How we&apos;re tackling it
          </p>
          <h3 className="max-w-[20ch] font-serif text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.1] text-ink md:max-w-[24ch]">
            Imagine the callers, then{" "}
            <em className="text-clay">see where the agent breaks.</em>
          </h3>
        </div>
        <Link
          href="/voice-ai"
          className="inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-clay px-8 py-4 text-lg font-semibold text-cream shadow-[0_10px_24px_-8px] shadow-clay/60 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay md:self-center"
        >
          Explore Voice AI <span aria-hidden>→</span>
        </Link>
        </div>

        <Workflow />
      </div>
    </section>
  );
}