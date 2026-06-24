import type { Metadata } from "next";
import { OrderTimeline, PageHero, PublicShell } from "@/components/PublicPage";
import { getPublicContent } from "@/lib/public-data";
import { whatsappHref } from "@/lib/url";

export const metadata: Metadata = {
  title: "Cara Order di DEBRODER",
  description:
    "Ikuti langkah mudah untuk memesan kaos polos, sablon DTF, custom jersey, maklon DTF, cetak sublim, atau layanan pengiriman DEBRODER.",
  alternates: { canonical: "/cara-order" },
  openGraph: {
    title: "Cara Order di DEBRODER",
    description:
      "Langkah mudah memesan kaos polos, sablon DTF, custom jersey, maklon DTF, cetak sublim, atau layanan pengiriman."
  }
};

const orderSteps = [
  "Pilih layanan",
  "Konsultasi kebutuhan",
  "Kirim desain atau detail pesanan",
  "Proses produksi",
  "Ambil di store atau kirim melalui DEBRODER Express"
];

const faqs = [
  {
    question: "Apakah bisa pesan satuan?",
    answer: "Bisa dikonsultasikan sesuai jenis layanan dan kebutuhan pesanan."
  },
  {
    question: "Apakah bisa custom desain?",
    answer: "Bisa. Kirim desain atau detail konsep saat konsultasi."
  },
  {
    question: "Apakah bisa ambil di store?",
    answer: "Bisa. Pilih store DEBRODER Apparel terdekat saat pesanan siap."
  },
  {
    question: "Apakah bisa dikirim?",
    answer: "Bisa. Pesanan dapat dikirim sesuai kebutuhan pelanggan."
  }
];

export default async function CaraOrderPage() {
  const content = await getPublicContent();
  const apparelLink = whatsappHref(content.contact.whatsapp_apparel);

  return (
    <PublicShell content={content}>
      <PageHero
        label="Cara Order"
        title="Cara Order di DEBRODER"
        description="Ikuti langkah mudah untuk memesan kaos polos, sablon DTF, custom jersey, maklon DTF, cetak sublim, atau layanan pengiriman DEBRODER."
        ctaText="Mulai Pesan"
        ctaHref={apparelLink}
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Cara Order" }
        ]}
      />
      <section className="bg-brand-offWhite pb-16 sm:pb-24">
        <div className="section-shell">
          <OrderTimeline steps={orderSteps} />
        </div>
      </section>
      <section className="bg-white py-16 sm:py-24">
        <div className="section-shell">
          <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
            FAQ
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-[24px] border border-brand-softGray bg-brand-offWhite p-6"
              >
                <h3 className="text-lg font-black">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-charcoal/70">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
