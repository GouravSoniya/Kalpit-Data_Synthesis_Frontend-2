"use client";

import { useEffect, useRef, useState } from "react";

/* ---------- data ---------- */

const ALL_CHIPS = ["Changes mind", "Interrupts", "Noisy line", "Soft-spoken", "Accent", "Unverified"];

type Scenario = {
  chips: string[];
  failing: number[]; // dot indexes that fail (8 columns x 3 rows)
  ring: number; // the failing dot that gets inspected, then fixed
  testCaller?: string;
  label: { fail: string; pass: string };
  caller: string;
  agentFail: string;
  agentPass: string;
};

const scenarios: Scenario[] = [
  {
    chips: ["Changes mind", "Noisy line"],
    failing: [3, 8, 11, 14, 17],
    ring: 11,
    label: { fail: "Turn 4 · Correction missed", pass: "Turn 4 · Correction handled" },
    caller: "Wait, not Rao. Rai.",
    agentFail: "Done. ₹15,000 sent to Mr. Rao.",
    agentPass: "Got it, Mr. Rai. Send ₹15,000 to Mr. Rai?",
  },
  {
    chips: ["Noisy line", "Soft-spoken"],
    failing: [8, 12, 14, 16, 19, 22],
    ring: 16,
    label: { fail: "Turn 2 · Detail lost", pass: "Turn 2 · Detail captured" },
    caller: "Book a follow-up. I'm allergic to penicillin.",
    agentFail: "Booked. No allergies on file.",
    agentPass: "Booked. I've noted a penicillin allergy. Is that right?",
  },
  {
    chips: ["Interrupts"],
    failing: [0, 3, 14, 18, 22],
    ring: 22,
    label: { fail: "Turn 3 · Stop ignored", pass: "Turn 3 · Stop respected" },
    caller: "Stop. Don't charge it.",
    agentFail: "Charged. Thank you.",
    agentPass: "Stopped. Nothing has been charged.",
  },
  {
    chips: ["Accent"],
    failing: [2, 5, 8, 23],
    ring: 2,
    testCaller: "Test caller: Hindi-accented English",
    label: { fail: "Turn 2 · Request misunderstood", pass: "Turn 2 · Request understood" },
    caller: "Cancel the second order, not the first.",
    agentFail: "Cancelling your first order.",
    agentPass: "Cancelling your second order. Confirm?",
  },
  {
    chips: ["Unverified"],
    failing: [4, 7, 10, 13, 23],
    ring: 7,
    testCaller: "Test caller: not the account holder",
    label: { fail: "Turn 2 · No identity check", pass: "Turn 2 · Request refused" },
    caller: "I'm his wife. Change the number on the account.",
    agentFail: "Sure, the number is updated.",
    agentPass: "I can't change that until the account holder is verified. Shall I send them a check?",
  },
];

/* ---------- timing (ms) ---------- */

const SCENARIO_MS = 9000;
const FILL_END = 3000; // dots fill in
const FIX_START = 6000; // fix is rerun
const LOOP_MS = SCENARIO_MS * scenarios.length;
const TOTAL_DOTS = 24;

type DotState = "pending" | "running" | "held" | "failed" | "rerun" | "fixed";

const dotClass: Record<DotState, string> = {
  pending: "bg-[#eadbc4] scale-[0.7]",
  running: "bg-[#c8922f] scale-[0.85]",
  held: "bg-[#a0bb88] scale-100",
  failed: "bg-clay scale-100",
  rerun: "bg-[#c8922f] scale-100",
  fixed: "bg-[#a0bb88] scale-100",
};

/* ---------- component ---------- */

