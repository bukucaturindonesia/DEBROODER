/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { HeroBanner } from "@/lib/types";
import { normalizeWhatsappLink } from "@/lib/url";

const fallbackBadges = [
  "KAOS POLOS IMPORT & SABLON",
  "PRODUKSI APPAREL",
  "CUSTOM JERSEY"
];

function HeroImage({
  src,
  alt,
  priority
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const className = "h-full min-h-[260px] w-full object-cover";

  if (src.startsWith("/")) {
    return (
      <Image
        src={src}
        alt={alt}
        width={1536}
        height={1024}
        priority={priority}
        className={className}
        sizes="(min-width: 1024px) 48vw, 100vw"
      />
    );
  }

  return <img src={src} alt={alt} className={className} loading="lazy" />;
}

function HeroLink({
  href,
  children,
  variant
}: {
  href: string;
  children: string;
  variant: "primary" | "secondary";
}) {
  const safeHref = normalizeWhatsappLink(href);
  const isExternal = safeHref.startsWith("http");
  const className =
    variant === "primary"
      ? "inline-flex min-h-12 items-center justify-center rounded-full bg-brand-green px-7 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-brand-deep"
      : "inline-flex min-h-12 items-center justify-center rounded-full border border-brand-softGray bg-white px-7 py-4 text-sm font-black text-brand-green transition hover:-translate-y-0.5 hover:border-brand-green";

  return (
    <a
      href={safeHref}
      className={className}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

export function HeroSlider({ heroes }: { heroes: HeroBanner[] }) {
  const slides = useMemo(
    () => heroes.filter((hero) => hero.status_aktif !== false),
    [heroes]
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const total = slides.length;
  const activeSlide = slides[activeIndex] || slides[0];

  useEffect(() => {
    if (total <= 1 || isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [isPaused, total]);

  useEffect(() => {
    if (activeIndex >= total) {
      setActiveIndex(0);
    }
  }, [activeIndex, total]);

  if (!activeSlide) return null;

  function goTo(index: number) {
    setActiveIndex(index);
  }

  function goNext() {
    setActiveIndex((current) => (current + 1) % total);
  }

  function goPrev() {
    setActiveIndex((current) => (current - 1 + total) % total);
  }

  function handleTouchEnd(x: number) {
    if (touchStart === null || total <= 1) return;

    const delta = touchStart - x;
    if (Math.abs(delta) > 44) {
      if (delta > 0) goNext();
      else goPrev();
    }
    setTouchStart(null);
  }

  return (
    <section id="beranda" className="bg-brand-offWhite py-5 sm:py-8">
      <div className="section-shell">
        <div
          className="relative overflow-hidden rounded-[32px] border border-brand-softGray bg-white shadow-soft"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
          onTouchEnd={(event) =>
            handleTouchEnd(event.changedTouches[0].clientX)
          }
        >
          <div className="grid lg:grid-cols-[0.94fr_1.06fr]">
            <div className="order-1 min-h-[260px] bg-brand-offWhite lg:order-2">
              <HeroImage
                src={activeSlide.image_url || "/images/debroder-hero.png"}
                alt={activeSlide.headline}
                priority={activeIndex === 0}
              />
            </div>

            <div className="order-2 flex flex-col justify-center px-6 py-8 sm:px-10 lg:order-1 lg:px-12 lg:py-12">
              <p className="inline-flex w-fit rounded-full bg-brand-green px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-white">
                {activeSlide.badge || fallbackBadges[activeIndex] || "DEBRODER"}
              </p>
              <h1 className="mt-6 max-w-2xl text-4xl font-black leading-tight tracking-tight text-brand-charcoal sm:text-6xl">
                {activeSlide.headline}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-brand-charcoal/70 sm:text-lg sm:leading-8">
                {activeSlide.subheadline}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <HeroLink
                  href={activeSlide.cta_primary_link}
                  variant="primary"
                >
                  {activeSlide.cta_primary_text}
                </HeroLink>
                <HeroLink
                  href={activeSlide.cta_secondary_link || "/koleksi"}
                  variant="secondary"
                >
                  {activeSlide.cta_secondary_text || "Lihat Koleksi"}
                </HeroLink>
              </div>

              {total > 1 ? (
                <div className="mt-8 flex items-center justify-between gap-4">
                  <div className="flex gap-2" aria-label="Slider indicator">
                    {slides.map((slide, index) => (
                      <button
                        key={`${slide.headline}-${index}`}
                        type="button"
                        className={`h-2.5 rounded-full transition ${
                          index === activeIndex
                            ? "w-8 bg-brand-green"
                            : "w-2.5 bg-brand-softGray hover:bg-brand-green/40"
                        }`}
                        aria-label={`Tampilkan banner ${index + 1}`}
                        aria-current={index === activeIndex}
                        onClick={() => goTo(index)}
                      />
                    ))}
                  </div>
                  <div className="hidden gap-2 md:flex">
                    <button
                      type="button"
                      className="grid h-10 w-10 place-items-center rounded-full border border-brand-softGray text-lg font-black text-brand-green transition hover:border-brand-green"
                      aria-label="Banner sebelumnya"
                      onClick={goPrev}
                    >
                      {"<"}
                    </button>
                    <button
                      type="button"
                      className="grid h-10 w-10 place-items-center rounded-full bg-brand-green text-lg font-black text-white transition hover:bg-brand-deep"
                      aria-label="Banner berikutnya"
                      onClick={goNext}
                    >
                      {">"}
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
