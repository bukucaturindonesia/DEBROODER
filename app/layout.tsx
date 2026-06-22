import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://debroder.com"),
  title: "DEBRODER | Kaos Polos Import & Sablon",
  alternates: {
    canonical: "/"
  },
  description:
    "DEBRODER adalah perusahaan percetakan dan apparel sejak 2016 yang menyediakan sablon kaos, sablon DTF, custom jersey, maklon DTF, cetak sublim, kaos polos, dan layanan pengiriman melalui DEBRODER Apparel dan DEBRODER Express.",
  keywords: [
    "DEBRODER",
    "De Broder",
    "kaos polos",
    "sablon DTF",
    "sablon kaos",
    "custom jersey",
    "maklon DTF",
    "cetak sublim",
    "kaos NSA",
    "cotton combed",
    "Makassar",
    "Parepare",
    "apparel",
    "jersey",
    "ekspedisi"
  ],
  openGraph: {
    title: "DEBRODER | Kaos Polos Import & Sablon",
    description:
      "Perusahaan percetakan dan apparel sejak 2016 untuk sablon kaos, sablon DTF, custom jersey, maklon DTF, cetak sublim, kaos polos, dan layanan pengiriman.",
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
  children: ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
