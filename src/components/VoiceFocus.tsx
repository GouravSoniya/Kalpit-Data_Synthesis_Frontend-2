"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CYCLE_MS = 6500; // time per scenario
const STEP_MS = 700; // delay between chat bubbles

type Turn = { who: "caller" | "agent"; text: string };

const scenarios: {
  id: string;
  tab: string;
  testCaller?: string;
  turns: Turn[];
  failing: { label: string; text: string; chips: string[] };
}[] = [
  {
    id: "correction",
    tab: "Correction",
    turns: [
      { who: "caller", text: "Send ₹15,000 to my landlord, Mr. Rao." },
      { who: "agent", text: "Sending ₹15,000 to Mr. Rao. Shall I confirm?" },
      { who: "caller", text: "Wait, not Rao. Rai. R-A-I." },
      { who: "agent", text: "Done. ₹15,000 sent to Mr. Rao." },
    ],
    failing: {
      label: "Failing turn · Turn 4",
      text: "The caller corrected the name. The agent kept the old recipient and moved the money.",
      chips: ["Correction · missed", "Wrong recipient"],
    },
  },
  {
    id: "misheard",
    tab: "Misheard",
    turns: [
      { who: "caller", text: "Book me a follow-up. I am allergic to penicillin." },
      { who: "agent", text: "Booked for Tuesday, 11 AM." },
      { who: "caller", text: "Did you note the allergy?" },
      { who: "agent", text: "Yes. No allergies on file." },
    ],
    failing: {
      label: "Failing turn · Turn 4",
      text: "The allergy was never recorded, and the agent said it had been. A critical detail was lost.",
      chips: ["Critical detail · lost", "False confirmation"],
    },
  },
  {
    id: "interruption",
    tab: "Interruption",
    turns: [
      {
        who: "agent",
        text: "Your card ending 4821 will be charged ₹8,400 unless you say stop, and the order ships on...",
      },
      { who: "caller", text: "Stop. Do not charge it." },
      { who: "agent", text: "...Monday. Your card has been charged. Thank you." },
    ],
    failing: {
      label: "Failing turn · Turn 3",
      text: "The caller said stop mid-sentence. The agent talked through it and completed the charge.",
      chips: ["Stop · ignored", "Action after stop"],
    },
  },
  {
    id: "accent",
    tab: "Accent",
    testCaller: "Test caller: Hindi-accented English",
    turns: [
      { who: "caller", text: "Cancel the second order, not the first." },
      { who: "agent", text: "Cancelling your first order." },
    ],
    failing: {
      label: "Failing turn · Turn 2",
      text: "Same request, different accent. The agent mis-recognised it. The failure is in the agent, not the caller.",
      chips: ["Request · misunderstood", "Wrong order"],
    },
  },
  {
    id: "unauthorised",
    tab: "Unauthorised",
    testCaller: "Test caller: not the account holder",
    turns: [
      { who: "caller", text: "I am his wife. Change the registered number on the account." },
      { who: "agent", text: "Sure. The number has been updated." },
    ],
    failing: {
      label: "Failing turn · Turn 2",
      text: "No identity check. The agent made a protected change for an unverified caller.",
      chips: ["Identity · not checked", "Policy breach"],
    },
  },
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
        <pattern id="voice-stars" width="168" height="168" patternUnits="userSpaceOnUse" x="-20" y="40">
          <path d={star(42, 42, 14)} />
          <path d={star(126, 42, 24)} />
          <path d={star(84, 126, 22)} />
          <path d={star(0, 126, 14)} />
          <path d={star(168, 126, 14)} />
        </pattern>
        <pattern id="voice-scallops" width="84" height="30" patternUnits="userSpaceOnUse">
          <path d="M0 0Q38 4 42 24Q46 4 84 0" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#voice-stars)" />
      <rect width="100%" height="30" fill="url(#voice-scallops)" />
    </svg>
  );
}

const smallCaps = "text-[11px] font-bold uppercase tracking-[0.14em]";

