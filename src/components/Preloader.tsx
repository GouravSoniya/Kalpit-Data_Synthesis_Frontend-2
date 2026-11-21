"use client";

import { useEffect, useState } from "react";

/*
  Timeline
  0.15s  outer star draws itself
  0.55s  inner star draws, star turns a quarter-turn
  0.7s   name + tagline rise in
  ~2.0s  (and page fully loaded) -> cream curtain lifts with a scalloped edge
*/

const MIN_MS = 2000;
const EXIT_MS = 900;

const css = `
.kp-draw{stroke-dasharray:1;stroke-dashoffset:1;animation:kp-draw 1.1s cubic-bezier(.6,.05,.2,1) .15s forwards}
.kp-draw-2{stroke-dasharray:1;stroke-dashoffset:1;animation:kp-draw .9s cubic-bezier(.6,.05,.2,1) .55s forwards}
.kp-turn{animation:kp-turn 1.9s cubic-bezier(.65,0,.35,1) .15s both}
.kp-dot{opacity:0;transform-box:fill-box;transform-origin:center;animation:kp-pop .5s cubic-bezier(.3,1.6,.5,1) 1.05s forwards}
.kp-rise{opacity:0;animation:kp-rise .7s cubic-bezier(.2,.7,.2,1) forwards}
.kp-failsafe{animation:kp-failsafe 0s 7s forwards}
@keyframes kp-draw{to{stroke-dashoffset:0}}
@keyframes kp-turn{from{transform:rotate(-90deg)}to{transform:rotate(0deg)}}
@keyframes kp-pop{from{opacity:0;transform:scale(0)}to{opacity:1;transform:scale(1)}}
@keyframes kp-rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes kp-failsafe{to{visibility:hidden;pointer-events:none}}
@media (prefers-reduced-motion:reduce){
  .kp-draw,.kp-draw-2{animation:none;stroke-dashoffset:0}
  .kp-turn{animation:none}
  .kp-dot{animation:none;opacity:1}
  .kp-rise{animation:none;opacity:1}
}
`;

const star = (r: number) =>
  `M0 ${-r}Q0 0 ${r} 0Q0 0 0 ${r}Q0 0 ${-r} 0Q0 0 0 ${-r}Z`;

export default function Preloader() {
  const [phase, setPhase] = useState<"show" | "exit" | "done">("show");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden"; // no scrolling behind the loader

    let cancelled = false;
    const timers: number[] = [];

    const minDelay = new Promise<void>((r) => timers.push(window.setTimeout(r, reduced ? 300 : MIN_MS)));
    const loaded = new Promise<void>((r) => {
      if (document.readyState === "complete") r();
      else window.addEventListener("load", () => r(), { once: true });
      timers.push(window.setTimeout(r, 5000)); // never wait longer than 5s
    });

    Promise.all([minDelay, loaded]).then(() => {
      if (cancelled) return;
      setPhase("exit");
      timers.push(
        window.setTimeout(() => {
          setPhase("done");
          root.style.overflow = prevOverflow;
        }, reduced ? 0 : EXIT_MS),
      );
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      root.style.overflow = prevOverflow;
    };
  }, []);

  if (phase === "done") return null;

  const exiting = phase === "exit";

  return (
    <div
      role="status"
      aria-label="Loading Kalpit Labs"
      className="kp-failsafe fixed inset-0 z-[100] overflow-hidden"
      style={{ pointerEvents: exiting ? "none" : "auto" }}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* The curtain: cream panel with a scalloped bottom edge */}
      <div
        className="absolute inset-0 bg-cream"
        style={{
          transform: exiting ? "translateY(-100%)" : "translateY(0)",
          transition: `transform ${EXIT_MS}ms cubic-bezier(.76,0,.24,1)`,
          willChange: "transform",
        }}
      >
        {/* centered content */}
        <div
          className="flex size-full flex-col items-center justify-center px-6 text-center"
          style={{ opacity: exiting ? 0 : 1, transition: "opacity 350ms ease" }}
        >
          <svg
            aria-hidden
            viewBox="-50 -50 100 100"
            className="kp-turn size-28 fill-none stroke-clay md:size-32"
            strokeWidth={2}
            strokeLinejoin="round"
          >
            <path className="kp-draw" pathLength={1} d={star(44)} />
            <path className="kp-draw-2" pathLength={1} d={star(22)} />
            <circle className="kp-dot fill-clay" cx={0} cy={0} r={2.6} stroke="none" />
          </svg>

          <p
            className="kp-rise mt-8 font-serif text-3xl text-ink md:text-4xl"
            style={{ animationDelay: "0.7s" }}
          >
            Kalpit Labs
          </p>
          <p
            className="kp-rise mt-3 text-[11px] font-medium uppercase tracking-[0.22em] text-clay"
            style={{ animationDelay: "0.95s" }}
          >
            Kalpit means imagined
          </p>
        </div>

        {/* scalloped edge, hangs below the panel */}
        <svg
          aria-hidden
          className="absolute inset-x-0 top-full h-[30px] w-full fill-cream"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="preloader-scallops" width="84" height="30" patternUnits="userSpaceOnUse">
              <path d="M0 0H84Q46 4 42 28Q38 4 0 0Z" />
            </pattern>
          </defs>
          <rect width="100%" height="30" fill="url(#preloader-scallops)" />
        </svg>
      </div>
    </div>
  );
}