"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const researchLinks = [
  { label: "Publications", href: "/research/publications" },
  { label: "Projects", href: "/research/projects" },
];

const links = [
  { label: "Updates", href: "/updates" },
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
    "text-[13px] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:text-clay focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled || mobileOpen
          ? "bg-cream/90 shadow-[0_1px_0_0] shadow-clay/20 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto grid max-w-[1440px] grid-cols-[1fr_auto] items-center px-6 py-7 md:grid-cols-[1fr_auto_1fr] md:px-[70px]"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4">
          <span
            aria-hidden
            className="grid size-10 place-items-center rounded-t-[14px] rounded-b-md bg-clay font-serif text-lg text-cream"
          >
            क
          </span>
          <span className="text-xl text-ink">Kalpit Labs</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-11 md:flex">
          <div ref={menuRef} className="relative">
            <button
              type="button"
              aria-expanded={researchOpen}
              aria-haspopup="menu"
              onClick={() => setResearchOpen((o) => !o)}
              className={`${linkClass} flex items-center gap-2`}
            >
              Research
              <span
                aria-hidden
                className={`text-[9px] transition-transform ${researchOpen ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>

            {researchOpen && (
              <ul
                role="menu"
                className="absolute left-1/2 top-full mt-4 w-48 -translate-x-1/2 overflow-hidden rounded-2xl border border-clay/20 bg-cream py-2 shadow-lg shadow-clay/10"
              >
                {researchLinks.map((l) => (
                  <li key={l.href} role="none">
                    <Link
                      role="menuitem"
                      href={l.href}
                      onClick={() => setResearchOpen(false)}
                      className="block px-5 py-2.5 text-sm text-ink transition-colors hover:bg-clay/10 hover:text-clay"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

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
            className="inline-flex items-center gap-3 rounded-full bg-clay px-6 py-3 text-sm font-semibold text-cream shadow-[0_10px_24px_-8px] shadow-clay/60 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
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
          className="justify-self-end rounded-full p-2 text-ink md:hidden"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </nav>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="mx-6 rounded-3xl border border-clay/20 bg-cream p-6 shadow-lg shadow-clay/10 md:hidden">
          <ul className="flex flex-col gap-5">
            {[...researchLinks, ...links].map((l) => (
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