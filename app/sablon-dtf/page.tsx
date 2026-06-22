import { PageHero, ProductGrid, PublicShell } from "@/components/PublicPage";
import { getPublicContent } from "@/lib/public-data";
import { whatsappHref } from "@/lib/url";

export default async function SablonDtfPage() {
  const content = await getPublicContent();
  const apparelLink = whatsappHref(content.contact.whatsapp_apparel);
  const products = content.products.filter((product) =>
    `${product.nama} ${product.kategori}`.toLowerCase().includes("dtf")
  );

  return (
    <PublicShell content={content}>
      <PageHero
        label="Sablon DTF"
        title="Sablon DTF"
        description="Layanan sablon DTF untuk kaos custom, produksi pakaian, brand clothing, event, komunitas, dan kebutuhan partai."
        ctaText="Konsultasi Sablon DTF"
        ctaHref={apparelLink}
      />
      <section className="bg-brand-offWhite pb-16 sm:pb-24">
        <div className="section-shell">
          <ProductGrid products={products.length ? products : content.products} />
        </div>
      </section>
    </PublicShell>
  );
}
