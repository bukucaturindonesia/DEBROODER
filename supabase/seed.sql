insert into public.products
  (nama, kategori, deskripsi, short_detail, badge, gambar_url, image_url, whatsapp_link, link_url, price, urutan, status_aktif)
values
  ('Kaos Polos Cotton Combed', 'Kaos Polos', 'Kaos polos import dan cotton combed', 'Kaos polos import dan cotton combed', '', '/images/debroder/products/kaos-polos.jpg', '/images/debroder/products/kaos-polos.jpg', 'https://wa.me/6285355333364', '/kaos-polos', 45000, 1, true),
  ('Sablon DTF Custom', 'Sablon DTF', 'Sablon DTF untuk logo, brand, dan komunitas', 'Sablon DTF untuk logo, brand, dan komunitas', '', '/images/debroder/products/sablon-dtf.jpg', '/images/debroder/products/sablon-dtf.jpg', 'https://wa.me/6285355333364', '/sablon-dtf', 15000, 2, true),
  ('Custom Jersey', 'Jersey', 'Jersey custom untuk tim dan komunitas', 'Jersey custom untuk tim dan komunitas', '', '/images/debroder/products/custom-jersey.jpg', '/images/debroder/products/custom-jersey.jpg', 'https://wa.me/6285355333364', '/jersey', 85000, 3, true),
  ('Maklon DTF', 'Maklon DTF', 'Produksi DTF untuk reseller dan brand apparel', 'Produksi DTF untuk reseller dan brand apparel', '', '/images/debroder/products/maklon-dtf.jpg', '/images/debroder/products/maklon-dtf.jpg', 'https://wa.me/6285355333364', '/maklon-dtf', 12000, 4, true),
  ('Cetak Sublim', 'Cetak Sublim', 'Cetak sublim untuk jersey dan apparel custom', 'Cetak sublim untuk jersey dan apparel custom', '', '/images/debroder/products/cetak-sublim.jpg', '/images/debroder/products/cetak-sublim.jpg', 'https://wa.me/6285355333364', '/cetak-sublim', 35000, 5, true),
  ('DEBRODER Express', 'Express', 'Pengiriman dan distribusi pesanan', 'Pengiriman dan distribusi pesanan', '', '/images/debroder/products/debroder-express.jpg', '/images/debroder/products/debroder-express.jpg', 'https://wa.me/6285355333364', '/express', null, 6, true)
on conflict do nothing;

insert into public.service_categories
  (nama_kategori, deskripsi, gambar_url, link_slug, urutan, status_aktif)
values
  ('Kaos Polos', 'Kaos polos import dan cotton combed', '/images/debroder/products/kaos-polos.jpg', 'kaos-polos', 1, true),
  ('Sablon DTF', 'Sablon kaos, logo, komunitas, dan brand', '/images/debroder/products/sablon-dtf.jpg', 'sablon-dtf', 2, true),
  ('Custom Jersey', 'Jersey tim, komunitas, sekolah, dan instansi', '/images/debroder/products/custom-jersey.jpg', 'jersey', 3, true),
  ('Maklon DTF', 'Layanan produksi DTF untuk kebutuhan bisnis', '/images/debroder/products/maklon-dtf.jpg', 'maklon-dtf', 4, true),
  ('Cetak Sublim', 'Cetak sublim untuk apparel dan jersey', '/images/debroder/products/cetak-sublim.jpg', 'cetak-sublim', 5, true),
  ('DEBRODER Express', 'Pengiriman dan distribusi pesanan', '/images/debroder/products/debroder-express.jpg', 'express', 6, true)
on conflict do nothing;

insert into public.stores
  (nama_store, layanan_utama, alamat, whatsapp, whatsapp_link, maps_link, image_url, urutan, status_aktif)
values
  ('STORE PETTARANI', 'Sablon Kaos dan Jersey', 'Jl. AP Pettarani, Ruko New Zamrud Blok G No.7', '0853-5533-3364', 'https://wa.me/6285355333364', 'https://www.google.com/maps/search/?api=1&query=Jl.%20AP%20Pettarani%2C%20Ruko%20New%20Zamrud%20Blok%20G%20No.7%20Makassar', '/images/debroder/stores/store-pettarani.jpg', 1, true),
  ('STORE TELLO', 'Cetak DTF dan Sablon Kaos', 'Jl. Urip Sumoharjo, Depan PLTU', '0812-4400-3505', 'https://wa.me/6281244003505', 'https://www.google.com/maps/search/?api=1&query=Jl.%20Urip%20Sumoharjo%20Depan%20PLTU%20Makassar', '/images/debroder/stores/store-tello.jpg', 2, true),
  ('STORE LANDAK', 'Cetak DTF dan Jersey', 'Jl. Andy Djemma LR 8B No.108', '0811-4470-1984', 'https://wa.me/6281144701984', 'https://www.google.com/maps/search/?api=1&query=Jl.%20Andy%20Djemma%20LR%208B%20No.108%20Makassar', '/images/debroder/stores/store-landak.jpg', 3, true),
  ('STORE PAREPARE', 'Cetak DTF, Sablon, dan Kaos Polos', 'Jl. Lorong 3 No.10, Sumpang Minangae, belakang Warkop Chilos, Parepare', '0821-5658-8066', 'https://wa.me/6282156588066', 'https://www.google.com/maps/search/?api=1&query=Jl.%20Lorong%203%20No.10%20Sumpang%20Minangae%20Belakang%20Warkop%20Chilos%20Parepare', '/images/debroder/stores/store-parepare.jpg', 4, true)
