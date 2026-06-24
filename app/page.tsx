/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { HeroSlider } from "@/components/HeroSlider";
import { Logo } from "@/components/Logo";
import { PageMotion } from "@/components/PageMotion";
import { ScrollButtons } from "@/components/ScrollButtons";
import { SiteHeader } from "@/components/SiteHeader";
import { SocialIconLinks } from "@/components/SocialIconLinks";
import { contactLinks, storeContacts } from "@/lib/contact";
import { getPublicContent } from "@/lib/public-data";
import type { ServiceCategory, Store } from "@/lib/types";
import { normalizeWhatsappLink } from "@/lib/url";

const benefitCards = [
  {
    title: "Bisa pesan sesuai kebutuhan",
    description:
      "Cocok untuk individu, komunitas, brand, event, instansi, dan perusahaan.",
    image: "/images/debroder-hero.png"
  },
  {
    title: "Layanan apparel lengkap",
    description:
      "Sablon kaos, sablon DTF, custom jersey, maklon DTF, cetak sublim, kaos NSA, dan cotton combed.",
    image: "/images/debroder-hero.png"
  },
  {
    title: "Tersedia beberapa store",
    description:
      "DEBRODER Apparel hadir di Pettarani, Tello, Landak, dan Parepare.",
    image: "/images/debroder-hero.png"
  }
];

const catalogDefaults = [
  {
    title: "Kaos Polos",
    category: "Cotton combed, NSA, dan kaos polos import",
    slug: "kaos-polos"
  },
  {
    title: "Sablon DTF",
    category: "Sablon kaos, logo, komunitas, dan brand",
    slug: "sablon-dtf"
  },
  {
    title: "Custom Jersey",
    category: "Jersey tim, komunitas, sekolah, dan instansi",
    slug: "jersey"
  },
  {
    title: "Maklon DTF",
    category: "Layanan produksi DTF untuk kebutuhan bisnis",
    slug: "maklon-dtf"
  },
  {
    title: "Cetak Sublim",
    category: "Cetak sublim untuk apparel dan jersey",
    slug: "cetak-sublim"
  },
  {
    title: "DEBRODER Express",
    category: "Pengiriman dan distribusi pesanan",
    slug: "express"
  }
];

const orderSteps = [
  {
    title: "Pilih layanan",
    description:
      "Tentukan kebutuhan Anda, mulai dari kaos polos, sablon DTF, jersey custom, maklon DTF, atau layanan express."
  },
  {
    title: "Konsultasi kebutuhan",
    description:
      "Hubungi tim DEBRODER untuk menyesuaikan bahan, desain, jumlah, ukuran, dan estimasi pengerjaan."
  },
  {
    title: "Kirim desain atau detail pesanan",
    description:
      "Kirim file desain, referensi, logo, atau detail pesanan yang ingin diproduksi."
  },
  {
    title: "Proses produksi",
    description:
      "Pesanan diproses sesuai detail yang sudah disepakati dengan hasil yang rapi dan siap digunakan."
  },
  {
    title: "Ambil di store atau kirim",
    description:
      "Pesanan bisa diambil di store DEBRODER atau dikirim sesuai kebutuhan pelanggan."
  }
];

const advantages = [
  {
    title: "Layanan apparel lengkap",
    description:
      "Mulai dari kaos polos, sablon DTF, jersey custom, maklon DTF, hingga cetak sublim."
  },
  {
    title: "Cocok untuk berbagai kebutuhan",
    description:
      "Mendukung kebutuhan individu, komunitas, brand, event, sekolah, instansi, dan perusahaan."
  },
  {
    title: "Tersedia beberapa store",
    description:
      "DEBRODER memiliki beberapa titik layanan di Pettarani, Tello, Landak, dan Parepare."
  },
  {
    title: "Bisa custom sesuai pesanan",
    description:
      "Pesanan dapat disesuaikan berdasarkan bahan, desain, ukuran, jumlah, dan kebutuhan pelanggan."
  },
  {
    title: "Didukung DEBRODER Express",
    description:
      "Pengiriman dan distribusi pesanan lebih mudah melalui ekosistem DEBRODER Express."
  }
];

const trustHighlights = [
  "4 Store Aktif",
  "Apparel & Custom",
  "Sablon DTF",
  "Jersey Custom",
  "DEBRODER Express"
];

const officialStores: Store[] = storeContacts.map((store, index) => ({
  nama_store: store.name,
  layanan_utama: store.service,
  alamat: store.address,
  whatsapp: store.whatsapp,
  whatsapp_link: store.whatsappLink,
  maps_link: store.mapsLink,
  urutan: index + 1,
  status_aktif: true
}));

function sectionPath(slug: string) {
  return `/${slug.replace(/^\/+/, "")}`;
}

