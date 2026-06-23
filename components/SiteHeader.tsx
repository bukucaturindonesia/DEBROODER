"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
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
            placeholder="Cari layanan, produk, atau store..."
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
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    function updateTopbarState() {
      setIsAtTop(window.scrollY < 16);
    }

    updateTopbarState();
    window.addEventListener("scroll", updateTopbarState, { passive: true });
    return () => window.removeEventListener("scroll", updateTopbarState);
  }, []);

  function isActive(href: string) {
    return pathname === href;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-brand-softGray bg-white/95 text-brand-charcoal backdrop-blur-xl">
      <div
        className={`hidden overflow-hidden border-b border-brand-softGray bg-brand-offWhite text-xs font-medium text-brand-charcoal/70 transition-all duration-300 md:block ${
          isAtTop
            ? "max-h-9 translate-y-0 opacity-100"
            : "max-h-0 -translate-y-2 opacity-0"
        }`}
      >
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
          <span className="font-semibold text-brand-green">ID</span>
        </div>
      </div>

      <nav
        className="section-shell flex min-h-[60px] items-center justify-between gap-3 md:min-h-[64px]"
        aria-label="Navigasi utama"
      >
        <Link href="/" className="group flex items-center gap-3">
          <Logo
            variant="symbol-black"
            size="md"
            showText
            className="transition group-hover:scale-[1.02]"
          />
        </Link>

        <div className="hidden items-center gap-4 xl:flex">
          {navItems.map((item) =>
            item.hasMega ? (
              <div key={item.href} className="group relative py-5">
                <Link
                  href={item.href}
                  className={`text-sm font-semibold transition hover:text-brand-green ${
                    isActive(item.href)
                      ? "rounded-full bg-brand-offWhite px-3 py-2 text-brand-green"
                      : "text-brand-charcoal/75"
                  }`}
                >
                  {item.label}
                </Link>
                <div className="invisible absolute left-1/2 top-[60px] w-[720px] -translate-x-1/2 rounded-[28px] border border-brand-softGray bg-white p-5 opacity-0 shadow-soft transition group-hover:visible group-hover:opacity-100">
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
                          className={`text-base font-semibold ${
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
                              : "text-brand-charcoal/70"
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
                className={`text-sm font-semibold transition hover:text-brand-green ${
                  isActive(item.href)
                    ? "rounded-full bg-brand-offWhite px-3 py-2 text-brand-green"
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
            )
          )}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={contactLinks.apparelWhatsapp}
            className="hidden rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-deep lg:inline-flex"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mulai Pesan
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-brand-softGray bg-white text-brand-charcoal transition hover:border-brand-green hover:text-brand-green"
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
          <a
            href={contactLinks.apparelWhatsapp}
            className="mt-2 rounded-full bg-brand-green px-5 py-4 text-center text-sm font-semibold text-white"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
          >
            Mulai Pesan
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