export default function VoiceFocus() {
  const [activeId, setActiveId] = useState("correction");
  const active = scenarios.find((s) => s.id === activeId)!;

  useEffect(() => {
    const timer = setTimeout(() => {
      const i = scenarios.findIndex((s) => s.id === activeId);
      setActiveId(scenarios[(i + 1) % scenarios.length].id);
    }, CYCLE_MS);
    return () => clearTimeout(timer);
  }, [activeId]);

  return (
    <section className="bg-cream  px-6 py-14 md:px-4">
      <style>{`
        @keyframes vf-pop {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: none; }
        }
        .vf-anim { opacity: 0; animation: vf-pop 450ms ease-out forwards; }
        @media (prefers-reduced-motion: reduce) {
          .vf-anim { opacity: 1; animation: none; }
        }
      `}</style>
      <div className="overflow-hidden rounded-[28px] border border-clay/25 bg-paper">
        {/* Clay panel */}
        <div className="relative isolate overflow-hidden bg-clay px-6 py-10 md:px-16 md:py-14">
          <PanelPattern />

          <div className="grid items-center gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
            {/* Left copy */}
            <div>
              <span className="inline-block rounded-full bg-cream px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-clay">
                Current focus
              </span>
              <h2 className="mt-6 font-serif text-[clamp(2rem,3.7vw,2.9rem)] leading-[1.06] text-cream">
                Voice agents sound fine in a demo.{" "}
                <em className="text-[#f4c77b]">Real callers are different.</em>
              </h2>
              <p className="mt-6 max-w-[32ch] text-xl leading-8 text-cream/85">
                People interrupt, change their minds and call from noisy places.
              </p>
            </div>

            {/* Simulation card */}
            <div className="rounded-3xl border border-clay/25 bg-paper p-5 shadow-xl shadow-ink/10">
              <div role="tablist" aria-label="Failure scenarios" className="flex flex-wrap gap-2">
                {scenarios.map((s) => {
                  const isActive = s.id === activeId;
                  return (
                    <button
                      key={s.id}
                      id={`voice-tab-${s.id}`}
                      role="tab"
                      type="button"
                      aria-selected={isActive}
                      aria-controls="voice-panel"
                      onClick={() => setActiveId(s.id)}
                      className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay ${
                        isActive
                          ? "border-clay bg-clay text-cream"
                          : "border-clay/25 bg-paper text-ink hover:border-clay/60"
                      }`}
                    >
                      {s.tab}
                    </button>
                  );
                })}
              </div>

              <div
                key={active.id}
                id="voice-panel"
                role="tabpanel"
                aria-labelledby={`voice-tab-${active.id}`}
                className="mt-5"
              >
                {active.testCaller && (
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#8a3320]">
                    {active.testCaller}
                  </p>
                )}

                <div className="flex flex-col gap-2.5">
                  {active.turns.map((t, i) => (
                    <div
                      key={i}
                      style={{ animationDelay: `${i * STEP_MS}ms` }}
                      className={`vf-anim w-[88%] rounded-2xl px-3.5 py-2.5 ${
                        t.who === "caller"
                          ? "bg-[#efe2cc]"
                          : "ml-auto border border-clay/25 bg-paper"
                      }`}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brown">
                        {t.who === "caller" ? "Caller" : "Voice agent"}
                      </p>
                      <p className="mt-0.5 text-[15px] leading-6 text-ink">{t.text}</p>
                    </div>
                  ))}
                </div>

                <div
                  style={{ animationDelay: `${active.turns.length * STEP_MS + 200}ms` }}
                  className="vf-anim mt-3 rounded-2xl border border-clay/40 bg-[#fbe9e2] p-4"
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8a3320]">
                    {active.failing.label}
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-brown">{active.failing.text}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {active.failing.chips.map((c) => (
                      <span
                        key={c}
                        className={`${smallCaps} rounded-lg bg-[#f6d9cf] px-3 py-1.5 text-[#8a3320]`}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}