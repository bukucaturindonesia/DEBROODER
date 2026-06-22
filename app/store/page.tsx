import { PageHero, PublicShell, StoreGrid } from "@/components/PublicPage";
import { getPublicContent } from "@/lib/public-data";

export default async function StorePage() {
  const content = await getPublicContent();

  return (
    <PublicShell content={content}>
      <PageHero
        label="Store"
        title="Store DEBRODER Apparel"
        description="Temukan store DEBRODER Apparel terdekat untuk kebutuhan sablon kaos, cetak DTF, jersey, dan kaos polos."
      />
      <section className="bg-brand-offWhite pb-16 sm:pb-24">
        <div className="section-shell">
          <StoreGrid stores={content.stores} />
        </div>
      </section>
    </PublicShell>
  );
}