on conflict do nothing;

insert into public.hero_banners
  (badge, headline, subheadline, title, subtitle, cta_primary_text, cta_primary_link, cta_secondary_text, cta_secondary_link, cta_text, cta_link, image_url, object_position, urutan, status_aktif)
values
  ('KAOS POLOS IMPORT', 'KAOS POLOS IMPORT', 'Sablon DTF, Jersey, dan Custom Apparel', 'KAOS POLOS IMPORT', 'Sablon DTF, Jersey, dan Custom Apparel', 'Beli Sekarang', '/koleksi', '', '', 'Beli Sekarang', '/koleksi', '/images/debroder/hero/hero-home.jpg', 'center center', 1, true)
on conflict do nothing;

insert into public.instagram_banners
  (title, image_url, link_url, status_aktif)
values
  ('Instagram DEBRODER', '/images/debroder/banners/instagram-banner.jpg', 'https://instagram.com/de_broder', true)
on conflict do nothing;

insert into public.page_heroes
  (page_key, label, title, subtitle, image_url, object_position, status_aktif)
values
  ('koleksi', 'KOLEKSI', 'Layanan & Produk DEBRODER', 'Temukan kebutuhan apparel, sablon, jersey, dan layanan custom dalam satu tempat.', '/images/debroder/hero/page-hero.jpg', 'center center', true),
  ('kaos-polos', 'KAOS POLOS', 'Kaos Polos Import & Cotton Combed', 'Pilihan kaos polos untuk brand, komunitas, event, dan kebutuhan harian.', '/images/debroder/hero/page-hero.jpg', 'center center', true),
  ('sablon-dtf', 'SABLON DTF', 'Sablon DTF untuk Apparel Custom', 'Hasil sablon rapi untuk logo, desain brand, komunitas, dan produksi apparel.', '/images/debroder/hero/page-hero.jpg', 'center center', true),
  ('jersey', 'CUSTOM JERSEY', 'Jersey Custom untuk Tim dan Komunitas', 'Produksi jersey untuk tim olahraga, sekolah, instansi, dan event.', '/images/debroder/hero/page-hero.jpg', 'center center', true),
  ('express', 'DEBRODER EXPRESS', 'Layanan Pengiriman dan Distribusi', 'Mendukung kebutuhan pengiriman pesanan dan distribusi bisnis DEBRODER.', '/images/debroder/hero/page-hero.jpg', 'center center', true),
  ('store', 'STORE DEBRODER', 'Temukan Store DEBRODER Terdekat', 'Pettarani, Tello, Landak, dan Parepare.', '/images/debroder/hero/page-hero.jpg', 'center center', true)
on conflict (page_key) do nothing;

insert into public.order_steps
  (title, description, urutan, status_aktif)
values
  ('Pilih layanan', 'Tentukan kebutuhan apparel, sablon, jersey, atau express.', 1, true),
  ('Konsultasi kebutuhan', 'Diskusikan bahan, desain, jumlah, ukuran, dan estimasi.', 2, true),
  ('Kirim desain/detail', 'Kirim file, logo, referensi, atau detail pesanan.', 3, true),
  ('Proses produksi', 'Pesanan diproses sesuai detail yang disepakati.', 4, true),
  ('Ambil di store atau kirim', 'Ambil di store DEBRODER atau kirim sesuai kebutuhan.', 5, true)
on conflict do nothing;

insert into public.trust_about_content
  (trust_items, about_body, status_aktif)
values
  (array['4 Store Aktif', 'Apparel & Custom', 'Sablon DTF', 'Jersey Custom', 'DEBRODER Express'], 'DEBRODER adalah brand yang bergerak dalam ekosistem apparel dan layanan bisnis pendukung. Melalui DEBRODER Apparel dan DEBRODER Express, DEBRODER hadir untuk memberikan solusi kaos polos, sablon DTF, custom jersey, produksi apparel, dan layanan pengiriman yang lebih mudah dijangkau pelanggan.

DEBRODER melayani kebutuhan individu, komunitas, brand, event, sekolah, instansi, hingga perusahaan melalui beberapa store yang tersebar di Pettarani, Tello, Landak, dan Parepare.', true)
on conflict do nothing;

insert into public.contact_settings
  (email, whatsapp_utama, whatsapp_link, whatsapp_apparel, whatsapp_express, facebook, instagram, copyright_text, status_aktif)
values
  ('debroderapparel@gmail.com', '0853-5533-3364', 'https://wa.me/6285355333364', '0853-5533-3364', '0853-5533-3364', 'https://www.facebook.com/debroderapparel/', 'https://instagram.com/de_broder', '© 2026 DEBRODER. All rights reserved.', true)
on conflict do nothing;
