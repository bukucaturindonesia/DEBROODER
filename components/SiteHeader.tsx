"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { contactLinks } from "@/lib/contact";

const navItems = [
  { label: "Koleksi", href: "/koleksi" },
  { label: "Kaos Polos", href: "/kaos-polos" },
  { label: "Sablon DTF", href: "/sablon-dtf" },
  { label: "Jersey", href: "/jersey" },
  { label: "DEBRODER Express", href: "/express" },
  { label: "Store", href: "/store" },
  { label: "Cara Order", href: "/cara-order" }
];

const mobileNavItems = navItems;

const searchItems = [
  {
    title: "Kaos Polos",
    href: "/kaos-polos",
    description: "Kaos polos, cotton combed, dan kebutuhan partai.",
    keywords: ["kaos", "baju", "kaos polos", "cotton combed"]
  },
  {
    title: "Sablon DTF",
    href: "/sablon-dtf",
    description: "Sablon DTF custom untuk brand, event, dan komunitas.",
    keywords: ["sablon", "dtf", "custom"]
  },
  {
    title: "Jersey",
    href: "/jersey",
    description: "Custom jersey untuk tim, komunitas, dan instansi.",
    keywords: ["jersey", "jersey bola", "team"]
  },
  {
    title: "Maklon DTF",
    href: "/maklon-dtf",
    description: "Maklon DTF untuk reseller dan brand apparel.",
    keywords: ["maklon", "dtf", "produksi"]
  },
  {
    title: "Cetak Sublim",
    href: "/cetak-sublim",
    description: "Cetak sublim untuk jersey dan apparel custom.",
    keywords: ["sublim", "cetak sublim"]
  },
  {
    title: "DEBRODER Express",
    href: "/express",
    description: "Pengiriman, ekspedisi, dan distribusi.",
    keywords: ["express", "pengiriman", "ekspedisi", "distribusi"]
  },
  {
    title: "Store Pettarani",
    href: "/store",
    description: "Sablon kaos dan jersey.",
    keywords: ["lokasi", "alamat", "pettarani", "store"]
  },
  {
    title: "Store Tello",
    href: "/store",
    description: "Cetak DTF dan sablon kaos.",
    keywords: ["lokasi", "alamat", "tello", "store"]
  },
  {
    title: "Store Landak",
    href: "/store",
    description: "Cetak DTF dan jersey.",
    keywords: ["lokasi", "alamat", "landak", "store"]
  },
  {
    title: "Store Parepare",
    href: "/store",
    description: "Cetak DTF, sablon, dan kaos polos.",
    keywords: ["lokasi", "alamat", "parepare", "store"]
  },
  {
    title: "Cara Order",
    href: "/cara-order",
    description: "Alur pemesanan DEBRODER.",
    keywords: ["cara order", "order", "pesan"]
  }
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

function DesktopSearchButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="hidden h-11 w-[220px] items-center gap-3 rounded-full bg-brand-offWhite px-4 text-left text-sm font-medium text-brand-charcoal/55 ring-1 ring-transparent transition hover:text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-green lg:flex 2xl:w-[260px]"
      aria-label="Cari produk"
      onClick={onClick}
    >
      <SearchIcon />
      <span>Cari produk</span>
    </button>
  );
}

function SearchModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return searchItems.slice(0, 6);

    return searchItems.filter((item) => {
      const haystack = [
        item.title,
        item.description,
        ...item.keywords
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 40);

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  if (!isOpen) return null;

  function openResult(href: string) {
    onClose();
    router.push(href);
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && results[0]) {
      event.preventDefault();
      openResult(results[0].href);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[80] bg-brand-charcoal/40 px-4 py-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Pencarian DEBRODER"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="mx-auto mt-16 max-w-2xl overflow-hidden rounded-[28px] border border-brand-softGray bg-white shadow-soft">
        <div className="flex items-center gap-3 border-b border-brand-softGray p-4">
          <SearchIcon />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleInputKeyDown}
            aria-label="Cari layanan, produk, atau store"
            placeholder="Cari produk"
            className="min-h-11 flex-1 bg-transparent text-base outline-none placeholder:text-brand-charcoal/40"
          />
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-brand-softGray text-brand-charcoal transition hover:border-brand-green hover:text-brand-green"
            aria-label="Tutup pencarian"
            onClick={onClose}
          >
            x
          </button>
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-3">
          {results.length ? (
            <div className="grid gap-2">
              {results.map((item) => (
                <button
                  key={`${item.title}-${item.href}`}
                  type="button"
                  className="rounded-2xl p-4 text-left transition hover:bg-brand-offWhite"
                  onClick={() => openResult(item.href)}
                >
                  <span className="text-base font-semibold text-brand-charcoal">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-brand-charcoal/60">
                    {item.description}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl bg-brand-offWhite p-4 text-sm text-brand-charcoal/70">
              Tidak ada hasil. Coba kata kunci lain seperti kaos, sablon,
              jersey, store, atau cara order.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  function isActive(href: string) {
    return pathname === href;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-brand-softGray bg-white/95 text-brand-charcoal backdrop-blur-xl">
      <nav
        className="section-shell flex min-h-[62px] items-center justify-between gap-3 md:min-h-[68px]"
        aria-label="Navigasi utama"
      >
        <Link href="/" className="group flex items-center gap-3">
          <Logo
            variant="symbol-black"
            size="md"
            showText
            symbolTone="green"
            className="transition group-hover:scale-[1.02]"
          />
        </Link>

        <div className="hidden items-center gap-3 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-2.5 py-2 text-[13px] font-semibold transition hover:bg-brand-offWhite hover:text-brand-green 2xl:text-sm ${
                isActive(item.href)
                  ? "bg-brand-offWhite text-brand-green"
                  : "text-brand-charcoal/75"
              }`}
            >
              {item.label === "Sablon DTF" ? (
                <span className="navbar-glitch" data-text="Sablon DTF">
                  {item.label}
                </span>
              ) : (
                item.label
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <DesktopSearchButton onClick={() => setIsSearchOpen(true)} />
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-brand-softGray bg-white text-brand-charcoal transition hover:border-brand-green hover:text-brand-green lg:hidden"
            aria-label="Cari"
            onClick={() => setIsSearchOpen(true)}
          >
            <SearchIcon />
          </button>
          <a
            href={contactLinks.whatsapp}
            className="grid h-10 w-10 place-items-center rounded-full border border-brand-softGray bg-white text-brand-green transition hover:border-brand-green hover:bg-brand-offWhite"
            aria-label="Hubungi WhatsApp DEBRODER"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ChatIcon />
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-softGray bg-white text-brand-charcoal transition hover:border-brand-green hover:text-brand-green xl:hidden"
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
              className={`rounded-2xl px-4 py-3 text-base font-semibold transition hover:bg-brand-offWhite hover:text-brand-green ${
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
            className="rounded-2xl px-4 py-3 text-base font-semibold text-brand-charcoal transition hover:bg-brand-offWhite hover:text-brand-green"
            onClick={() => setIsOpen(false)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
}
