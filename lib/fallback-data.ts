import type {
  AboutContent,
  ContactSettings,
  HeroBanner,
  InstagramBanner,
  OrderStep,
  PageHeroContent,
  Product,
  PublicContent,
  ServiceCategory,
  Store,
  Testimonial,
  TrustAboutContent
} from "@/lib/types";
import { contactLinks, storeContacts } from "@/lib/contact";
import { whatsappLinkWithMessage } from "@/lib/url";

export const fallbackImages = {
  hero: "/images/debroder/hero/hero-home.jpg",
  pageHero: "/images/debroder/hero/page-hero.jpg",
  product: "/images/debroder/fallback/fallback-product.jpg",
  banner: "/images/debroder/banners/instagram-banner.jpg",
  store: "/images/debroder/fallback/fallback-store.jpg",
  benefit: "/images/debroder/fallback/fallback-benefit.jpg"
} as const;

export const storeImageFallbacks: Record<string, string> = {
  "STORE PETTARANI": "/images/debroder/stores/store-pettarani.jpg",
  "STORE TELLO": "/images/debroder/stores/store-tello.jpg",
  "STORE LANDAK": "/images/debroder/stores/store-landak.jpg",
  "STORE PAREPARE": "/images/debroder/stores/store-parepare.jpg"
};

export function getStoreImage(store: Pick<Store, "nama_store" | "image_url">) {
  return (
    store.image_url ||
    storeImageFallbacks[store.nama_store] ||
    fallbackImages.store
  );
}

export const fallbackHeroes: HeroBanner[] = [
  {
    badge: "KAOS POLOS IMPORT",
    headline: "KAOS POLOS IMPORT",
    subheadline: "Sablon DTF, Jersey, dan Custom Apparel",
    title: "KAOS POLOS IMPORT",
    subtitle: "Sablon DTF, Jersey, dan Custom Apparel",
    cta_primary_text: "Beli Sekarang",
    cta_primary_link: "/koleksi",
    cta_secondary_text: "",
    cta_secondary_link: "",
    cta_text: "Beli Sekarang",
    cta_link: "/koleksi",
    image_url: fallbackImages.hero,
    object_position: "center center",
    urutan: 1,
    status_aktif: true
  }
];

export const fallbackHero: HeroBanner = fallbackHeroes[0];

export const fallbackAbout: AboutContent = {
  label: "TENTANG DEBRODER",
  title: "Tentang DEBRODER",
  body: "DEBRODER adalah brand yang bergerak dalam ekosistem apparel dan layanan bisnis pendukung. Melalui DEBRODER Apparel dan DEBRODER Express, DEBRODER hadir untuk memberikan solusi kaos polos, sablon DTF, custom jersey, produksi apparel, dan layanan pengiriman yang lebih mudah dijangkau pelanggan.\n\nDEBRODER melayani kebutuhan individu, komunitas, brand, event, sekolah, instansi, hingga perusahaan melalui beberapa store yang tersebar di Pettarani, Tello, Landak, dan Parepare.",
  highlights: [
    "4 Store Aktif",
    "Apparel & Custom",
    "Sablon DTF",
    "Jersey Custom",
    "DEBRODER Express"
  ],
  status_aktif: true
};

export const fallbackCategories: ServiceCategory[] = [
  {
    nama_kategori: "Kaos Polos",
    deskripsi: "Kaos polos import dan cotton combed",
    gambar_url: "/images/debroder/products/kaos-polos.jpg",
    link_slug: "kaos-polos",
    urutan: 1,
    status_aktif: true
  },
  {
    nama_kategori: "Sablon DTF",
    deskripsi: "Sablon kaos, logo, komunitas, dan brand",
    gambar_url: "/images/debroder/products/sablon-dtf.jpg",
    link_slug: "sablon-dtf",
    urutan: 2,
    status_aktif: true
  },
  {
    nama_kategori: "Custom Jersey",
    deskripsi: "Jersey tim, komunitas, sekolah, dan instansi",
    gambar_url: "/images/debroder/products/custom-jersey.jpg",
    link_slug: "jersey",
    urutan: 3,
    status_aktif: true
  },
  {
    nama_kategori: "Maklon DTF",
    deskripsi: "Layanan produksi DTF untuk kebutuhan bisnis",
    gambar_url: "/images/debroder/products/maklon-dtf.jpg",
    link_slug: "maklon-dtf",
    urutan: 4,
    status_aktif: true
  },
  {
    nama_kategori: "Cetak Sublim",
    deskripsi: "Cetak sublim untuk apparel dan jersey",
    gambar_url: "/images/debroder/products/cetak-sublim.jpg",
    link_slug: "cetak-sublim",
    urutan: 5,
    status_aktif: true
  },
  {
    nama_kategori: "DEBRODER Express",
    deskripsi: "Pengiriman dan distribusi pesanan",
    gambar_url: "/images/debroder/products/debroder-express.jpg",
    link_slug: "express",
    urutan: 6,
    status_aktif: true
  }
];

