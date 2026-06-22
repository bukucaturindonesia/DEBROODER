/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { SiteHeader } from "@/components/SiteHeader";
import { getPublicContent } from "@/lib/public-data";
import type { Product, ServiceCategory } from "@/lib/types";
import { emailHref, instagramHref, whatsappHref } from "@/lib/url";

const benefits = [
  {
    title: "Bisa pesan sesuai kebutuhan",
    description:
      "Cocok untuk individu, komunitas, brand, event, instansi, dan perusahaan."
  },
  {
    title: "Layanan apparel lengkap",
    description:
      "Sablon kaos, sablon DTF, custom jersey, maklon DTF, cetak sublim, kaos NSA, dan cotton combed."
  },
  {
    title: "Tersedia beberapa store",
    description:
      "DEBRODER Apparel hadir di Pettarani, Tello, Landak, dan Parepare."
  }
];

const unitCards = [
  {
    id: "apparel",
    title: "DEBRODER Apparel",
    category: "Apparel, Percetakan, Jersey, Sablon, dan Kaos Polos",
    description:
      "DEBRODER Apparel adalah unit bisnis yang bergerak di bidang apparel, custom clothing, produksi pakaian, sablon kaos, sablon DTF, custom jersey, maklon DTF, cetak sublim, distribusi kaos NSA, dan penyediaan kaos cotton combed untuk individu, komunitas, brand, instansi, event, dan perusahaan.",
    services: [
      "Sablon Kaos",
      "Sablon DTF",
      "Custom Jersey",
      "Maklon DTF",
      "Cetak Sublim",
      "Distributor Kaos NSA",
      "Kaos Cotton Combed"
    ],
    key: "apparel" as const,
    cta: "Hubungi DEBRODER Apparel"
  },
  {
    id: "express",
    title: "DEBRODER Express",
    category: "Ekspedisi, Pengiriman, dan Distribusi",
    description:
      "DEBRODER Express adalah unit bisnis yang bergerak di bidang jasa ekspedisi, pengiriman barang, dan distribusi. Layanan ini hadir untuk mendukung kebutuhan pengiriman pelanggan dan operasional bisnis DEBRODER.",
    services: [
      "Pengiriman Barang",
      "Distribusi",
      "Layanan Ekspedisi",
      "Pengiriman Antar Wilayah"
    ],
    key: "express" as const,
    cta: "Hubungi DEBRODER Express"
  }
];

const orderSteps = [
  "Pilih layanan",
  "Konsultasi kebutuhan",
  "Kirim desain atau detail pesanan",
  "Proses produksi",
  "Ambil di store atau kirim melalui DEBRODER Express"
];

const advantages = [
  "Berdiri sejak 2016",
  "Layanan apparel dan percetakan lengkap",
  "Tersedia beberapa store",
  "Cocok untuk individu, komunitas, brand, instansi, event, dan perusahaan",
  "Mendukung kebutuhan custom dan partai",
  "Memiliki ekosistem apparel dan layanan pengiriman",
  "Dipercaya perusahaan, instansi, dan event besar di Indonesia Timur"
];

function sectionPath(slug: string) {
  return `/${slug.replace(/^\/+/, "")}`;
}

function SectionHeading({
  label,
  title,
  description,
  centered = false
}: {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {label ? (
        <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-green">
          {label}
        </p>
      ) : null}
      <h2 className="mt-4 text-3xl font-black tracking-tight text-brand-charcoal sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-7 text-brand-charcoal/70 sm:text-lg sm:leading-8">
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
  className
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className: string;
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
        sizes="(min-width: 1024px) 52vw, 100vw"
      />
    );
  }

  return <img src={src} alt={alt} className={className} loading="lazy" />;
}

function ProductVisual({ label, imageUrl }: { label: string; imageUrl: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-brand-offWhite">
      <DynamicImage
        src={imageUrl || "/images/debroder-hero.png"}
        alt={label}
        className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/90 px-4 py-3 text-sm font-black text-brand-green backdrop-blur">
        {label}
      </div>
    </div>
  );
}

