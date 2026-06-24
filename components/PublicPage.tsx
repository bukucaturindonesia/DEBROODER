/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { PageMotion } from "@/components/PageMotion";
import { PublicFooter } from "@/components/PublicFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  fallbackImages,
  getStoreImage
} from "@/lib/fallback-data";
import type {
  PageHeroContent,
  Product,
  PublicContent,
  ServiceCategory,
  Store
} from "@/lib/types";
import { formatRupiah, whatsappLinkWithMessage } from "@/lib/url";

function PublicImage({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority = false,
  objectPosition = "center center"
}: {
  src?: string;
  alt: string;
  className: string;
  sizes?: string;
  priority?: boolean;
  objectPosition?: string;
}) {
  const imageSrc = src || fallbackImages.product;

  if (imageSrc.startsWith("/")) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        width={1536}
        height={1024}
        priority={priority}
        className={className}
        sizes={sizes}
        style={{ objectPosition }}
      />
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading="lazy"
      style={{ objectPosition }}
    />
  );
}

function getProductDetail(product: Product) {
  return product.short_detail || product.description || product.deskripsi;
}

function getProductImage(product: Product) {
  return product.image_url || product.gambar_url || fallbackImages.product;
}

function getProductPrice(product: Product) {
  return formatRupiah(
    product.price ?? product.harga ?? product.base_price ?? product.price_label
  );
}

function findPageHero(
  pageHeroes: PageHeroContent[] | undefined,
  pageKey?: string
) {
  if (!pageKey) return null;
  return pageHeroes?.find((hero) => hero.page_key === pageKey) || null;
}

function actionHref(href?: string, message?: string) {
  if (!href) return undefined;
  if (href.includes("wa.me") || href.includes("whatsapp")) {
    return whatsappLinkWithMessage(
      href,
      message || "Halo DEBRODER, saya ingin bertanya tentang layanan DEBRODER."
    );
  }
  return href;
}

