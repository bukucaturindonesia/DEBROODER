"use client";

import { useState } from "react";

const navItems = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Apparel", href: "#apparel" },
  { label: "Express", href: "#express" },
  { label: "Cabang", href: "#cabang" },
  { label: "Kontak", href: "#kontak" }
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-brand-deep/90 text-white backdrop-blur-xl">
      <nav
        className="section-shell flex h-20 items-center justify-between"
        aria-label="Navigasi utama"
      >
        <a href="#beranda" className="group flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white text-sm font-black tracking-tight text-brand-green transition group-hover:scale-105">
            DB
          </span>
          <span className="leading-none">
            <span className="block text-base font-black tracking-[0.24em]">
              DEBRODER
            </span>
            <span className="mt-2 block text-xs font-medium text-white/70">
              Kaos Polos Import & Sablon
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-white/75 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/70 lg:hidden"
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="sr-only">{isOpen ? "Tutup menu" : "Buka menu"}</span>
          <span className="relative h-4 w-5">
            <span
              className={`absolute left-0 h-0.5 w-5 rounded-full bg-white transition ${
                isOpen ? "top-2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-2 h-0.5 w-5 rounded-full bg-white transition ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 rounded-full bg-white transition ${
                isOpen ? "top-2 -rotate-45" : "top-4"
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        className={`lg:hidden ${
          isOpen ? "block border-t border-white/10" : "hidden"
        }`}
      >
        <div className="section-shell grid gap-2 py-5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-xl px-4 py-3 text-base font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