function CategoryCard({ service }: { service: ServiceCategory }) {
  return (
    <article className="group flex min-w-[285px] flex-col rounded-[28px] border border-brand-softGray bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <ProductVisual
        label={service.nama_kategori}
        imageUrl={service.gambar_url || "/images/debroder-hero.png"}
      />
      <div className="flex flex-1 flex-col p-2 pt-5">
        <h3 className="text-2xl font-black tracking-tight">
          {service.nama_kategori}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-brand-charcoal/70">
          {service.deskripsi}
        </p>
        <Link
          href={sectionPath(service.link_slug || "koleksi")}
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-brand-softGray px-5 py-3 text-sm font-black text-brand-green transition hover:border-brand-green"
        >
          Lihat Detail
        </Link>
      </div>
    </article>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group min-w-[285px] rounded-[28px] border border-brand-softGray bg-brand-offWhite p-4 transition hover:-translate-y-1 hover:shadow-soft">
      <ProductVisual
        label={product.nama}
        imageUrl={product.gambar_url || "/images/debroder-hero.png"}
      />
      <div className="p-2 pt-5">
        <span className="rounded-full bg-brand-green px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-white">
          {product.badge}
        </span>
        <h3 className="mt-4 text-2xl font-black">{product.nama}</h3>
        <p className="mt-3 text-sm leading-6 text-brand-charcoal/70">
          {product.deskripsi}
        </p>
        <a
          href={product.whatsapp_link}
          className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-black text-brand-green transition hover:bg-brand-green hover:text-white"
          target="_blank"
          rel="noreferrer"
        >
          Pesan Sekarang
        </a>
      </div>
    </article>
  );
}

