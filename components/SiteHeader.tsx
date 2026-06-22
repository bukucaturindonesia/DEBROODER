"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { contactLinks } from "@/lib/contact";

const navItems = [
  { label: "Koleksi", href: "/koleksi", hasMega: true },
  { label: "Kaos Polos", href: "/kaos-polos" },
  { label: "Sablon DTF", href: "/sablon-dtf" },
  { label: "Jersey", href: "/jersey" },
  { label: "DEBRODER Express", href: "/express" },
  { label: "Store", href: "/store" },
  { label: "Cara Order", href: "/cara-order" }
];

const megaItems = [
  {
    title: "Kaos Polos",
    description: "Kaos NSA, cotton combed, dan kebutuhan partai.",
    href: "/kaos-polos"
  },
  {
    title: "Sablon DTF",
    description: "Sablon custom untuk brand, event, dan komunitas.",
    href: "/sablon-dtf"
  },
  {
    title: "Custom Jersey",
    description: "Jersey team untuk sekolah, kantor, dan komunitas.",
    href: "/jersey"
  },
  {
    title: "Maklon DTF",
    description:
      "Layanan maklon DTF untuk kebutuhan produksi, reseller, dan brand apparel.",
    href: "/maklon-dtf"
  },
  {
    title: "Cetak Sublim",
    description:
      "Layanan cetak sublim untuk jersey, apparel custom, dan kebutuhan produksi kreatif.",
    href: "/cetak-sublim"
  },
  {
    title: "DEBRODER Express",
    description: "Pengiriman dan distribusi antar wilayah.",
    href: "/express"
  }
];

const mobileNavItems = [
  ...navItems.map((item) => ({ label: item.label, href: item.href })),
  ...megaItems
    .filter((mega) => !navItems.some((item) => item.href === mega.href))
    .map((mega) => ({ label: mega.title, href: mega.href }))
];

const topbarItems = [
  { label: "Layanan Pelanggan", href: "/cara-order" },
  { label: "Lacak Pesanan", href: "/cara-order" },
  { label: "Temukan Toko", href: "/store" }
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
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  function isActive(href: string) {
    return pathname === href;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-brand-softGray bg-white/95 text-brand-charcoal backdrop-blur-xl">
      <div className="hidden border-b border-brand-softGray bg-brand-offWhite text-xs font-semibold text-brand-charcoal/70 md:block">
        <div className="section-shell flex h-9 items-center justify-between">
          <div className="flex items-center gap-5">
            {topbarItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition hover:text-brand-green"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <span className="font-black text-brand-green">ID</span>
        </div>
      </div>

      <nav
        className="section-shell flex min-h-[72px] items-center justify-between gap-4"
        aria-label="Navigasi utama"
      >
        <Link href="/" className="group flex items-center gap-3">
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
        </Link>

        <div className="hidden items-center gap-6 xl:flex">
          {navItems.map((item) =>
            item.hasMega ? (
              <div key={item.href} className="group relative py-6">
                <Link
                  href={item.href}
                  className={`text-sm font-bold transition hover:text-brand-green ${
                    isActive(item.href)
                      ? "rounded-full bg-brand-offWhite px-3 py-2 text-brand-green"
                      : "text-brand-charcoal/75"
                  }`}
                >
                  {item.label}
                </Link>
                <div className="invisible absolute left-1/2 top-[68px] w-[720px] -translate-x-1/2 rounded-[28px] border border-brand-softGray bg-white p-5 opacity-0 shadow-soft transition group-hover:visible group-hover:opacity-100">
                  <div className="grid grid-cols-2 gap-3">
                    {megaItems.map((mega) => (
                      <Link
                        key={mega.title}
                        href={mega.href}
                        className={`rounded-2xl p-4 transition hover:bg-white hover:shadow-sm ${
                          isActive(mega.href)
                            ? "bg-brand-green text-white"
                            : "bg-brand-offWhite"
                        }`}
                      >
                        <p
                          className={`text-base font-black ${
                            isActive(mega.href)
                              ? "text-white"
                              : "text-brand-green"
                          }`}
                        >
                          {mega.title}
                        </p>
                        <p
                          className={`mt-2 text-sm leading-6 ${
                            isActive(mega.href)
                              ? "text-white/75"
                              : "text-brand-charcoal/65"
                          }`}
                        >
                          {mega.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-bold transition hover:text-brand-green ${
                  isActive(item.href)
                    ? "rounded-full bg-brand-offWhite px-3 py-2 text-brand-green"
                    : "text-brand-charcoal/75"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
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
          <Link
            href="/koleksi"
            className="grid h-11 w-11 place-items-center rounded-full border border-brand-softGray bg-white text-brand-charcoal transition hover:border-brand-green hover:text-brand-green"
            aria-label="Cari layanan"
          >
            <SearchIcon />
          </Link>
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
          {mobileNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-2xl px-4 py-3 text-base font-black transition hover:bg-brand-offWhite hover:text-brand-green ${
                isActive(item.href)
                  ? "bg-brand-offWhite text-brand-green"
                  : "text-brand-charcoal"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={contactLinks.whatsapp}
            className="rounded-2xl px-4 py-3 text-base font-black text-brand-charcoal transition hover:bg-brand-offWhite hover:text-brand-green"
            onClick={() => setIsOpen(false)}
            target="_blank"
            rel="noreferrer"
          >
            Hubungi Kami
          </a>
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
