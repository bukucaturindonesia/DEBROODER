import { PageHero, ProductGrid, PublicShell } from "@/components/PublicPage";
import { getPublicContent } from "@/lib/public-data";
import { whatsappHref } from "@/lib/url";

export default async function KaosPolosPage() {
  const content = await getPublicContent();
  const apparelLink = whatsappHref(content.contact.whatsapp_apparel);
  const products = content.products.filter((product) =>
    `${product.nama} ${product.kategori}`.toLowerCase().includes("kaos")
  );

  return (
    <PublicShell content={content}>
      <PageHero
        label="Kaos Polos"
        title="Kaos Polos & Cotton Combed"
        description="Penyediaan kaos polos, kaos NSA, dan kaos cotton combed untuk sablon, brand clothing, komunitas, event, instansi, dan pembelian partai."
        ctaText="Pesan Kaos Polos"
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