function SectionHeading({
  title,
  description
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <h2 className="text-3xl font-semibold tracking-tight text-brand-charcoal sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-brand-charcoal/70">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function DynamicImage({
  src,
  alt,
  priority = false,
  className,
  sizes = "(min-width: 1024px) 33vw, 100vw"
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className: string;
  sizes?: string;
}) {
  if (src.startsWith("/")) {
    return (
      <Image
        src={src}
        alt={alt}
        width={1536}
        height={1024}
        priority={priority}
        className={className}
        sizes={sizes}
      />
    );
  }

  return <img src={src} alt={alt} className={className} loading="lazy" />;
}

function findCategory(
  categories: ServiceCategory[],
  item: (typeof catalogDefaults)[number]
) {
  const normalizedTitle = item.title.toLowerCase();

  return (
    categories.find(
      (category) => category.nama_kategori.toLowerCase() === normalizedTitle
    ) ||
    categories.find(
      (category) => category.link_slug.replace(/^\/+/, "") === item.slug
    )
  );
}

function buildCatalogItems(categories: ServiceCategory[]) {
  return catalogDefaults.map((item) => {
    const category = findCategory(categories, item);

    return {
      title: item.title,
      category: category?.deskripsi || item.category,
      image: category?.gambar_url || "/images/debroder-hero.png",
      href: sectionPath(category?.link_slug || item.slug)
    };
  });
}

function MiniIcon({ index }: { index: number }) {
  return (
    <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-offWhite text-sm font-semibold text-brand-green">
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

export default async function Home() {
  const content = await getPublicContent();
  const catalogItems = buildCatalogItems(content.categories);
  const stores = (content.stores.length ? content.stores : officialStores)
    .slice(0, 4)
    .sort((a, b) => a.urutan - b.urutan);

  return (
    <main className="min-h-screen overflow-x-hidden bg-brand-offWhite text-brand-charcoal">
      <SiteHeader />
      <PageMotion />

      <HeroSlider heroes={content.heroes} />

      <section data-reveal className="bg-brand-offWhite pb-12 pt-4 sm:pb-16">
        <div className="section-shell grid gap-4 md:grid-cols-3">
          {benefitCards.map((benefit, index) => (
            <article
              key={benefit.title}
              className="group rounded-2xl border border-brand-softGray bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="overflow-hidden rounded-xl bg-brand-offWhite">
                <DynamicImage
                  src={benefit.image}
                  alt={benefit.title}
                  priority={index === 0}
                  className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-brand-charcoal">
                {benefit.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-brand-charcoal/70">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section data-reveal id="koleksi" className="bg-white py-14 sm:py-20">
        <div className="section-shell">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading title="Layanan & Produk DEBRODER" />
            <div className="flex items-center gap-3">
              <Link
                href="/koleksi"
                className="inline-flex min-h-10 items-center rounded-full border border-brand-softGray px-5 text-sm font-semibold text-brand-charcoal transition hover:border-brand-green hover:text-brand-green"
              >
                Lihat Semua
              </Link>
              <ScrollButtons containerId="landing-catalog-carousel" />
            </div>
          </div>

          <div
            id="landing-catalog-carousel"
            className="no-scrollbar mt-8 flex snap-x gap-5 overflow-x-auto pb-4"
          >
            {catalogItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group min-w-[82vw] snap-start sm:min-w-[330px] lg:min-w-[350px]"
              >
                <article className="rounded-2xl border border-brand-softGray bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft">
                  <div className="overflow-hidden rounded-2xl bg-brand-offWhite">
                    <DynamicImage
                      src={item.image}
                      alt={item.title}
                      className="aspect-[4/5] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-brand-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-brand-charcoal/65">
                    {item.category}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section data-reveal className="w-full bg-white px-3 py-8 sm:px-6 sm:py-12">
        <a
          href={contactLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mx-auto block w-full max-w-[1600px] overflow-hidden rounded-3xl bg-brand-offWhite"
          aria-label="Buka Instagram DEBRODER"
        >
          <div className="relative aspect-[16/9] w-full sm:aspect-[16/7]">
            <DynamicImage
              src="/images/debroder-hero.png"
              alt="DEBRODER Instagram Banner"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 max-w-md text-white sm:bottom-8 sm:left-8">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/80">
                Instagram
              </p>
              <h2 className="mt-2 text-2xl font-semibold sm:text-4xl">
                Ikuti update DEBRODER
              </h2>
            </div>
          </div>
        </a>
      </section>

      <section data-reveal id="store" className="bg-brand-offWhite py-14 sm:py-20">
        <div className="section-shell">
          <SectionHeading
            title="Store DEBRODER"
            description="Temukan store DEBRODER terdekat untuk kebutuhan kaos polos, sablon DTF, jersey, dan layanan apparel lainnya."
          />

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {stores.map((store) => (
              <article
                key={store.nama_store}
                className="flex flex-col rounded-3xl border border-brand-softGray bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft"
              >
                <p className="text-sm font-medium text-brand-green">
                  {store.layanan_utama}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-brand-charcoal">
                  {store.nama_store}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-brand-charcoal/70">
                  {store.alamat}
                </p>
                <div className="mt-6 grid gap-2">
                  <a
                    href={normalizeWhatsappLink(store.whatsapp_link)}
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-green px-5 text-sm font-semibold text-white transition hover:bg-brand-deep"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hubungi
                  </a>
                  <a
                    href={store.maps_link}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-brand-softGray bg-white px-5 text-sm font-semibold text-brand-charcoal transition hover:border-brand-green hover:text-brand-green"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Lihat Lokasi
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        data-reveal
        id="cara-order"
        className="bg-white py-14 sm:py-20"
      >
        <div className="section-shell">
          <SectionHeading
            title="Cara Order di DEBRODER"
            description="Pesan kebutuhan apparel Anda dengan proses yang mudah, jelas, dan cepat."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-5">
            {orderSteps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-3xl border border-brand-softGray bg-brand-offWhite p-5"
              >
                <span className="text-sm font-semibold text-brand-green">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-brand-charcoal">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-brand-charcoal/65">
                  {step.description}
                </p>
              </article>
            ))}
          </div>

          <a
            href={contactLinks.whatsapp}
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-brand-green px-7 text-sm font-semibold text-white transition hover:bg-brand-deep"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mulai Order
          </a>
        </div>
      </section>

      <section data-reveal className="bg-brand-offWhite py-14 sm:py-20">
        <div className="section-shell">
          <SectionHeading
            title="Keunggulan DEBRODER"
            description="DEBRODER hadir untuk membantu kebutuhan apparel, custom, dan pengiriman dengan layanan yang lebih mudah dijangkau."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {advantages.map((advantage, index) => (
              <article
                key={advantage.title}
                className="rounded-3xl border border-brand-softGray bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft"
              >
                <MiniIcon index={index} />
                <h3 className="mt-5 text-base font-semibold leading-6 text-brand-charcoal">
                  {advantage.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-brand-charcoal/65">
                  {advantage.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section data-reveal className="bg-brand-green py-12 text-white sm:py-14">
        <div className="section-shell">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Dipercaya untuk Kebutuhan Apparel dan Custom
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/80">
                DEBRODER melayani kebutuhan personal, komunitas, brand, event,
                dan perusahaan dengan layanan yang mudah diakses melalui
                beberapa store.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {trustHighlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white"
                >
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        data-reveal
        id="tentang"
        aria-labelledby="tentang-debroder-akhir"
        className="bg-brand-offWhite py-14 sm:py-16"
      >
        <div className="section-shell grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="max-w-3xl">
            <h2
              id="tentang-debroder-akhir"
              className="text-3xl font-semibold tracking-tight text-brand-charcoal sm:text-4xl"
            >
              Tentang DEBRODER
            </h2>
            <div className="mt-5 grid gap-4 text-base leading-7 text-brand-charcoal/70">
              <p>
                DEBRODER adalah brand yang bergerak dalam ekosistem apparel dan
                layanan bisnis pendukung. Melalui DEBRODER Apparel dan DEBRODER
                Express, DEBRODER hadir untuk memberikan solusi kaos polos,
                sablon DTF, custom jersey, produksi apparel, dan layanan
                pengiriman yang lebih mudah dijangkau pelanggan.
              </p>
              <p>
                DEBRODER melayani kebutuhan individu, komunitas, brand, event,
                sekolah, instansi, hingga perusahaan melalui beberapa store yang
                tersebar di Pettarani, Tello, Landak, dan Parepare.
              </p>
            </div>
          </div>

          <aside className="rounded-3xl border border-brand-softGray bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-green">
              Ringkasan Brand
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {trustHighlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-2xl border border-brand-softGray bg-brand-offWhite px-4 py-3 text-sm font-medium text-brand-charcoal"
                >
                  {highlight}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <footer className="bg-brand-charcoal py-10 text-white">
        <div className="section-shell grid gap-8 md:grid-cols-[1fr_1fr_auto] md:items-start">
          <div>
            <Logo variant="primary-white" size="md" />
            <p className="mt-3 text-sm font-medium text-white/70">
              Kaos Polos Import & Sablon
            </p>
            <Link
              href="/admin/login"
              className="mt-5 inline-flex text-xs font-medium text-white/35 transition hover:text-white"
            >
              Admin
            </Link>
          </div>

          <nav aria-label="Menu footer">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">
              Menu
            </h3>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium text-white/75">
              <Link href="/koleksi" className="hover:text-white">
                Koleksi
              </Link>
              <Link href="/kaos-polos" className="hover:text-white">
                Kaos Polos
              </Link>
              <Link href="/sablon-dtf" className="hover:text-white">
                Sablon DTF
              </Link>
              <Link href="/jersey" className="hover:text-white">
                Jersey
              </Link>
              <Link href="/store" className="hover:text-white">
                Store
              </Link>
              <Link href="/cara-order" className="hover:text-white">
                Cara Order
              </Link>
            </div>
          </nav>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">
              Kontak
            </h3>
            <SocialIconLinks
              emailLink={contactLinks.email}
              facebookLink={contactLinks.facebook}
              instagramLink={contactLinks.instagram}
              tone="light"
              className="mt-4"
            />
          </div>
        </div>
        <div className="section-shell mt-8 border-t border-white/10 pt-5">
          <p className="text-sm font-medium text-white/55">
            &copy; 2026 DEBRODER. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
