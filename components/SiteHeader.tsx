"use client";

import { useState } from "react";
import { contactLinks } from "@/lib/contact";

const navItems = [
  { label: "Koleksi", href: "#koleksi" },
  { label: "Kaos Polos", href: "#kaos-polos" },
  { label: "Sablon DTF", href: "#sablon-dtf" },
  { label: "Jersey", href: "#jersey" },
  { label: "DEBRODER Express", href: "#express" },
  { label: "Store", href: "#store" },
  { label: "Cara Order", href: "#cara-order" }
];

const topbarItems = [
  { label: "Layanan Pelanggan", href: "#kontak" },
  { label: "Lacak Pesanan", href: "#kontak" },
  { label: "Temukan Toko", href: "#store" }
];

const mobileExtraItems = [
  ...topbarItems,
  { label: "Hubungi Kami", href: "#kontak" }
];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <circle
        cx="11"
        cy="11"
        r="6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="m16 16 4 4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M5.5 18.5 6.8 15A7.5 7.5 0 1 1 9 17.2l-3.5 1.3Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-softGray bg-white/95 text-brand-charcoal backdrop-blur-xl">
      <div className="hidden border-b border-brand-softGray bg-brand-offWhite text-xs font-semibold text-brand-charcoal/70 md:block">
        <div className="section-shell flex h-9 items-center justify-between">
          <div className="flex items-center gap-5">
            {topbarItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition hover:text-brand-green"
              >
                {item.label}
              </a>
            ))}
          </div>
          <span className="font-black text-brand-green">ID</span>
        </div>
      </div>

      <nav
        className="section-shell flex min-h-[72px] items-center justify-between gap-4"
        aria-label="Navigasi utama"
      >
        <a href="#beranda" className="group flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-green text-sm font-black tracking-tight text-white transition group-hover:scale-105">
            DB
          </span>
          <span className="leading-none">
            <span className="block text-base font-black tracking-[0.2em] text-brand-green">
              DEBRODER
            </span>
            <span className="mt-2 block text-xs font-bold text-brand-charcoal/60">
              Kaos Polos Import & Sablon
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-6 xl:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-bold text-brand-charcoal/75 transition hover:text-brand-green"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={contactLinks.apparelWhatsapp}
            className="hidden rounded-full bg-brand-green px-5 py-3 text-sm font-black text-white transition hover:bg-brand-deep lg:inline-flex"
            target="_blank"
            rel="noreferrer"
          >
            Mulai Pesan
          </a>
          <a
            href="#layanan"
            className="grid h-11 w-11 place-items-center rounded-full border border-brand-softGray bg-white text-brand-charcoal transition hover:border-brand-green hover:text-brand-green"
            aria-label="Cari layanan"
          >
            <SearchIcon />
          </a>
          <a
            href={contactLinks.whatsapp}
            className="grid h-11 w-11 place-items-center rounded-full border border-brand-softGray bg-white text-brand-green transition hover:border-brand-green hover:bg-brand-offWhite"
            aria-label="Hubungi WhatsApp DEBRODER"
            target="_blank"
            rel="noreferrer"
          >
            <ChatIcon />
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-softGray bg-white text-brand-charcoal transition hover:border-brand-green hover:text-brand-green xl:hidden"
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
          >
            <span className="sr-only">
              {isOpen ? "Tutup menu" : "Buka menu"}
            </span>
            <span className="relative h-4 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition ${
                  isOpen ? "top-2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-2 h-0.5 w-5 rounded-full bg-current transition ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition ${
                  isOpen ? "top-2 -rotate-45" : "top-4"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        className={`border-t border-brand-softGray bg-white xl:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="section-shell grid gap-2 py-5">
          {[...navItems, ...mobileExtraItems].map((item) => (
            <a
              key={`${item.label}-${item.href}`}
              href={item.href}
              className="rounded-2xl px-4 py-3 text-base font-black text-brand-charcoal transition hover:bg-brand-offWhite hover:text-brand-green"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href={contactLinks.apparelWhatsapp}
            className="mt-2 rounded-full bg-brand-green px-5 py-4 text-center text-sm font-black text-white"
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsOpen(false)}
          >
            Mulai Pesan
          </a>
        </div>
      </div>
    </header>
  );
}