export default function Workflow() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);

  // Plays only while on screen; shows a still frame for reduced-motion users.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setT(4500);
      return;
    }

    let visible = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.25 },
    );
    io.observe(el);

    let last = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      const dt = now - last;
      last = now;
      if (visible) setT((prev) => (prev + dt) % LOOP_MS);
    }, 80);

    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, []);

  const s = scenarios[Math.floor(t / SCENARIO_MS)];
  const local = t % SCENARIO_MS;

  const filling = local < FILL_END;
  const failShown = local >= FILL_END;
  const fixing = local >= FIX_START;
  const passStyle = fixing; // green card border + glow
  const passContent = local >= FIX_START + 350; // text swaps while faded out
  const cardVisible =
    local >= FILL_END + 300 &&
    !(local >= FIX_START && local < FIX_START + 350) &&
    local < SCENARIO_MS - 300;

  const dotState = (i: number): DotState => {
    if (filling) {
      const start = i * 105;
      if (local < start) return "pending";
      if (local < start + 320) return "running";
    }
    if (fixing && i === s.ring) return local < FIX_START + 700 ? "rerun" : "fixed";
    return s.failing.includes(i) ? "failed" : "held";
  };

  const ringColor = fixing && local >= FIX_START + 700 ? "#3e5a30" : "var(--color-clay)";

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label="Illustrative workflow: set up callers, run conversations, find where the agent fails, then fix it and rerun"
      className="mt-14"
    >
      <div className="grid gap-10 md:grid-cols-3 md:gap-11">
        {/* ---- Step 1 ---- */}
        <Step
          active
          lineClass="solid"
          title="Set up the callers"
          description="Describe who is calling and how they behave."
        >
          <div className="flex flex-wrap content-start gap-2 p-4">
            {ALL_CHIPS.map((c) => {
              const on = s.chips.includes(c);
              return (
                <span
                  key={c}
                  className={`rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300 ${
                    on ? "bg-clay text-cream" : "bg-[#efe2cc] text-ink"
                  }`}
                >
                  {c}
                </span>
              );
            })}
          </div>
        </Step>

        {/* ---- Step 2 ---- */}
        <Step
          active
          lineClass="progress"
          lineFilled={failShown}
          title="Run the conversations"
          description="Each imagined caller talks to your agent."
        >
          <div className="px-5 pt-5">
            <div className="grid grid-cols-8">
              {Array.from({ length: TOTAL_DOTS }, (_, i) => {
                const st = dotState(i);
                const ringed = failShown && i === s.ring;
                return (
                  <div key={i} className="flex h-[34px] items-center justify-center">
                    <span
                      className={`size-[26px] rounded-full transition-[transform,background-color,box-shadow] duration-300 ${dotClass[st]}`}
                      style={{
                        boxShadow: ringed
                          ? `0 0 0 3px var(--color-paper), 0 0 0 5px ${ringColor}`
                          : "0 0 0 0 transparent",
                      }}
                    />
                  </div>
                );
              })}
            </div>

            <p
              className={`mt-5 flex justify-center gap-4 text-[10px] uppercase tracking-[0.16em] text-brown transition-opacity duration-300 ${
                filling ? "opacity-0" : "opacity-100"
              }`}
            >
              <Legend color="var(--color-clay)" label="Failed" />
              <Legend color="#a0bb88" label="Held" />
              <Legend color="#c8922f" label="Rerunning" />
            </p>
          </div>
        </Step>

        {/* ---- Step 3 ---- */}
        <Step
          active={failShown}
          title={fixing ? "Fix it, then rerun" : "See where it fails"}
          description={
            fixing
              ? "Your team changes the agent, then the same call runs again."
              : "Every call is scored, with the failing turn marked."
          }
          cardClass={
            passStyle
              ? "border-[#9dbb88] shadow-[0_0_0_4px_rgba(160,187,136,0.28)]"
              : failShown
                ? "border-clay/50"
                : ""
          }
        >
          <div
            className={`p-4 transition-opacity duration-300 ${cardVisible ? "opacity-100" : "opacity-0"}`}
          >
            <p
              className={`text-[10px] font-bold uppercase tracking-[0.14em] ${
                passContent ? "text-[#3d5a30]" : "text-[#8a3320]"
              }`}
            >
              {passContent ? s.label.pass : s.label.fail}
            </p>
            {s.testCaller && (
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8a3320]">
                {s.testCaller}
              </p>
            )}

            <div className="mt-2 rounded-xl bg-[#efe2cc] px-3 py-2">
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-brown">Caller</p>
              <p className="text-[13px] leading-5 text-ink">{s.caller}</p>
            </div>
            <div className="mt-2 rounded-xl border border-clay/25 bg-paper px-3 py-2">
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-brown">Voice agent</p>
              <p className="text-[13px] leading-5 text-ink">
                {passContent ? s.agentPass : s.agentFail}
              </p>
            </div>

            <span
              className={`mt-3 inline-block rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] ${
                passContent ? "bg-[#e1edd9] text-[#3d5a30]" : "bg-[#f6d9cf] text-[#8a3320]"
              }`}
            >
              {passContent ? "Pass" : "Fail"}
            </span>
          </div>
        </Step>
      </div>

      <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.16em] text-brown">
        Illustrative workflow, draft description
      </p>
    </div>
  );
}

/* ---------- pieces ---------- */

function Step({
  active,
  title,
  description,
  children,
  lineClass,
  lineFilled,
  cardClass = "",
}: {
  active: boolean;
  title: string;
  description: string;
  children: React.ReactNode;
  lineClass?: "solid" | "progress";
  lineFilled?: boolean;
  cardClass?: string;
}) {
  return (
    <div className="relative flex flex-col">
      {/* connector to the next step (desktop only) */}
      {lineClass && (
        <div aria-hidden className="absolute -right-11 left-[46px] top-[18px] z-0 hidden h-[3px] md:block">
          {lineClass === "solid" ? (
            <div className="h-full w-full bg-clay" />
          ) : (
            <>
              <div className="absolute inset-x-0 top-[1px] border-t-2 border-dashed border-[#d9c8b0]" />
              <div
                className="absolute inset-y-0 left-0 bg-clay"
                style={{
                  width: lineFilled ? "100%" : "0%",
                  transition: lineFilled ? "width 600ms ease-out" : "none",
                }}
              />
            </>
          )}
        </div>
      )}

      {/* node */}
      <span
        aria-hidden
        className={`relative z-10 grid size-10 place-items-center rounded-full text-lg transition-all duration-300 ${
          active
            ? "bg-clay text-cream shadow-[0_0_0_6px] shadow-clay/15"
            : "bg-[#eadbc4] text-cream/70"
        }`}
      >
        ✦
      </span>

      <h4 className="mt-5 font-serif text-[1.6rem] leading-tight text-ink">{title}</h4>
      <p className="mt-2 min-h-[2.75rem] text-[15px] leading-[1.45] text-brown">{description}</p>

      <div
        className={`mt-4 min-h-[15rem] flex-1 rounded-2xl border border-clay/25 bg-paper transition-[border-color,box-shadow] duration-500 md:min-h-[17.5rem] ${cardClass}`}
      >
        {children}
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="size-[5px] rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}