export default async function Home() {
  const content = await getPublicContent();
  const emailLink = emailHref(content.contact.email);
  const whatsappMainLink = whatsappHref(
    content.contact.whatsapp_utama,
    "Halo DEBRODER, saya ingin bertanya tentang layanan."
  );
  const apparelLink = whatsappHref(
    content.contact.whatsapp_apparel,
    "Halo DEBRODER Apparel, saya ingin bertanya tentang kaos polos, sablon, atau jersey."
  );
  const expressLink = whatsappHref(
    content.contact.whatsapp_express,
    "Halo DEBRODER Express, saya ingin bertanya tentang layanan pengiriman."
  );
  const instagramLink = instagramHref(content.contact.instagram);
  const aboutParagraphs = content.about.body.split(/\n{2,}/).filter(Boolean);

  return (
    <main className="min-h-screen bg-brand-offWhite text-brand-charcoal">
      <SiteHeader />

      <section id="beranda" className="bg-brand-offWhite py-5 sm:py-8">
        <div className="section-shell">
          <div className="grid overflow-hidden rounded-[32px] border border-brand-softGray bg-white shadow-soft lg:grid-cols-[0.94fr_1.06fr]">
            <div className="order-1 min-h-[300px] bg-brand-offWhite lg:order-2">
              <DynamicImage
                src={content.hero.image_url || "/images/debroder-hero.png"}
                alt="Kaos polos, sablon, dan paket pengiriman DEBRODER"
                priority
                className="h-full min-h-[300px] w-full object-cover"
              />
            </div>

            <div className="order-2 flex flex-col justify-center px-6 py-8 sm:px-10 lg:order-1 lg:px-12 lg:py-12">
              <p className="inline-flex w-fit rounded-full bg-brand-green px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-white">
                Kaos Polos Import & Sablon
              </p>
              <h1 className="mt-6 max-w-2xl text-4xl font-black leading-tight tracking-tight text-brand-charcoal sm:text-6xl">
                {content.hero.headline}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-brand-charcoal/70 sm:text-lg sm:leading-8">
                {content.hero.subheadline}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={content.hero.cta_primary_link || apparelLink}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-green px-7 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-brand-deep"
                  target={
                    content.hero.cta_primary_link?.startsWith("http")
                      ? "_blank"
                      : undefined
                  }
                  rel="noreferrer"
                >
                  {content.hero.cta_primary_text}
                </a>
                <a
                  href={content.hero.cta_secondary_link || "#layanan"}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-softGray bg-white px-7 py-4 text-sm font-black text-brand-green transition hover:-translate-y-0.5 hover:border-brand-green"
                >
                  {content.hero.cta_secondary_text}
                </a>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4">
                <div className="flex gap-2" aria-label="Slider indicator">
                  <span className="h-2.5 w-8 rounded-full bg-brand-green" />
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-softGray" />
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-softGray" />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="grid h-10 w-10 place-items-center rounded-full border border-brand-softGray text-lg font-black text-brand-green"
                    aria-label="Banner sebelumnya"
                  >
                    {"<"}
                  </button>
                  <button
                    type="button"
                    className="grid h-10 w-10 place-items-center rounded-full bg-brand-green text-lg font-black text-white"
                    aria-label="Banner berikutnya"
                  >
                    {">"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-offWhite pb-14 pt-4">
        <div className="section-shell">
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">
            {benefits.map((benefit, index) => (
              <article
                key={benefit.title}
                className="min-w-[280px] rounded-3xl border border-brand-softGray bg-white p-5 shadow-sm"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-green text-sm font-black text-white">
                  0{index + 1}
                </span>
                <h2 className="mt-5 text-xl font-black">{benefit.title}</h2>
                <p className="mt-3 text-sm leading-6 text-brand-charcoal/70">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="tentang" className="bg-white py-16 sm:py-24">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            label={content.about.label}
            title={content.about.title}
            description={aboutParagraphs[0]}
          />

          <div>
            {aboutParagraphs.slice(1).map((paragraph) => (
              <p
                key={paragraph}
                className="mb-4 text-base leading-7 text-brand-charcoal/70 sm:text-lg sm:leading-8"
              >
                {paragraph}
              </p>
            ))}
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {content.categories.slice(0, 6).map((service) => (
                <div
                  key={service.nama_kategori}
                  className="rounded-2xl border border-brand-softGray bg-brand-offWhite px-4 py-3 text-sm font-black text-brand-charcoal"
                >
                  {service.nama_kategori}
                </div>
              ))}
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {content.about.highlights.map((fact) => (
                <div
                  key={fact}
                  className="rounded-2xl bg-brand-green px-4 py-4 text-sm font-black text-white"
                >
                  {fact}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="layanan" className="bg-brand-offWhite py-16 sm:py-24">
        <div className="section-shell">
          <SectionHeading
            label="Kategori Layanan"
            title="Layanan DEBRODER"
            description="Pilih layanan apparel, percetakan, kaos polos, atau pengiriman yang paling sesuai dengan kebutuhan pesanan Anda."
          />

          <div className="no-scrollbar mt-10 flex gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible">
            {content.categories.map((service) => (
              <CategoryCard key={service.nama_kategori} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section id="unit-bisnis" className="bg-white py-16 sm:py-24">
        <div className="section-shell">
          <SectionHeading
            label="Unit Bisnis"
            title="Satu Brand, Dua Unit Bisnis"
            description="DEBRODER menaungi layanan apparel dan layanan pengiriman agar kebutuhan produksi sampai distribusi bisa berjalan lebih mudah."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {unitCards.map((unit) => (
              <article
                key={unit.title}
                id={unit.id}
                className="rounded-[30px] border border-brand-softGray bg-brand-offWhite p-6 shadow-sm sm:p-8"
              >
                <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-green">
                  {unit.category}
                </p>
                <h3 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                  {unit.title}
                </h3>
                <p className="mt-5 text-base leading-7 text-brand-charcoal/70">
                  {unit.description}
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {unit.services.map((service) => (
                    <div
                      key={service}
                      className="rounded-2xl bg-white px-4 py-3 text-sm font-black"
                    >
                      {service}
                    </div>
                  ))}
                </div>
                <a
                  href={unit.key === "apparel" ? apparelLink : expressLink}
                  className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand-green px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-brand-deep sm:w-auto"
                  target="_blank"
                  rel="noreferrer"
                >
                  {unit.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="store" className="bg-brand-offWhite py-16 sm:py-24">
        <div className="section-shell">
          <SectionHeading
            label="Store"
            title="Lokasi Store DEBRODER Apparel"
            description="Temukan store DEBRODER Apparel terdekat untuk kebutuhan sablon kaos, cetak DTF, jersey, dan kaos polos."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {content.stores.map((store) => (
              <article
                key={store.nama_store}
                className="flex flex-col rounded-[28px] border border-brand-softGray bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-green">
                  {store.layanan_utama}
                </p>
                <h3 className="mt-5 text-2xl font-black">
                  {store.nama_store}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-6 text-brand-charcoal/70">
                  {store.alamat}
                </p>
                <div className="mt-5 grid gap-2">
                  <a
                    href={store.whatsapp_link}
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-green px-5 py-3 text-sm font-black text-white transition hover:bg-brand-deep"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Chat Store
                  </a>
                  <a
                    href={store.maps_link}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-brand-softGray px-5 py-3 text-sm font-black text-brand-green transition hover:border-brand-green"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Lihat Lokasi
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="koleksi" className="bg-white py-16 sm:py-24">
        <div className="section-shell">
          <SectionHeading
            label="Koleksi"
            title="Produk & Layanan Populer"
            description="Pilihan layanan yang paling sering dipesan untuk kebutuhan apparel, event, komunitas, brand, dan perusahaan."
          />

          <div className="no-scrollbar mt-10 flex gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible">
            {content.products.map((product) => (
              <ProductCard key={product.nama} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section id="cara-order" className="bg-brand-offWhite py-16 sm:py-24">
        <div className="section-shell">
          <SectionHeading
            label="Cara Order"
            title="Cara Order di DEBRODER"
            description="Proses pemesanan dibuat sederhana agar pelanggan bisa mulai dari konsultasi sampai produksi tanpa alur yang rumit."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-5">
            {orderSteps.map((step, index) => (
              <article
                key={step}
                className="relative rounded-3xl border border-brand-softGray bg-white p-5"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-green text-sm font-black text-white">
                  {index + 1}
                </span>
                <h3 className="mt-8 text-lg font-black leading-6">{step}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="section-shell">
          <SectionHeading
            label="Testimoni"
            title="Dipercaya pelanggan DEBRODER"
            description="Beberapa kesan pelanggan yang menggunakan layanan apparel, sablon, jersey, dan paket komunitas."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {content.testimonials.map((testimonial) => (
              <article
                key={`${testimonial.nama}-${testimonial.sumber}`}
                className="rounded-[28px] border border-brand-softGray bg-brand-offWhite p-6"
              >
                <p className="text-sm leading-7 text-brand-charcoal/75">
                  &ldquo;{testimonial.isi_testimoni}&rdquo;
                </p>
                <p className="mt-6 text-base font-black">
                  {testimonial.nama}
                </p>
                <p className="mt-1 text-sm font-bold text-brand-green">
                  {testimonial.sumber}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-deep py-16 text-white sm:py-20">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-white/70">
              Keunggulan
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
              Keunggulan DEBRODER
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((advantage) => (
              <article
                key={advantage}
                className="rounded-3xl border border-white/10 bg-white/10 p-5"
              >
                <span className="block h-9 w-9 rounded-full bg-white" />
                <h3 className="mt-7 text-base font-black leading-6">
                  {advantage}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="kontak" className="bg-white py-16 sm:py-24">
        <div className="section-shell">
          <SectionHeading
            label="Kontak"
            title="Hubungi DEBRODER"
            description="Gunakan kanal utama, pilih unit bisnis, atau langsung chat store DEBRODER Apparel terdekat."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[30px] border border-brand-softGray bg-brand-offWhite p-6 sm:p-8">
              <div className="grid gap-4">
                <a
                  href={emailLink}
                  className="rounded-2xl bg-white p-5 transition hover:text-brand-green"
                >
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-green">
                    Email
                  </p>
                  <p className="mt-2 text-xl font-black">
                    {content.contact.email}
                  </p>
                </a>
                <a
                  href={whatsappMainLink}
                  className="rounded-2xl bg-white p-5 transition hover:text-brand-green"
                  target="_blank"
                  rel="noreferrer"
                >
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-green">
                    WhatsApp
                  </p>
                  <p className="mt-2 text-xl font-black">
                    Chat WhatsApp DEBRODER
                  </p>
                </a>
                <a
                  href={instagramLink}
                  className="rounded-2xl bg-white p-5 transition hover:text-brand-green"
                  target="_blank"
                  rel="noreferrer"
                >
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-green">
                    Instagram
                  </p>
                  <p className="mt-2 text-xl font-black">
                    {content.contact.instagram}
                  </p>
                </a>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <a
                  href={apparelLink}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-green px-5 py-3 text-center text-sm font-black text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  Hubungi DEBRODER Apparel
                </a>
                <a
                  href={expressLink}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-green px-5 py-3 text-center text-sm font-black text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  Hubungi DEBRODER Express
                </a>
                <a
                  href={instagramLink}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-softGray bg-white px-5 py-3 text-center text-sm font-black text-brand-green"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram DEBRODER
                </a>
              </div>
            </div>

            <div className="rounded-[30px] border border-brand-softGray bg-brand-offWhite p-6 sm:p-8">
              <h3 className="text-2xl font-black">Chat Store</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {content.stores.map((store) => (
                  <a
                    key={store.nama_store}
                    href={store.whatsapp_link}
                    className="rounded-2xl bg-white p-4 transition hover:text-brand-green"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p className="text-sm font-black">{store.nama_store}</p>
                    <p className="mt-1 text-sm font-semibold text-brand-charcoal/60">
                      Chat Store
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-green py-16 text-white sm:py-20">
        <div className="section-shell text-center">
          <h2 className="mx-auto max-w-4xl text-3xl font-black tracking-tight sm:text-5xl">
            Butuh Kaos Polos, Sablon, Jersey, atau Pengiriman?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
            Hubungi DEBRODER dan pilih unit bisnis yang sesuai dengan kebutuhan
            Anda.
          </p>
          <a
            href={whatsappMainLink}
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-black text-brand-green transition hover:-translate-y-0.5 hover:bg-brand-offWhite"
            target="_blank"
            rel="noreferrer"
          >
            Hubungi DEBRODER
          </a>
        </div>
      </section>

      <footer className="bg-brand-charcoal py-12 text-white">
        <div className="section-shell grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Logo variant="primary-white" size="md" />
            <p className="mt-3 text-sm font-semibold text-white/70">
              Kaos Polos Import & Sablon
            </p>
            <Link
              href="/admin/login"
              className="mt-6 inline-flex text-xs font-semibold text-white/35 transition hover:text-white"
            >
              Admin
            </Link>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/60">
              Menu
            </h3>
            <div className="mt-5 grid gap-3 text-sm font-semibold text-white/75">
              <Link href="/#tentang" className="hover:text-white">
                Tentang
              </Link>
              <Link href="/#apparel" className="hover:text-white">
                DEBRODER Apparel
              </Link>
              <Link href="/express" className="hover:text-white">
                DEBRODER Express
              </Link>
              <Link href="/store" className="hover:text-white">
                Store
              </Link>
              <Link href="/#kontak" className="hover:text-white">
                Kontak
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/60">
              Layanan
            </h3>
            <div className="mt-5 grid gap-3 text-sm font-semibold text-white/75">
              {content.categories.slice(0, 7).map((service) => (
                <Link
                  key={service.nama_kategori}
                  href={sectionPath(service.link_slug || "koleksi")}
                  className="hover:text-white"
                >
                  {service.nama_kategori}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/60">
              Store
            </h3>
            <div className="mt-5 grid gap-3 text-sm font-semibold text-white/75">
              {content.stores.map((store) => (
                <a
                  key={store.nama_store}
                  href={store.maps_link}
                  className="hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  {store.nama_store.replace("STORE ", "Store ")}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/60">
              Kontak
            </h3>
            <div className="mt-5 grid gap-3 text-sm font-semibold text-white/75">
              <a href={emailLink} className="hover:text-white">
                Email
              </a>
              <a
                href={whatsappMainLink}
                className="hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
              <a
                href={instagramLink}
                className="hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="section-shell mt-10 border-t border-white/10 pt-6">
          <p className="text-sm font-semibold text-white/60">
            &copy; 2026 DEBRODER. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
