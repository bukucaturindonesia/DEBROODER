import type { Metadata } from "next";
import { CategoryDetailPage } from "@/components/PublicPage";
import { getPublicContent } from "@/lib/public-data";
import { whatsappHref } from "@/lib/url";

export const metadata: Metadata = {
  title: "DEBRODER Express | DEBRODER",
  description:
    "Layanan pengiriman, distribusi, dan ekspedisi untuk mendukung kebutuhan pelanggan dan operasional bisnis DEBRODER.",
  alternates: { canonical: "/express" },
  openGraph: {
    title: "DEBRODER Express | DEBRODER",
    description:
      "Layanan pengiriman, distribusi, ekspedisi, dan pengiriman antar wilayah."
  }
};

export default async function ExpressPage() {
  const content = await getPublicContent();

  return (
    <CategoryDetailPage
      content={content}
      label="Express"
      title="DEBRODER Express"
      description="Layanan pengiriman, distribusi, dan ekspedisi untuk mendukung kebutuhan pelanggan dan operasional bisnis DEBRODER."
      details={[
        "Layanan pengiriman barang untuk mendukung kebutuhan pelanggan.",
        "Distribusi dan ekspedisi untuk kebutuhan operasional bisnis.",
        "Pengiriman antar wilayah dengan alur komunikasi yang mudah."
      ]}
      visualLabel="Placeholder DEBRODER Express"
      ctaText="Hubungi DEBRODER Express"
      ctaHref={whatsappHref(content.contact.whatsapp_express)}
      currentSlug="express"
    />
  );
}