export const fallbackProducts: Product[] = [
  {
    nama: "Kaos Polos Cotton Combed",
    kategori: "Kaos Polos",
    badge: "",
    deskripsi: "Kaos polos import dan cotton combed",
    short_detail: "Kaos polos import dan cotton combed",
    gambar_url: "/images/debroder/products/kaos-polos.jpg",
    image_url: "/images/debroder/products/kaos-polos.jpg",
    whatsapp_link: contactLinks.whatsapp,
    link_url: "/kaos-polos",
    price: 45000,
    urutan: 1,
    status_aktif: true
  },
  {
    nama: "Sablon DTF Custom",
    kategori: "Sablon DTF",
    badge: "",
    deskripsi: "Sablon DTF untuk logo, brand, dan komunitas",
    short_detail: "Sablon DTF untuk logo, brand, dan komunitas",
    gambar_url: "/images/debroder/products/sablon-dtf.jpg",
    image_url: "/images/debroder/products/sablon-dtf.jpg",
    whatsapp_link: contactLinks.whatsapp,
    link_url: "/sablon-dtf",
    price: 15000,
    urutan: 2,
    status_aktif: true
  },
  {
    nama: "Custom Jersey",
    kategori: "Jersey",
    badge: "",
    deskripsi: "Jersey custom untuk tim dan komunitas",
    short_detail: "Jersey custom untuk tim dan komunitas",
    gambar_url: "/images/debroder/products/custom-jersey.jpg",
    image_url: "/images/debroder/products/custom-jersey.jpg",
    whatsapp_link: contactLinks.whatsapp,
    link_url: "/jersey",
    price: 85000,
    urutan: 3,
    status_aktif: true
  },
  {
    nama: "Maklon DTF",
    kategori: "Maklon DTF",
    badge: "",
    deskripsi: "Produksi DTF untuk reseller dan brand apparel",
    short_detail: "Produksi DTF untuk reseller dan brand apparel",
    gambar_url: "/images/debroder/products/maklon-dtf.jpg",
    image_url: "/images/debroder/products/maklon-dtf.jpg",
    whatsapp_link: contactLinks.whatsapp,
    link_url: "/maklon-dtf",
    price: 12000,
    urutan: 4,
    status_aktif: true
  },
  {
    nama: "Cetak Sublim",
    kategori: "Cetak Sublim",
    badge: "",
    deskripsi: "Cetak sublim untuk jersey dan apparel custom",
    short_detail: "Cetak sublim untuk jersey dan apparel custom",
    gambar_url: "/images/debroder/products/cetak-sublim.jpg",
    image_url: "/images/debroder/products/cetak-sublim.jpg",
    whatsapp_link: contactLinks.whatsapp,
    link_url: "/cetak-sublim",
    price: 35000,
    urutan: 5,
    status_aktif: true
  },
  {
    nama: "DEBRODER Express",
    kategori: "Express",
    badge: "",
    deskripsi: "Pengiriman dan distribusi pesanan",
    short_detail: "Pengiriman dan distribusi pesanan",
    gambar_url: "/images/debroder/products/debroder-express.jpg",
    image_url: "/images/debroder/products/debroder-express.jpg",
    whatsapp_link: contactLinks.whatsapp,
    link_url: "/express",
    urutan: 6,
    status_aktif: true
  }
];

export const fallbackStores: Store[] = storeContacts.map((store, index) => ({
  nama_store: store.name,
  layanan_utama: store.service,
  alamat: store.address,
  whatsapp: store.whatsapp,
  whatsapp_link: whatsappLinkWithMessage(
    store.whatsappLink,
    `Halo DEBRODER, saya ingin bertanya tentang layanan di Store ${store.name}.`
  ),
  maps_link: store.mapsLink,
  image_url: storeImageFallbacks[store.name],
  urutan: index + 1,
  status_aktif: true
}));

export const fallbackInstagramBanner: InstagramBanner = {
  title: "Instagram DEBRODER",
  image_url: fallbackImages.banner,
  link_url: contactLinks.instagram,
  status_aktif: true
};

