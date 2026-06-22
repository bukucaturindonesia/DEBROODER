import { PageHero, ProductGrid, PublicShell } from "@/components/PublicPage";
import { getPublicContent } from "@/lib/public-data";
import { whatsappHref } from "@/lib/url";

export default async function JerseyPage() {
  const content = await getPublicContent();
  const apparelLink = whatsappHref(content.contact.whatsapp_apparel);
  const products = content.products.filter((product) =>
    `${product.nama} ${product.kategori}`.toLowerCase().includes("jersey")
  );

  return (
    <PublicShell content={content}>
      <PageHero
        label="Jersey"
        title="Custom Jersey"
        description="Pembuatan jersey custom untuk tim olahraga, sekolah, kantor, komunitas, instansi, perusahaan, dan event."
        ctaText="Pesan Jersey Custom"
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
