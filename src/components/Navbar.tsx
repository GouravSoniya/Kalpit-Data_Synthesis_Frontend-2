"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";


const links = [
  { label: "Updates", href: "/updates" },
  { label: "Projects", href: "/projects" },
  { label: "Blogs", href: "/blogs" },
  { label: "About us", href: "/about" },
];

export default function Navbar() {
  const [researchOpen, setResearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // add a backdrop once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close dropdown on outside click / Escape
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setResearchOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setResearchOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const linkClass =
    "text-[14px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:text-clay focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b-2 border-clay/30 bg-cream/95 backdrop-blur-md transition-[box-shadow] duration-300 ${
        scrolled || mobileOpen
          ? "shadow-[0_8px_24px_-12px] shadow-clay/40"
          : "shadow-[0_4px_16px_-12px] shadow-clay/20"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto grid max-w-[1440px] grid-cols-[1fr_auto] items-center px-6 py-4 md:grid-cols-[1fr_auto_1fr] md:px-[70px]"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4">
          <span
            aria-hidden
            className="grid size-11 place-items-center rounded-t-[14px] rounded-b-md bg-clay font-serif text-xl text-cream shadow-md shadow-clay/40"
          >
            क
          </span>
          <span className="text-2xl font-semibold text-ink">Kalpit Labs</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-11 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden justify-self-end md:block">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-clay px-7 py-3.5 text-[15px] font-bold text-cream shadow-[0_10px_24px_-8px] shadow-clay/70 ring-2 ring-clay/20 ring-offset-2 ring-offset-cream transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
          >
            Talk with us <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
          className="justify-self-end rounded-full border-2 border-clay/30 bg-cream p-2 text-ink md:hidden"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </nav>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="mx-6 mb-4 rounded-3xl border-2 border-clay/30 bg-cream p-6 shadow-xl shadow-clay/20 md:hidden">
          <ul className="flex flex-col gap-5">
            {[...links].map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setMobileOpen(false)} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-clay px-6 py-3 text-sm font-semibold text-cream"
              >
                Talk with us <span aria-hidden>→</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}