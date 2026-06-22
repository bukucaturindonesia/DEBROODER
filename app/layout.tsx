import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DEBRODER | Kaos Polos Import & Sablon",
  description:
    "Website resmi DEBRODER untuk kaos polos import, sablon DTF, jersey, dan layanan pengiriman.",
  keywords: [
    "DEBRODER",
    "kaos polos import",
    "sablon DTF",
    "jersey",
    "pengiriman",
    "Makassar",
    "Parepare"
  ],
  openGraph: {
    title: "DEBRODER | Kaos Polos Import & Sablon",
    description:
      "Kaos polos import, sablon DTF, jersey, dan layanan pengiriman dalam satu ekosistem bisnis.",
    siteName: "DEBRODER",
    images: [
      {
        url: "/images/debroder-hero.png",
        width: 1536,
        height: 1024,
        alt: "Kaos polos dan paket pengiriman DEBRODER"
      }
    ],
    locale: "id_ID",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "DEBRODER | Kaos Polos Import & Sablon",
    description:
      "Kaos polos import, sablon DTF, jersey, dan layanan pengiriman dalam satu ekosistem bisnis.",
    images: ["/images/debroder-hero.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
