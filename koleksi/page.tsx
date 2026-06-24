import type { Metadata } from "next";
import {
  PageHero,
  ProductGrid,
  PublicShell,
  ServiceCard
} from "@/components/PublicPage";
import { getPublicContent } from "@/lib/public-data";
import { whatsappHref } from "@/lib/url";

export const metadata: Metadata = {
  title: "Koleksi & Layanan DEBRODER",
  description:
    "Temukan layanan apparel, percetakan, custom jersey, sablon DTF, kaos polos, maklon DTF, cetak sublim, dan pengiriman dari DEBRODER.",
  alternates: { canonical: "/koleksi" },
  openGraph: {
    title: "Koleksi & Layanan DEBRODER",
    description:
      "Layanan apparel, percetakan, custom jersey, sablon DTF, kaos polos, maklon DTF, cetak sublim, dan pengiriman dari DEBRODER."
  }
};

export default async function KoleksiPage() {
  const content = await getPublicContent();
  const categories = content.categories.filter(
    (category) => category.nama_kategori !== "Sablon Kaos"
  );
  const apparelLink = whatsappHref(content.contact.whatsapp_apparel);

  return (
    <PublicShell content={content}>
      <PageHero
        label="Koleksi"
        title="Koleksi & Layanan DEBRODER"
        description="Temukan layanan apparel, percetakan, custom jersey, sablon DTF, kaos polos, maklon DTF, cetak sublim, dan pengiriman dari DEBRODER."
        ctaText="Mulai Pesan"
        ctaHref={apparelLink}
        secondaryCtaText="Temukan Store"
        secondaryCtaHref="/store"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Koleksi" }
        ]}
      />
      <section className="bg-brand-offWhite pb-16 sm:pb-24">
        <div className="section-shell grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <ServiceCard key={category.nama_kategori} service={category} />
          ))}
        </div>
      </section>
      <section className="bg-white py-16 sm:py-24">
        <div className="section-shell">
          <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
            Produk & Layanan Populer
          </h2>
          <div className="mt-10">
            <ProductGrid products={content.products} />
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
