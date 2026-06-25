import type { Metadata } from "next";
import { OrderTimeline, PublicShell } from "@/components/PublicPage";
import { getPublicContent } from "@/lib/public-data";
import { whatsappLinkWithMessage } from "@/lib/url";

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
  const apparelLink = whatsappLinkWithMessage(
    content.contact.whatsapp_link || content.contact.whatsapp_apparel,
    "Halo DEBRODER, saya ingin bertanya tentang layanan DEBRODER."
  );
  const orderSteps = [...content.orderSteps]
    .filter((step) => step.status_aktif !== false)
    .sort((a, b) => a.urutan - b.urutan);

  return (
    <PublicShell content={content}>
      <section className="bg-white py-12 sm:py-16">
        <div className="section-shell">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-charcoal/50">
            Cara Order
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Cara Order di DEBRODER
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-brand-charcoal/70">
            Ikuti langkah mudah untuk memesan kaos polos, sablon DTF, custom
            jersey, maklon DTF, cetak sublim, atau layanan pengiriman DEBRODER.
          </p>
          <a
            href={apparelLink}
            className="mt-6 inline-flex min-h-11 items-center rounded-full bg-brand-charcoal px-6 text-sm font-semibold text-white transition hover:bg-black/80"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mulai Order
          </a>
        </div>
      </section>
      <section className="bg-brand-offWhite py-14 sm:py-20">
        <div className="section-shell">
          <OrderTimeline steps={orderSteps} />
        </div>
      </section>
      <section className="bg-white py-14 sm:py-20">
        <div className="section-shell">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            FAQ
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="bg-brand-offWhite p-6"
              >
                <h3 className="text-lg font-semibold">{faq.question}</h3>
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
