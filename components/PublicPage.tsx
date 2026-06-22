import Link from "next/link";
import type { ReactNode } from "react";
import { PublicFooter } from "@/components/PublicFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { Product, PublicContent, ServiceCategory, Store } from "@/lib/types";
import { normalizeWhatsappLink } from "@/lib/url";

export function PageHero({
  label,
  title,
  description,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  breadcrumbs
}: {
  label: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  breadcrumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className="bg-brand-offWhite py-10 sm:py-16">
      <div className="section-shell">
        <div className="rounded-[32px] border border-brand-softGray bg-white p-6 shadow-soft sm:p-10 lg:p-14">
          {breadcrumbs?.length ? (
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap gap-2 text-sm font-bold text-brand-charcoal/55"
            >
              {breadcrumbs.map((item, index) => (
                <span key={`${item.label}-${index}`} className="flex gap-2">
                  {item.href ? (
                    <Link href={item.href} className="hover:text-brand-green">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-brand-green">{item.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 ? <span>/</span> : null}
                </span>
              ))}
            </nav>
          ) : null}
          <p className="inline-flex rounded-full bg-brand-green px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-white">
            {label}
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-brand-charcoal/70 sm:text-lg sm:leading-8">
            {description}
          </p>
          {ctaText && ctaHref ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={ctaHref}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-green px-7 py-4 text-sm font-black text-white transition hover:bg-brand-deep"
                target={ctaHref.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
              >
                {ctaText}
              </a>
              {secondaryCtaText && secondaryCtaHref ? (
                <Link
                  href={secondaryCtaHref}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-softGray px-7 py-4 text-sm font-black text-brand-green transition hover:border-brand-green"
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
    <article className="rounded-[28px] border border-brand-softGray bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="aspect-[4/3] rounded-3xl bg-[linear-gradient(135deg,#F5F5F0,#FFFFFF_48%,#E5E5E5)]" />
      <h2 className="mt-6 text-2xl font-black">{service.nama_kategori}</h2>
      <p className="mt-3 text-sm leading-6 text-brand-charcoal/70">
        {service.deskripsi}
      </p>
      <Link
        href={href}
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-brand-softGray px-5 py-3 text-sm font-black text-brand-green transition hover:border-brand-green"
      >
        Lihat Detail
      </Link>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <article
          key={product.nama}
          className="rounded-[28px] border border-brand-softGray bg-white p-5 shadow-sm"
        >
          <div className="aspect-[4/3] rounded-3xl bg-[linear-gradient(135deg,#F5F5F0,#FFFFFF_48%,#E5E5E5)]" />
          <span className="mt-6 inline-flex rounded-full bg-brand-green px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-white">
            {product.badge}
          </span>
          <h2 className="mt-4 text-2xl font-black">{product.nama}</h2>
          <p className="mt-3 text-sm leading-6 text-brand-charcoal/70">
            {product.deskripsi}
          </p>
          <a
            href={normalizeWhatsappLink(product.whatsapp_link)}
            className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand-green px-5 py-3 text-sm font-black text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pesan Sekarang
          </a>
        </article>
      ))}
    </div>
  );
}

export function StoreGrid({ stores }: { stores: Store[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stores.map((store) => (
        <article
          key={store.nama_store}
          className="flex flex-col rounded-[28px] border border-brand-softGray bg-white p-5 shadow-sm"
        >
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-green">
            {store.layanan_utama}
          </p>
          <h2 className="mt-5 text-2xl font-black">{store.nama_store}</h2>
          <p className="mt-4 flex-1 text-sm leading-6 text-brand-charcoal/70">
            {store.alamat}
          </p>
          <div className="mt-5 grid gap-2">
            <a
              href={normalizeWhatsappLink(store.whatsapp_link)}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-green px-5 py-3 text-sm font-black text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hubungi
            </a>
            <a
              href={store.maps_link}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-brand-softGray px-5 py-3 text-sm font-black text-brand-green"
              target="_blank"
              rel="noreferrer"
            >
              Lihat Lokasi
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

export function OrderTimeline({ steps }: { steps: string[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {steps.map((step, index) => (
        <article
          key={step}
          className="rounded-3xl border border-brand-softGray bg-white p-5 shadow-sm"
        >
          <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-green text-sm font-black text-white">
            {index + 1}
          </span>
          <h2 className="mt-8 text-lg font-black leading-6">{step}</h2>
        </article>
      ))}
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
    <section className="bg-white py-16 sm:py-24">
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-green">
            Rekomendasi
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
            Layanan DEBRODER lainnya
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
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
  return (
    <PublicShell content={content}>
      <PageHero
        label={label}
        title={title}
        description={description}
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
      <section className="bg-brand-offWhite pb-16 sm:pb-24">
        <div className="section-shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div className="rounded-[28px] border border-brand-softGray bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-3xl font-black">Detail layanan</h2>
            <div className="mt-6 grid gap-3">
              {details.map((detail) => (
                <div
                  key={detail}
                  className="rounded-2xl bg-brand-offWhite px-4 py-4 text-sm font-black leading-6"
                >
                  {detail}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] border border-brand-softGray bg-white p-5 shadow-sm">
            <div className="grid min-h-[320px] place-items-center rounded-3xl bg-[linear-gradient(135deg,#F5F5F0,#FFFFFF_48%,#E5E5E5)] p-6 text-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-brand-green">
                  Placeholder Visual
                </p>
                <h3 className="mt-4 text-3xl font-black">{visualLabel}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-brand-charcoal/65">
                  Area gambar bisa diganti dari dashboard Super Admin melalui
                  field gambar URL.
                </p>
              </div>
            </div>
          </div>
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
    <main className="min-h-screen bg-brand-offWhite text-brand-charcoal">
      <SiteHeader />
      {children}
      <PublicFooter content={content} />
    </main>
  );
}
