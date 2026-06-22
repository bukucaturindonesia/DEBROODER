import type {
  AboutContent,
  ContactSettings,
  HeroBanner,
  Product,
  PublicContent,
  ServiceCategory,
  Store,
  Testimonial
} from "@/lib/types";
import { contactLinks, storeContacts } from "@/lib/contact";

export const fallbackHero: HeroBanner = {
  headline: "Kaos Polos, Sablon DTF, dan Jersey Custom",
  subheadline:
    "DEBRODER menyediakan kebutuhan apparel, sablon, jersey, dan layanan pengiriman dalam satu ekosistem bisnis yang mudah dijangkau.",
  cta_primary_text: "Mulai Pesan",
  cta_primary_link: contactLinks.apparelWhatsapp,
  cta_secondary_text: "Lihat Layanan",
  cta_secondary_link: "/koleksi",
  image_url: "/images/debroder-hero.png",
  status_aktif: true
};

export const fallbackAbout: AboutContent = {
  label: "TENTANG KAMI",
  title: "Tentang DEBRODER",
  body: "DEBRODER adalah perusahaan percetakan dan apparel yang berdiri sejak tahun 2016. Kami berfokus pada layanan sablon kaos, custom jersey, maklon DTF, cetak sublim, distribusi kaos NSA, dan penyediaan kaos cotton combed.\n\nDengan pengalaman dan komitmen terhadap kualitas, DEBRODER telah dipercaya oleh berbagai perusahaan, instansi, komunitas, dan event besar di Indonesia Timur, khususnya di kota Makassar.",
  highlights: [
    "Berdiri sejak 2016",
    "Melayani perusahaan, instansi, komunitas, dan event",
    "Fokus layanan di Indonesia Timur",
    "Berbasis di Makassar"
  ],
  status_aktif: true
};

export const fallbackCategories: ServiceCategory[] = [
  {
    nama_kategori: "Sablon Kaos",
    deskripsi:
      "Layanan sablon kaos untuk komunitas, event, brand, instansi, dan perusahaan.",
    gambar_url: "/images/debroder-hero.png",
    link_slug: "sablon-dtf",
    urutan: 1,
    status_aktif: true
  },
  {
    nama_kategori: "Sablon DTF",
    deskripsi:
      "Layanan sablon DTF untuk kaos custom, produksi pakaian, brand clothing, dan kebutuhan partai.",
    gambar_url: "/images/debroder-hero.png",
    link_slug: "sablon-dtf",
    urutan: 2,
    status_aktif: true
  },
  {
    nama_kategori: "Custom Jersey",
    deskripsi:
      "Pembuatan jersey custom untuk tim olahraga, sekolah, kantor, komunitas, dan event.",
    gambar_url: "/images/debroder-hero.png",
    link_slug: "jersey",
    urutan: 3,
    status_aktif: true
  },
  {
    nama_kategori: "Maklon DTF",
    deskripsi:
      "Layanan maklon DTF untuk kebutuhan produksi, reseller, dan brand apparel.",
    gambar_url: "/images/debroder-hero.png",
    link_slug: "maklon-dtf",
    urutan: 4,
    status_aktif: true
  },
  {
    nama_kategori: "Cetak Sublim",
    deskripsi:
      "Layanan cetak sublim untuk jersey, apparel custom, dan kebutuhan produksi kreatif.",
    gambar_url: "/images/debroder-hero.png",
    link_slug: "cetak-sublim",
    urutan: 5,
    status_aktif: true
  },
  {
    nama_kategori: "Kaos Polos & Cotton Combed",
    deskripsi:
      "Penyediaan kaos polos, kaos NSA, dan kaos cotton combed untuk sablon, brand clothing, komunitas, dan pembelian partai.",
    gambar_url: "/images/debroder-hero.png",
    link_slug: "kaos-polos",
    urutan: 6,
    status_aktif: true
  },
  {
    nama_kategori: "DEBRODER Express",
    deskripsi:
      "Layanan pengiriman dan distribusi untuk mendukung kebutuhan pelanggan dan operasional bisnis.",
    gambar_url: "/images/debroder-hero.png",
    link_slug: "express",
    urutan: 7,
    status_aktif: true
  }
];