export function PageHero({
  label,
  title,
  description,
  imageUrl,
  objectPosition,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  breadcrumbs
}: {
  label: string;
  title: string;
  description: string;
  imageUrl?: string;
  objectPosition?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  breadcrumbs?: { label: string; href?: string }[];
}) {
  const primaryHref = actionHref(ctaHref);

  return (
    <section data-reveal className="bg-white">
      <div className="relative aspect-[16/7] min-h-[260px] w-full overflow-hidden sm:aspect-[16/5] lg:aspect-[16/4.5]">
        <PublicImage
          src={imageUrl || fallbackImages.pageHero}
          alt={title}
          className="h-full w-full object-cover"
          sizes="100vw"
          priority
          objectPosition={objectPosition}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute bottom-5 left-4 right-4 text-white sm:bottom-8 sm:left-8">
          {breadcrumbs?.length ? (
            <nav
              aria-label="Breadcrumb"
              className="mb-4 flex flex-wrap gap-2 text-xs font-medium text-white/70"
            >
              {breadcrumbs.map((item, index) => (
                <span key={`${item.label}-${index}`} className="flex gap-2">
                  {item.href ? (
                    <Link href={item.href} className="hover:text-white">
                      {item.label}
                    </Link>
                  ) : (
                    <span>{item.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 ? <span>/</span> : null}
                </span>
              ))}
            </nav>
          ) : null}
          <p className="w-fit bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-charcoal">
            {label}
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
            {description}
          </p>
          {primaryHref ? (
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={primaryHref}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-charcoal transition hover:bg-brand-offWhite"
                target={primaryHref.startsWith("http") ? "_blank" : undefined}
                rel={
                  primaryHref.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                {ctaText}
              </a>
              {secondaryCtaText && secondaryCtaHref ? (
                <Link
                  href={secondaryCtaHref}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-brand-charcoal"
                >
                  {secondaryCtaText}
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function ServiceCard({ service }: { service: ServiceCategory }) {
  const href = `/${service.link_slug.replace(/^\/+/, "") || "koleksi"}`;

  return (
    <Link href={href} className="group block">
      <article className="bg-transparent">
        <PublicImage
          src={service.gambar_url}
          alt={service.nama_kategori}
          className="aspect-[4/5] w-full object-cover"
        />
        <h2 className="mt-4 text-xl font-semibold text-brand-charcoal">
          {service.nama_kategori}
        </h2>
        <p className="mt-2 text-sm leading-6 text-brand-charcoal/60">
          {service.deskripsi}
        </p>
        <span className="mt-4 inline-flex text-sm font-semibold text-brand-charcoal underline-offset-4 group-hover:underline">
          Lihat Detail
        </span>
      </article>
    </Link>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const price = getProductPrice(product);
        const whatsappHref = whatsappLinkWithMessage(
          product.whatsapp_link || "",
          `Halo DEBRODER, saya ingin bertanya tentang ${product.nama}.`
        );

        return (
          <article key={product.nama} className="bg-transparent">
            <PublicImage
              src={getProductImage(product)}
              alt={product.nama}
              className="aspect-[4/5] w-full object-cover"
            />
            <h2 className="mt-4 line-clamp-2 text-lg font-semibold text-brand-charcoal">
              {product.nama}
            </h2>
            <p className="mt-1 line-clamp-2 text-sm leading-6 text-brand-charcoal/60">
              {getProductDetail(product)}
            </p>
            {price ? (
              <p className="mt-2 text-sm font-medium text-brand-charcoal">
                {price}
              </p>
            ) : null}
            <a
              href={whatsappHref}
              className="mt-4 inline-flex min-h-10 items-center justify-center rounded-full bg-brand-charcoal px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black/80"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pesan Sekarang
            </a>
          </article>
        );
      })}
    </div>
  );
}

export function StoreGrid({ stores }: { stores: Store[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stores.map((store) => {
        const whatsappHref = whatsappLinkWithMessage(
          store.whatsapp_link || store.whatsapp || "",
          `Halo DEBRODER, saya ingin bertanya tentang layanan di Store ${store.nama_store}.`
        );

        return (
          <article
            key={store.nama_store}
            className="flex flex-col bg-white p-3"
          >
            <PublicImage
              src={getStoreImage(store)}
              alt={`Foto ${store.nama_store} DEBRODER`}
              className="aspect-[4/3] w-full object-cover"
            />
            <p className="mt-4 text-sm font-medium text-brand-charcoal/70">
              {store.layanan_utama}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-brand-charcoal">
              {store.nama_store}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-6 text-brand-charcoal/60">
              {store.alamat}
            </p>
            <div className="mt-5 grid gap-2">
              <a
                href={whatsappHref}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-charcoal px-5 py-3 text-sm font-semibold text-white transition hover:bg-black/80"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hubungi
              </a>
              <a
                href={store.maps_link}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-brand-softGray bg-white px-5 py-3 text-sm font-semibold text-brand-charcoal transition hover:border-brand-charcoal"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lihat Lokasi
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function OrderTimeline({
  steps
}: {
  steps: Array<string | { title: string; description?: string }>;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {steps.map((step, index) => {
        const title = typeof step === "string" ? step : step.title;
        const description = typeof step === "string" ? "" : step.description;

        return (
          <article key={title} className="bg-white p-5">
            <span className="text-sm font-semibold text-brand-charcoal/50">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="mt-5 text-lg font-semibold leading-6 text-brand-charcoal">
              {title}
            </h2>
            {description ? (
              <p className="mt-3 text-sm leading-6 text-brand-charcoal/60">
                {description}
              </p>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

export function RecommendationGrid({
  services,
  currentSlug
}: {
  services: ServiceCategory[];
  currentSlug?: string;
}) {
  return (
    <section data-reveal className="bg-white py-14 sm:py-20">
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-charcoal/50">
            Rekomendasi
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Layanan DEBRODER lainnya
          </h2>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {services
            .filter((service) => service.link_slug !== currentSlug)
            .slice(0, 3)
            .map((service) => (
              <ServiceCard key={service.nama_kategori} service={service} />
            ))}
        </div>
      </div>
    </section>
  );
}

export function CategoryDetailPage({
  content,
  label,
  title,
  description,
  details,
  visualLabel,
  ctaText,
  ctaHref,
  currentSlug
}: {
  content: PublicContent;
  label: string;
  title: string;
  description: string;
  details: string[];
  visualLabel: string;
  ctaText: string;
  ctaHref: string;
  currentSlug: string;
}) {
  const pageHero = findPageHero(content.pageHeroes, currentSlug);

  return (
    <PublicShell content={content}>
      <PageHero
        label={pageHero?.label || label}
        title={pageHero?.title || title}
        description={pageHero?.subtitle || description}
        imageUrl={pageHero?.image_url}
        objectPosition={pageHero?.object_position}
        ctaText={ctaText}
        ctaHref={ctaHref}
        secondaryCtaText="Temukan Store"
        secondaryCtaHref="/store"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Koleksi", href: "/koleksi" },
          { label: title }
        ]}
      />
      <section data-reveal className="bg-brand-offWhite py-14 sm:py-20">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2 className="text-3xl font-semibold">Detail layanan</h2>
            <div className="mt-6 grid gap-3">
              {details.map((detail) => (
                <p
                  key={detail}
                  className="bg-white px-4 py-4 text-sm font-medium leading-6 text-brand-charcoal/70"
                >
                  {detail}
                </p>
              ))}
            </div>
          </div>
          <PublicImage
            src={pageHero?.image_url || fallbackImages.pageHero}
            alt={visualLabel}
            className="aspect-[4/3] w-full object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
            objectPosition={pageHero?.object_position}
          />
        </div>
      </section>
      <RecommendationGrid
        services={content.categories}
        currentSlug={currentSlug}
      />
    </PublicShell>
  );
}

export function PublicShell({
  content,
  children
}: {
  content: PublicContent;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-brand-offWhite text-brand-charcoal">
      <SiteHeader />
      <PageMotion />
      {children}
      <PublicFooter content={content} />
    </main>
  );
}
