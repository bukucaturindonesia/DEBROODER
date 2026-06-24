/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { HeroBanner } from "@/lib/types";

function HeroImage({
  src,
  alt,
  priority
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const className = "h-full w-full object-cover";

  if (src.startsWith("/")) {
    return (
      <Image
        src={src}
        alt={alt}
        width={1536}
        height={1024}
        priority={priority}
        className={className}
        sizes="100vw"
      />
    );
  }

  return <img src={src} alt={alt} className={className} loading="lazy" />;
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
    <section id="beranda" className="w-full bg-brand-offWhite px-3 py-4 sm:px-6 sm:py-6">
      <div
        className="relative mx-auto w-full max-w-[1600px] overflow-hidden rounded-3xl bg-brand-offWhite shadow-soft"
        onMouseEnter={() => setIsHoverPaused(true)}
        onMouseLeave={() => setIsHoverPaused(false)}
        onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
        onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0].clientX)}
      >
        <div className="relative aspect-[16/9] w-full sm:aspect-[16/7]">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            const videoUrl = slide.hero_video_url;

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
                {videoUrl ? (
                  <video
                    src={videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <HeroImage
                    src={slide.image_url || "/images/debroder-hero.png"}
                    alt={slide.headline || "DEBRODER Hero"}
                    priority={index === 0}
                  />
                )}
              </div>
            );
          })}

          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent" />

          <div className="absolute bottom-4 left-4 right-4 z-10 sm:bottom-8 sm:left-8 sm:right-auto">
            <div className="max-w-md rounded-2xl bg-white/90 p-4 shadow-sm backdrop-blur-sm sm:p-6">
              <h1 className="text-2xl font-bold leading-tight text-brand-charcoal sm:text-4xl">
                {activeSlide.headline ||
                  "Kaos Polos, Sablon DTF, dan Jersey Custom"}
              </h1>
              <p className="mt-3 text-sm font-normal leading-6 text-brand-charcoal/70 sm:text-base">
                {activeSlide.subheadline ||
                  "Solusi apparel modern untuk komunitas, brand, event, dan perusahaan."}
              </p>
              <a
                href="/koleksi"
                className="mt-5 inline-flex rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-deep"
              >
                Beli Sekarang
              </a>
            </div>
          </div>

          {total > 1 ? (
            <>
              <button
                type="button"
                className="absolute left-4 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-charcoal shadow-sm transition hover:bg-white sm:left-6 sm:h-11 sm:w-11"
                aria-label="Banner sebelumnya"
                onClick={goPrev}
              >
                {"<"}
              </button>
              <button
                type="button"
                className="absolute right-4 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-charcoal shadow-sm transition hover:bg-white sm:right-6 sm:h-11 sm:w-11"
                aria-label="Banner berikutnya"
                onClick={goNext}
              >
                {">"}
              </button>
              <div
                className="absolute right-4 top-4 z-20 flex gap-2 rounded-full bg-white/85 px-3 py-2 backdrop-blur sm:bottom-6 sm:right-6 sm:top-auto"
                aria-label="Slider indicator"
              >
                {slides.map((slide, index) => (
                  <button
                    key={`${slide.headline}-${index}`}
                    type="button"
                    className={`h-2 rounded-full transition ${
                      index === activeIndex
                        ? "w-6 bg-brand-green"
                        : "w-2 bg-brand-softGray hover:bg-brand-green/40"
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
