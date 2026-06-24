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
  const pageHero = content.pageHeroes.find((hero) => hero.page_key === "store");

  return (
    <PublicShell content={content}>
      <PageHero
        label={pageHero?.label || "STORE DEBRODER"}
        title={pageHero?.title || "Temukan Store DEBRODER Terdekat"}
        description={pageHero?.subtitle || "Pettarani, Tello, Landak, dan Parepare."}
        imageUrl={pageHero?.image_url}
        objectPosition={pageHero?.object_position}
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Store" }
        ]}
      />
      <section className="bg-brand-offWhite py-14 sm:py-20">
        <div className="section-shell">
          <StoreGrid stores={content.stores} />
        </div>
      </section>
    </PublicShell>
  );
}
