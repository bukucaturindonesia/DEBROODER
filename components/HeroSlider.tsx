/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { HeroBanner } from "@/lib/types";

function HeroImage({
  src,
  alt,
  priority,
  objectPosition
}: {
  src: string;
  alt: string;
  priority?: boolean;
  objectPosition?: string;
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
        style={{ objectPosition }}
        sizes="100vw"
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      style={{ objectPosition }}
    />
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
    <section id="beranda" className="w-full bg-white">
      <div
        className="relative mx-auto w-full overflow-hidden bg-brand-offWhite"
        onMouseEnter={() => setIsHoverPaused(true)}
        onMouseLeave={() => setIsHoverPaused(false)}
        onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
        onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0].clientX)}
      >
        <div className="relative aspect-[16/11] w-full sm:aspect-[16/7] lg:aspect-[16/6]">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            const videoUrl = slide.hero_video_url || slide.video_url;
            const objectPosition = slide.object_position || "center center";

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
                    style={{ objectPosition }}
                  />
                ) : (
                  <HeroImage
                    src={slide.image_url || "/images/debroder-hero.png"}
                    alt={slide.headline || slide.title || "DEBRODER Hero"}
                    priority={index === 0}
                    objectPosition={objectPosition}
                  />
                )}
              </div>
            );
          })}

          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent" />

          <div className="absolute bottom-4 left-4 z-10 max-w-[calc(100%-32px)] sm:bottom-8 sm:left-8">
            <div className="space-y-2">
              <h1 className="w-fit bg-white px-3 py-1.5 text-xl font-bold leading-tight text-brand-charcoal sm:px-4 sm:py-2 sm:text-3xl">
                {activeSlide.headline || activeSlide.title || "KAOS POLOS IMPORT"}
              </h1>
              <p className="w-fit max-w-xl bg-white px-3 py-1.5 text-sm font-medium leading-5 text-brand-charcoal/75 sm:px-4 sm:py-2 sm:text-base">
                {activeSlide.subheadline ||
                  activeSlide.subtitle ||
                  "Sablon DTF, Jersey, dan Custom Apparel"}
              </p>
              <a
                href={
                  activeSlide.cta_link ||
                  activeSlide.cta_primary_link ||
                  "/koleksi"
                }
                className="inline-flex min-h-10 items-center rounded-full bg-brand-charcoal px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black/80"
              >
                {activeSlide.cta_text ||
                  activeSlide.cta_primary_text ||
                  "Beli Sekarang"}{" "}
                <span aria-hidden="true">-&gt;</span>
              </a>
            </div>
          </div>

          {total > 1 ? (
            <>
              <button
                type="button"
                className="absolute left-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-charcoal transition hover:bg-white sm:left-6 sm:flex"
                aria-label="Banner sebelumnya"
                onClick={goPrev}
              >
                {"<"}
              </button>
              <button
                type="button"
                className="absolute right-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-charcoal transition hover:bg-white sm:right-6 sm:flex"
                aria-label="Banner berikutnya"
                onClick={goNext}
              >
                {">"}
              </button>
              <div
                className="absolute bottom-4 right-4 z-20 flex gap-2 rounded-full bg-white/90 px-3 py-2 backdrop-blur sm:bottom-6 sm:right-6"
                aria-label="Slider indicator"
              >
                {slides.map((slide, index) => (
                  <button
                    key={`${slide.headline}-${index}`}
                    type="button"
                    className={`h-2 rounded-full transition ${
                      index === activeIndex
                        ? "w-6 bg-brand-charcoal"
                        : "w-2 bg-brand-softGray hover:bg-brand-charcoal/50"
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