export const fallbackPageHeroes: PageHeroContent[] = [
  {
    page_key: "koleksi",
    label: "KOLEKSI",
    title: "Layanan & Produk DEBRODER",
    subtitle:
      "Temukan kebutuhan apparel, sablon, jersey, dan layanan custom dalam satu tempat.",
    image_url: fallbackImages.pageHero,
    object_position: "center center",
    status_aktif: true
  },
  {
    page_key: "kaos-polos",
    label: "KAOS POLOS",
    title: "Kaos Polos Import & Cotton Combed",
    subtitle:
      "Pilihan kaos polos untuk brand, komunitas, event, dan kebutuhan harian.",
    image_url: fallbackImages.pageHero,
    object_position: "center center",
    status_aktif: true
  },
  {
    page_key: "sablon-dtf",
    label: "SABLON DTF",
    title: "Sablon DTF untuk Apparel Custom",
    subtitle:
      "Hasil sablon rapi untuk logo, desain brand, komunitas, dan produksi apparel.",
    image_url: fallbackImages.pageHero,
    object_position: "center center",
    status_aktif: true
  },
  {
    page_key: "jersey",
    label: "CUSTOM JERSEY",
    title: "Jersey Custom untuk Tim dan Komunitas",
    subtitle:
      "Produksi jersey untuk tim olahraga, sekolah, instansi, dan event.",
    image_url: fallbackImages.pageHero,
    object_position: "center center",
    status_aktif: true
  },
  {
    page_key: "express",
    label: "DEBRODER EXPRESS",
    title: "Layanan Pengiriman dan Distribusi",
    subtitle:
      "Mendukung kebutuhan pengiriman pesanan dan distribusi bisnis DEBRODER.",
    image_url: fallbackImages.pageHero,
    object_position: "center center",
    status_aktif: true
  },
  {
    page_key: "store",
    label: "STORE DEBRODER",
    title: "Temukan Store DEBRODER Terdekat",
    subtitle: "Pettarani, Tello, Landak, dan Parepare.",
    image_url: fallbackImages.pageHero,
    object_position: "center center",
    status_aktif: true
  }
];

export const fallbackOrderSteps: OrderStep[] = [
  {
    title: "Pilih layanan",
    description: "Tentukan kebutuhan apparel, sablon, jersey, atau express.",
    urutan: 1,
    status_aktif: true
  },
  {
    title: "Konsultasi kebutuhan",
    description: "Diskusikan bahan, desain, jumlah, ukuran, dan estimasi.",
    urutan: 2,
    status_aktif: true
  },
  {
    title: "Kirim desain/detail",
    description: "Kirim file, logo, referensi, atau detail pesanan.",
    urutan: 3,
    status_aktif: true
  },
  {
    title: "Proses produksi",
    description: "Pesanan diproses sesuai detail yang disepakati.",
    urutan: 4,
    status_aktif: true
  },
  {
    title: "Ambil di store atau kirim",
    description: "Ambil di store DEBRODER atau kirim sesuai kebutuhan.",
    urutan: 5,
    status_aktif: true
  }
];

export const fallbackTrustAbout: TrustAboutContent = {
  trust_items: [
    "4 Store Aktif",
    "Apparel & Custom",
    "Sablon DTF",
    "Jersey Custom",
    "DEBRODER Express"
  ],
  about_body: fallbackAbout.body,
  status_aktif: true
};

export const fallbackTestimonials: Testimonial[] = [
  {
    nama: "Komunitas Olahraga Makassar",
    sumber: "Custom jersey",
    isi_testimoni:
      "Pesanan jersey rapi, komunikasinya jelas, dan hasilnya sesuai kebutuhan tim.",
    urutan: 1,
    status_aktif: true
  }
];

export const fallbackContact: ContactSettings = {
  email: "debroderapparel@gmail.com",
  whatsapp_utama: "0853-5533-3364",
  whatsapp_link: contactLinks.whatsapp,
  whatsapp_apparel: "0853-5533-3364",
  whatsapp_express: "0853-5533-3364",
  facebook: contactLinks.facebook,
  instagram: contactLinks.instagram,
  copyright_text: "\u00a9 2026 DEBRODER. All rights reserved.",
  status_aktif: true
};

export const fallbackContent: PublicContent = {
  hero: fallbackHero,
  heroes: fallbackHeroes,
  about: fallbackAbout,
  instagramBanner: fallbackInstagramBanner,
  pageHeroes: fallbackPageHeroes,
  categories: fallbackCategories,
  products: fallbackProducts,
  stores: fallbackStores,
  orderSteps: fallbackOrderSteps,
  trustAbout: fallbackTrustAbout,
  testimonials: fallbackTestimonials,
  contact: fallbackContact
};
