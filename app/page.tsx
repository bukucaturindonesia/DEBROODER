import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { contactLinks } from "@/lib/contact";

const branches = [
  "Tello, Makassar",
  "Landak, Makassar",
  "Pettarani, Makassar",
  "Parepare"
];

const advantages = [
  "Layanan apparel lengkap",
  "Tersedia beberapa cabang",
  "Cocok untuk individu, komunitas, brand, dan perusahaan",
  "Mendukung kebutuhan custom dan partai",
  "Memiliki ekosistem apparel dan layanan pengiriman"
];

const unitCards = [
  {
    id: "apparel",
    title: "DEBRODER Apparel",
    category: "Apparel, Sablon, Jersey, dan Kaos Polos",
    description:
      "DEBRODER Apparel adalah unit bisnis yang bergerak di bidang apparel, custom clothing, produksi pakaian, sablon DTF, pembuatan jersey, dan penyediaan kaos polos untuk individu, komunitas, brand, dan perusahaan.",
    services: ["Sablon DTF", "Pembuatan jersey", "Penyediaan kaos polos"],
    branches,
    cta: "Hubungi DEBRODER Apparel",
    href: contactLinks.apparelWhatsapp
  },
  {
    id: "express",
    title: "DEBRODER Express",
    category: "Ekspedisi, Pengiriman, dan Distribusi",
    description:
      "DEBRODER Express adalah unit bisnis yang bergerak di bidang jasa ekspedisi, pengiriman barang, dan distribusi. Layanan ini hadir untuk mendukung kebutuhan pengiriman pelanggan dan operasional bisnis DEBRODER.",
    services: [
      "Pengiriman barang",
      "Distribusi",
      "Layanan ekspedisi",
      "Pengiriman antar wilayah"
    ],
    branches: [],
    cta: "Hubungi DEBRODER Express",
    href: contactLinks.expressWhatsapp
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-offWhite text-brand-charcoal">
      <SiteHeader />

      <section
        id="beranda"
        className="relative overflow-hidden bg-brand-deep pt-28 text-white sm:pt-32"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_34%),linear-gradient(135deg,#003B0A_0%,#002B08_52%,#111111_100%)]" />
        <div className="section-shell relative grid min-h-[740px] items-center gap-10 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
          <div className="fade-up max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white/80">
              Kaos Polos Import & Sablon
            </p>
            <h1 className="text-6xl font-black leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
              DEBRODER
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
              Kaos Polos Import, Sablon DTF, Jersey, dan Layanan Pengiriman
              dalam satu ekosistem bisnis yang terus berkembang.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#unit-bisnis"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-black text-brand-green transition hover:-translate-y-0.5 hover:bg-brand-offWhite focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-deep"
              >
                Lihat Unit Bisnis
              </a>
              <a
                href="#kontak"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-deep"
              >
                Hubungi DEBRODER
              </a>
            </div>
          </div>

          <div className="fade-up relative lg:justify-self-end">
            <div className="relative overflow-hidden rounded-[28px] border border-white/20 bg-white/10 p-3 shadow-soft">
              <Image
                src="/images/debroder-hero.png"
                alt="Kaos polos hijau dan putih dengan paket pengiriman"
                width={1536}
                height={1024}
                priority
                className="aspect-[4/3] w-full rounded-[22px] object-cover"
                sizes="(min-width: 1024px) 52vw, 100vw"
              />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-brand-deep/80 p-5 backdrop-blur-md">
                <p className="text-sm font-bold text-white/70">
                  Ekosistem DEBRODER
                </p>
                <div className="mt-3 grid grid-cols-3 gap-3 text-center text-sm font-black">
                  <span className="rounded-full bg-white px-3 py-2 text-brand-green">
                    Apparel
                  </span>
                  <span className="rounded-full bg-white px-3 py-2 text-brand-green">
                    Sablon
                  </span>
                  <span className="rounded-full bg-white px-3 py-2 text-brand-green">
                    Express
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tentang" className="py-20 sm:py-24">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <p className="text-sm font-black uppercase tracking-[0.26em] text-brand-green">
            Tentang DEBRODER
          </p>
          <div>
            <h2 className="text-4xl font-black tracking-tight text-brand-charcoal sm:text-5xl">
              Tentang DEBRODER
            </h2>
            <p className="mt-6 text-lg leading-8 text-brand-charcoal/75">
              DEBRODER adalah brand yang bergerak dalam ekosistem apparel dan
              layanan bisnis pendukung. Melalui DEBRODER Apparel dan DEBRODER
              Express, DEBRODER hadir untuk memberikan solusi pakaian, custom
              apparel, dan layanan pengiriman yang lebih mudah dijangkau
              pelanggan.
            </p>
          </div>
        </div>
      </section>

      <section id="unit-bisnis" className="bg-white py-20 sm:py-24">
        <div className="section-shell">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.26em] text-brand-green">
              Unit Bisnis
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Dua layanan utama dalam satu brand.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {unitCards.map((unit) => (
              <article
                key={unit.id}
                id={unit.id}
                className="rounded-[28px] border border-brand-softGray bg-brand-offWhite p-6 shadow-soft sm:p-8"
              >
                <p className="text-sm font-black uppercase tracking-[0.2em] text-brand-green">
                  {unit.category}
                </p>
                <h3 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                  {unit.title}
                </h3>
                <p className="mt-5 text-base leading-7 text-brand-charcoal/70">
                  {unit.description}
                </p>

                <div className="mt-7">
                  <h4 className="text-sm font-black uppercase tracking-[0.18em] text-brand-charcoal">
                    Layanan utama
                  </h4>
                  <ul className="mt-4 grid gap-3">
                    {unit.services.map((service) => (
                      <li
                        key={service}
                        className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-brand-charcoal"
                      >
                        <span className="h-2.5 w-2.5 rounded-full bg-brand-green" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                {unit.branches.length > 0 ? (
                  <div className="mt-7">
                    <h4 className="text-sm font-black uppercase tracking-[0.18em] text-brand-charcoal">
                      Cabang
                    </h4>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {unit.branches.map((branch) => (
                        <span
                          key={branch}
                          className="rounded-full border border-brand-softGray bg-white px-4 py-2 text-sm font-bold text-brand-charcoal/75"
                        >
                          {branch}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                <a
                  href={unit.href}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-brand-green px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-brand-deep focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 sm:w-auto"
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

      <section id="cabang" className="py-20 sm:py-24">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.26em] text-brand-green">
              Cabang
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Cabang DEBRODER Apparel
            </h2>
            <p className="mt-5 text-lg leading-8 text-brand-charcoal/70">
              DEBRODER Apparel memiliki beberapa titik layanan yang memudahkan
              pelanggan mengakses layanan sablon, jersey, dan kaos polos.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {branches.map((branch, index) => (
              <article
                key={branch}
                className="rounded-3xl border border-brand-softGray bg-white p-6 shadow-soft"
              >
                <p className="text-sm font-black text-brand-green">
                  0{index + 1}
                </p>
                <h3 className="mt-8 text-2xl font-black">{branch}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-charcoal/70">
                  Titik layanan DEBRODER Apparel untuk kebutuhan kaos polos,
                  sablon DTF, dan jersey.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-deep py-20 text-white sm:py-24">
        <div className="section-shell">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.26em] text-white/70">
              Keunggulan
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Keunggulan DEBRODER
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {advantages.map((advantage) => (
              <article
                key={advantage}
                className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm"
              >
                <span className="block h-10 w-10 rounded-full bg-white" />
                <h3 className="mt-8 text-lg font-black leading-6">
                  {advantage}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="kontak" className="bg-white py-20 sm:py-24">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.26em] text-brand-green">
              Our Contact
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Hubungi DEBRODER
            </h2>
          </div>

          <div className="grid gap-4">
            <a
              href={contactLinks.email}
              className="group rounded-3xl border border-brand-softGray bg-brand-offWhite p-6 transition hover:border-brand-green"
            >
              <p className="text-sm font-black uppercase tracking-[0.22em] text-brand-green">
                Email
              </p>
              <p className="mt-3 text-2xl font-black group-hover:text-brand-green">
                hello@debroder.example
              </p>
            </a>
            <a
              href={contactLinks.whatsapp}
              className="group rounded-3xl border border-brand-softGray bg-brand-offWhite p-6 transition hover:border-brand-green"
              target="_blank"
              rel="noreferrer"
            >
              <p className="text-sm font-black uppercase tracking-[0.22em] text-brand-green">
                WhatsApp
              </p>
              <p className="mt-3 text-2xl font-black group-hover:text-brand-green">
                +62 000-0000-0000
              </p>
            </a>
            <a
              href={contactLinks.instagram}
              className="group rounded-3xl border border-brand-softGray bg-brand-offWhite p-6 transition hover:border-brand-green"
              target="_blank"
              rel="noreferrer"
            >
              <p className="text-sm font-black uppercase tracking-[0.22em] text-brand-green">
                Instagram
              </p>
              <p className="mt-3 text-2xl font-black group-hover:text-brand-green">
                @debroder
              </p>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-brand-green py-20 text-white sm:py-24">
        <div className="section-shell text-center">
          <h2 className="mx-auto max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">
            Butuh Kaos Polos, Sablon, Jersey, atau Pengiriman?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/80">
            Hubungi DEBRODER dan pilih unit bisnis yang sesuai dengan kebutuhan
            Anda.
          </p>
          <a
            href={contactLinks.whatsapp}
            className="mt-9 inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-black text-brand-green transition hover:-translate-y-0.5 hover:bg-brand-offWhite focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-green"
            target="_blank"
            rel="noreferrer"
          >
            Hubungi DEBRODER
          </a>
        </div>
      </section>

      <footer className="bg-brand-charcoal py-12 text-white">
        <div className="section-shell grid gap-10 lg:grid-cols-[1fr_0.8fr_0.8fr]">
          <div>
            <h2 className="text-3xl font-black tracking-[0.18em]">DEBRODER</h2>
            <p className="mt-3 text-sm font-semibold text-white/70">
              Kaos Polos Import & Sablon
            </p>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.22em] text-white/60">
              Menu
            </h3>
            <div className="mt-5 grid gap-3 text-sm font-semibold text-white/75">
              <a href="#tentang" className="hover:text-white">
                Tentang
              </a>
              <a href="#apparel" className="hover:text-white">
                DEBRODER Apparel
              </a>
              <a href="#express" className="hover:text-white">
                DEBRODER Express
              </a>
              <a href="#cabang" className="hover:text-white">
                Cabang
              </a>
              <a href="#kontak" className="hover:text-white">
                Kontak
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.22em] text-white/60">
              Kontak
            </h3>
            <div className="mt-5 grid gap-3 text-sm font-semibold text-white/75">
              <a href={contactLinks.email} className="hover:text-white">
                Email
              </a>
              <a
                href={contactLinks.whatsapp}
                className="hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
              <a
                href={contactLinks.instagram}
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
