export type Product = {
  id?: string;
  nama: string;
  kategori: string;
  deskripsi: string;
  badge: string;
  gambar_url: string;
  whatsapp_link: string;
  urutan: number;
  status_aktif: boolean;
  created_at?: string;
  updated_at?: string;
};

export type ServiceCategory = {
  id?: string;
  nama_kategori: string;
  deskripsi: string;
  gambar_url: string;
  link_slug: string;
  urutan: number;
  status_aktif: boolean;
  created_at?: string;
  updated_at?: string;
};

export type Store = {
  id?: string;
  nama_store: string;
  layanan_utama: string;
  alamat: string;
  whatsapp: string;
  whatsapp_link: string;
  maps_link: string;
  urutan: number;
  status_aktif: boolean;
  created_at?: string;
  updated_at?: string;
};

export type HeroBanner = {
  id?: string;
  headline: string;
  subheadline: string;
  cta_primary_text: string;
  cta_primary_link: string;
  cta_secondary_text: string;
  cta_secondary_link: string;
  image_url: string;
  status_aktif: boolean;
  created_at?: string;
  updated_at?: string;
};

export type AboutContent = {
  id?: string;
  label: string;
  title: string;
  body: string;
  highlights: string[];
  status_aktif: boolean;
  updated_at?: string;
};

export type Testimonial = {
  id?: string;
  nama: string;
  sumber: string;
  isi_testimoni: string;
  status_aktif: boolean;
  created_at?: string;
  updated_at?: string;
};

export type ContactSettings = {
  id?: string;
  email: string;
  whatsapp_utama: string;
  whatsapp_apparel: string;
  whatsapp_express: string;
  instagram: string;
  status_aktif?: boolean;
  updated_at?: string;
};

export type PublicContent = {
  hero: HeroBanner;
  about: AboutContent;
  categories: ServiceCategory[];
  products: Product[];
  stores: Store[];
  testimonials: Testimonial[];
  contact: ContactSettings;
};
