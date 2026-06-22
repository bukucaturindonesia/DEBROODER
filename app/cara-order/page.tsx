import { OrderTimeline, PageHero, PublicShell } from "@/components/PublicPage";
import { getPublicContent } from "@/lib/public-data";
import { whatsappHref } from "@/lib/url";

const orderSteps = [
  "Pilih layanan",
  "Konsultasi kebutuhan",
  "Kirim desain atau detail pesanan",
  "Proses produksi",
  "Ambil di store atau kirim melalui DEBRODER Express"
];

export default async function CaraOrderPage() {
  const content = await getPublicContent();
  const apparelLink = whatsappHref(content.contact.whatsapp_apparel);

  return (
    <PublicShell content={content}>
      <PageHero
        label="Cara Order"
        title="Cara Order di DEBRODER"
        description="Ikuti alur sederhana untuk memulai pesanan apparel, sablon, jersey, kaos polos, atau kebutuhan pengiriman."
        ctaText="Mulai Pesan"
        ctaHref={apparelLink}
      />
      <section className="bg-brand-offWhite pb-16 sm:pb-24">
        <div className="section-shell">
          <OrderTimeline steps={orderSteps} />
        </div>
      </section>
    </PublicShell>
  );
}
