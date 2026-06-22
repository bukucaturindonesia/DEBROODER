import { PageHero, PublicShell } from "@/components/PublicPage";
import { getPublicContent } from "@/lib/public-data";
import { whatsappHref } from "@/lib/url";

const services = [
  "Pengiriman barang",
  "Distribusi",
  "Layanan ekspedisi",
  "Pengiriman antar wilayah"
];

export default async function ExpressPage() {
  const content = await getPublicContent();
  const expressLink = whatsappHref(content.contact.whatsapp_express);

  return (
    <PublicShell content={content}>
      <PageHero
        label="Express"
        title="DEBRODER Express"
        description="Layanan pengiriman, distribusi, dan ekspedisi untuk mendukung kebutuhan pelanggan dan operasional bisnis DEBRODER."
        ctaText="Hubungi DEBRODER Express"
        ctaHref={expressLink}
      />
      <section className="bg-brand-offWhite pb-16 sm:pb-24">
        <div className="section-shell grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service}
              className="rounded-[28px] border border-brand-softGray bg-white p-6 shadow-sm"
            >
              <span className="block h-10 w-10 rounded-full bg-brand-green" />
              <h2 className="mt-8 text-xl font-black">{service}</h2>
            </article>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