export const fallbackProducts: Product[] = [
  {
    nama: "Kaos Polos Premium",
    kategori: "Kaos Polos",
    badge: "Populer",
    deskripsi:
      "Kaos polos untuk sablon, komunitas, brand clothing, dan kebutuhan partai.",
    gambar_url: "/images/debroder-hero.png",
    whatsapp_link: contactLinks.apparelWhatsapp,
    urutan: 1,
    status_aktif: true
  },
  {
    nama: "Sablon DTF Custom",
    kategori: "Sablon DTF",
    badge: "Custom",
    deskripsi:
      "Layanan sablon DTF untuk kaos custom, event, komunitas, dan produksi pakaian.",
    gambar_url: "/images/debroder-hero.png",
    whatsapp_link: contactLinks.apparelWhatsapp,
    urutan: 2,
    status_aktif: true
  },
  {
    nama: "Custom Jersey Team",
    kategori: "Jersey",
    badge: "Jersey",
    deskripsi:
      "Pembuatan jersey untuk tim olahraga, sekolah, kantor, dan komunitas.",
    gambar_url: "/images/debroder-hero.png",
    whatsapp_link: contactLinks.apparelWhatsapp,
    urutan: 3,
    status_aktif: true
  },
  {
    nama: "Maklon DTF",
    kategori: "Maklon",
    badge: "Maklon",
    deskripsi:
      "Layanan maklon DTF untuk kebutuhan produksi, reseller, dan brand apparel.",
    gambar_url: "/images/debroder-hero.png",
    whatsapp_link: contactLinks.apparelWhatsapp,
    urutan: 4,
    status_aktif: true
  },
  {
    nama: "Cetak Sublim",
    kategori: "Sublim",
    badge: "Sublim",
    deskripsi: "Layanan cetak sublim untuk jersey dan apparel custom.",
    gambar_url: "/images/debroder-hero.png",
    whatsapp_link: contactLinks.apparelWhatsapp,
    urutan: 5,
    status_aktif: true
  },
  {
    nama: "Paket Apparel Komunitas",
    kategori: "Paket",
    badge: "Paket",
    deskripsi:
      "Paket apparel untuk komunitas, event, brand, instansi, dan perusahaan.",
    gambar_url: "/images/debroder-hero.png",
    whatsapp_link: contactLinks.apparelWhatsapp,
    urutan: 6,
    status_aktif: true
  }
];

export const fallbackStores: Store[] = storeContacts.map((store, index) => ({
  nama_store: store.name,
  layanan_utama: store.service,
  alamat: store.address,
  whatsapp: store.whatsapp,
  whatsapp_link: store.whatsappLink,
  maps_link: store.mapsLink,
  urutan: index + 1,
  status_aktif: true
}));

export const fallbackTestimonials: Testimonial[] = [
  {
    nama: "Komunitas Olahraga Makassar",
    sumber: "Custom jersey",
    isi_testimoni:
      "Pesanan jersey rapi, komunikasinya jelas, dan hasilnya sesuai kebutuhan tim.",
    status_aktif: true
  },
  {
    nama: "Brand Lokal Indonesia Timur",
    sumber: "Sablon DTF",
    isi_testimoni:
      "DEBRODER membantu produksi kaos custom kami dengan proses yang mudah dipantau.",
    status_aktif: true
  },
  {
    nama: "Event Organizer",
    sumber: "Paket apparel",
    isi_testimoni:
      "Pilihan kaos dan sablon cocok untuk kebutuhan event dengan jumlah banyak.",
    status_aktif: true
  }
];

export const fallbackContact: ContactSettings = {
  email: "hello@debroder.example",
  whatsapp_utama: "+62 000-0000-0000",
  whatsapp_apparel: "+62 000-0000-0001",
  whatsapp_express: "+62 000-0000-0002",
  instagram: "@debroder",
  status_aktif: true
};

export const fallbackContent: PublicContent = {
  hero: fallbackHero,
  about: fallbackAbout,
  categories: fallbackCategories,
  products: fallbackProducts,
  stores: fallbackStores,
  testimonials: fallbackTestimonials,
  contact: fallbackContact
};
