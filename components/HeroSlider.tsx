/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const className = "h-full min-h-[230px] w-full object-cover";

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
      ? "inline-flex min-h-12 items-center justify-center rounded-full bg-brand-green px-7 py-4 text-sm font-semibold text-white transition hover:bg-brand-deep"
      : "inline-flex min-h-12 items-center justify-center rounded-full border border-brand-softGray bg-white px-7 py-4 text-sm font-semibold text-brand-green transition hover:border-brand-green";

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
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const manualPauseTimer = useRef<number | null>(null);
  const total = slides.length;
  const activeSlide = slides[activeIndex] || slides[0];
  const isPaused = isHoverPaused || isManualPaused || prefersReducedMotion;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () =>
      setPrefersReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (total <= 1 || isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [isPaused, total]);

  useEffect(() => {
    return () => {
      if (manualPauseTimer.current) {
        window.clearTimeout(manualPauseTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (activeIndex >= total) {
      setActiveIndex(0);
    }
  }, [activeIndex, total]);

  if (!activeSlide) return null;

  function pauseAfterInteraction() {
    if (manualPauseTimer.current) {
      window.clearTimeout(manualPauseTimer.current);
    }

    setIsManualPaused(true);
    manualPauseTimer.current = window.setTimeout(() => {
      setIsManualPaused(false);
    }, 4800);
  }

  function goTo(index: number) {
    setActiveIndex(index);
    pauseAfterInteraction();
  }

  function goNext() {
    setActiveIndex((current) => (current + 1) % total);
    pauseAfterInteraction();
  }

  function goPrev() {
    setActiveIndex((current) => (current - 1 + total) % total);
    pauseAfterInteraction();
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
    <section id="beranda" className="bg-brand-offWhite pb-5 pt-4 sm:pb-8 sm:pt-6">
      <div className="section-shell">
        <div
          className="relative min-h-[690px] overflow-hidden rounded-[30px] border border-brand-softGray bg-white shadow-soft sm:min-h-[700px] lg:min-h-[530px]"
          onMouseEnter={() => setIsHoverPaused(true)}
          onMouseLeave={() => setIsHoverPaused(false)}
          onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
          onTouchEnd={(event) =>
            handleTouchEnd(event.changedTouches[0].clientX)
          }
        >
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={`${slide.headline}-${index}`}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  isActive
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
                aria-hidden={!isActive}
              >
                <div className="grid h-full grid-rows-[minmax(390px,auto)_1fr] lg:grid-cols-[0.94fr_1.06fr] lg:grid-rows-none">
                  <div className="flex flex-col justify-center px-6 py-7 pb-14 sm:px-10 lg:px-12 lg:py-12">
                    <p className="inline-flex w-fit rounded-full bg-brand-green px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                      {slide.badge || fallbackBadges[index] || "DEBRODER"}
                    </p>
                    <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-brand-charcoal sm:text-5xl lg:text-6xl">
                      {slide.headline}
                    </h1>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-brand-charcoal/70 sm:text-lg sm:leading-8">
                      {slide.subheadline}
                    </p>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <HeroLink href={slide.cta_primary_link} variant="primary">
                        {slide.cta_primary_text}
                      </HeroLink>
                      <HeroLink
                        href={slide.cta_secondary_link || "/koleksi"}
                        variant="secondary"
                      >
                        {slide.cta_secondary_text || "Lihat Koleksi"}
                      </HeroLink>
                    </div>
                  </div>

                  <div className="min-h-[240px] bg-brand-offWhite lg:min-h-full">
                    <HeroImage
                      src={slide.image_url || "/images/debroder-hero.png"}
                      alt={slide.headline}
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {total > 1 ? (
            <>
              <button
                type="button"
                className="absolute left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-brand-softGray bg-white/95 text-lg font-semibold text-brand-green shadow-sm transition hover:border-brand-green hover:bg-white md:grid"
                aria-label="Banner sebelumnya"
                onClick={goPrev}
              >
                {"<"}
              </button>
              <button
                type="button"
                className="absolute right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-brand-softGray bg-white/95 text-lg font-semibold text-brand-green shadow-sm transition hover:border-brand-green hover:bg-white md:grid"
                aria-label="Banner berikutnya"
                onClick={goNext}
              >
                {">"}
              </button>
              <div
                className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full bg-white/90 px-3 py-2 backdrop-blur"
                aria-label="Slider indicator"
              >
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
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
