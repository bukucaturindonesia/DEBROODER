import type { Metadata } from "next";
import { PageHero, PublicShell, StoreGrid } from "@/components/PublicPage";
import { getPublicContent } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Store DEBRODER Apparel",
  description:
    "Temukan store DEBRODER Apparel di Pettarani, Tello, Landak, dan Parepare.",
  alternates: { canonical: "/store" },
  openGraph: {
    title: "Store DEBRODER Apparel",
    description:
      "Store DEBRODER Apparel untuk sablon kaos, cetak DTF, jersey, dan kaos polos."
  }
};

export default async function StorePage() {
  const content = await getPublicContent();

  return (
    <PublicShell content={content}>
      <PageHero
        label="Store"
        title="Store DEBRODER Apparel"
        description="Temukan store DEBRODER Apparel terdekat untuk kebutuhan sablon kaos, cetak DTF, jersey, dan kaos polos."
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Store" }
        ]}
      />
      <section className="bg-brand-offWhite pb-16 sm:pb-24">
        <div className="section-shell">
          <StoreGrid stores={content.stores} />
        </div>
      </section>
    </PublicShell>
  );
}
