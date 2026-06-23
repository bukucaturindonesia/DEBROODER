insert into public.products
  (nama, kategori, deskripsi, badge, gambar_url, whatsapp_link, urutan, status_aktif)
values
  ('Kaos Polos Premium', 'Kaos Polos', 'Kaos polos untuk sablon, komunitas, brand clothing, dan kebutuhan partai.', 'Populer', '/images/debroder-hero.png', 'https://wa.me/6285355333364?text=Halo%20DEBRODER%2C%20saya%20ingin%20bertanya%20tentang%20Kaos%20Polos%20Premium.', 1, true),
  ('Sablon DTF Custom', 'Sablon DTF', 'Layanan sablon DTF untuk kaos custom, event, komunitas, dan produksi pakaian.', 'Custom', '/images/debroder-hero.png', 'https://wa.me/6285355333364?text=Halo%20DEBRODER%2C%20saya%20ingin%20bertanya%20tentang%20Sablon%20DTF%20Custom.', 2, true),
  ('Custom Jersey Team', 'Jersey', 'Pembuatan jersey untuk tim olahraga, sekolah, kantor, dan komunitas.', 'Jersey', '/images/debroder-hero.png', 'https://wa.me/6285355333364?text=Halo%20DEBRODER%2C%20saya%20ingin%20bertanya%20tentang%20Custom%20Jersey%20Team.', 3, true),
  ('Maklon DTF', 'Maklon', 'Layanan maklon DTF untuk kebutuhan produksi, reseller, dan brand apparel.', 'Maklon', '/images/debroder-hero.png', 'https://wa.me/6285355333364?text=Halo%20DEBRODER%2C%20saya%20ingin%20bertanya%20tentang%20Maklon%20DTF.', 4, true),
  ('Cetak Sublim', 'Sublim', 'Layanan cetak sublim untuk jersey dan apparel custom.', 'Sublim', '/images/debroder-hero.png', 'https://wa.me/6285355333364?text=Halo%20DEBRODER%2C%20saya%20ingin%20bertanya%20tentang%20Cetak%20Sublim.', 5, true),
  ('Paket Apparel Komunitas', 'Paket', 'Paket apparel untuk komunitas, event, brand, instansi, dan perusahaan.', 'Paket', '/images/debroder-hero.png', 'https://wa.me/6285355333364?text=Halo%20DEBRODER%2C%20saya%20ingin%20bertanya%20tentang%20Paket%20Apparel%20Komunitas.', 6, true)
on conflict do nothing;

insert into public.service_categories
  (nama_kategori, deskripsi, gambar_url, link_slug, urutan, status_aktif)
values
  ('Sablon Kaos', 'Layanan sablon kaos untuk komunitas, event, brand, instansi, dan perusahaan.', '/images/debroder-hero.png', 'sablon-dtf', 1, true),
  ('Sablon DTF', 'Layanan sablon DTF untuk kaos custom, produksi pakaian, brand clothing, dan kebutuhan partai.', '/images/debroder-hero.png', 'sablon-dtf', 2, true),
  ('Custom Jersey', 'Pembuatan jersey custom untuk tim olahraga, sekolah, kantor, komunitas, dan event.', '/images/debroder-hero.png', 'jersey', 3, true),
  ('Maklon DTF', 'Layanan maklon DTF untuk kebutuhan produksi, reseller, dan brand apparel.', '/images/debroder-hero.png', 'maklon-dtf', 4, true),
  ('Cetak Sublim', 'Layanan cetak sublim untuk jersey, apparel custom, dan kebutuhan produksi kreatif.', '/images/debroder-hero.png', 'cetak-sublim', 5, true),
  ('Kaos Polos & Cotton Combed', 'Penyediaan kaos polos, kaos NSA, dan kaos cotton combed untuk sablon, brand clothing, komunitas, dan pembelian partai.', '/images/debroder-hero.png', 'kaos-polos', 6, true),
  ('DEBRODER Express', 'Layanan pengiriman dan distribusi untuk mendukung kebutuhan pelanggan dan operasional bisnis.', '/images/debroder-hero.png', 'express', 7, true)
on conflict do nothing;

insert into public.stores
  (nama_store, layanan_utama, alamat, whatsapp, whatsapp_link, maps_link, urutan, status_aktif)
values
  ('STORE PETTARANI', 'Sablon Kaos dan Jersey', 'Jl. AP Pettarani, Ruko New Zamrud Blok G No.7', '0853-5533-3364', 'https://wa.me/6285355333364?text=Halo%20DEBRODER%20Pettarani%2C%20saya%20ingin%20bertanya%20tentang%20sablon%20kaos%20dan%20jersey.', 'https://www.google.com/maps/search/?api=1&query=Jl.%20AP%20Pettarani%2C%20Ruko%20New%20Zamrud%20Blok%20G%20No.7%20Makassar', 1, true),
  ('STORE TELLO', 'Cetak DTF dan Sablon Kaos', 'Jl. Urip Sumoharjo, Depan PLTU', '0812-4400-3505', 'https://wa.me/6281244003505?text=Halo%20DEBRODER%20Tello%2C%20saya%20ingin%20bertanya%20tentang%20cetak%20DTF%20dan%20sablon%20kaos.', 'https://www.google.com/maps/search/?api=1&query=Jl.%20Urip%20Sumoharjo%20Depan%20PLTU%20Makassar', 2, true),
  ('STORE LANDAK', 'Cetak DTF dan Jersey', 'Jl. Andy Djemma LR 8B No.108', '0811-4470-1984', 'https://wa.me/6281144701984?text=Halo%20DEBRODER%20Landak%2C%20saya%20ingin%20bertanya%20tentang%20cetak%20DTF%20dan%20jersey.', 'https://www.google.com/maps/search/?api=1&query=Jl.%20Andy%20Djemma%20LR%208B%20No.108%20Makassar', 3, true),
  ('STORE PAREPARE', 'Cetak DTF, Sablon, dan Kaos Polos', 'Jl. Lorong 3 No.10, Sumpang Minangae, belakang Warkop Chilos, Parepare', '0821-5658-8066', 'https://wa.me/6282156588066?text=Halo%20DEBRODER%20Parepare%2C%20saya%20ingin%20bertanya%20tentang%20cetak%20DTF%2C%20sablon%2C%20dan%20kaos%20polos.', 'https://www.google.com/maps/search/?api=1&query=Jl.%20Lorong%203%20No.10%20Sumpang%20Minangae%20Belakang%20Warkop%20Chilos%20Parepare', 4, true)
on conflict do nothing;

insert into public.hero_banners
  (badge, headline, subheadline, cta_primary_text, cta_primary_link, cta_secondary_text, cta_secondary_link, image_url, urutan, status_aktif)
values
  ('KAOS POLOS IMPORT & SABLON', 'Kaos Polos, Sablon DTF, dan Jersey Custom', 'DEBRODER menyediakan kebutuhan apparel, sablon, jersey, dan layanan pengiriman dalam satu ekosistem bisnis yang mudah dijangkau.', 'Mulai Pesan', 'https://wa.me/6285355333364?text=Halo%20DEBRODER%2C%20saya%20ingin%20bertanya%20tentang%20kaos%20polos%2C%20sablon%20DTF%2C%20dan%20jersey%20custom', 'Lihat Koleksi', '/koleksi', '/images/debroder-hero.png', 1, true),
  ('PRODUKSI APPAREL', 'Produksi Apparel untuk Komunitas, Event, dan Perusahaan', 'Dari kaos polos, sablon DTF, jersey, hingga kebutuhan partai, DEBRODER siap membantu produksi apparel Anda dengan proses yang mudah.', 'Konsultasi Sekarang', 'https://wa.me/6285355333364?text=Halo%20DEBRODER%2C%20saya%20ingin%20konsultasi%20produksi%20apparel%20untuk%20komunitas%2C%20event%2C%20atau%20perusahaan', 'Lihat Store', '/store', '/images/debroder-hero.png', 2, true),
  ('CUSTOM JERSEY', 'Custom Jersey untuk Tim, Komunitas, dan Instansi', 'Buat jersey custom untuk tim olahraga, sekolah, kantor, komunitas, dan event dengan desain yang sesuai kebutuhan Anda.', 'Pesan Jersey', 'https://wa.me/6285355333364?text=Halo%20DEBRODER%2C%20saya%20ingin%20bertanya%20tentang%20custom%20jersey', 'Lihat Detail', '/jersey', '/images/debroder-hero.png', 3, true)
on conflict do nothing;

insert into public.about_content
  (label, title, body, highlights, status_aktif)
values
  ('TENTANG KAMI', 'Tentang DEBRODER', 'DEBRODER adalah perusahaan percetakan dan apparel yang berdiri sejak tahun 2016. Kami berfokus pada layanan sablon kaos, custom jersey, maklon DTF, cetak sublim, distribusi kaos NSA, dan penyediaan kaos cotton combed.

Dengan pengalaman dan komitmen terhadap kualitas, DEBRODER telah dipercaya oleh berbagai perusahaan, instansi, komunitas, dan event besar di Indonesia Timur, khususnya di kota Makassar.', array['Berdiri sejak 2016', 'Melayani perusahaan, instansi, komunitas, dan event', 'Fokus layanan di Indonesia Timur', 'Berbasis di Makassar'], true)
on conflict do nothing;

insert into public.testimonials
  (nama, sumber, isi_testimoni, urutan, status_aktif)
values
  ('Komunitas Olahraga Makassar', 'Custom jersey', 'Pesanan jersey rapi, komunikasinya jelas, dan hasilnya sesuai kebutuhan tim.', 1, true),
  ('Brand Lokal Indonesia Timur', 'Sablon DTF', 'DEBRODER membantu produksi kaos custom kami dengan proses yang mudah dipantau.', 2, true),
  ('Event Organizer', 'Paket apparel', 'Pilihan kaos dan sablon cocok untuk kebutuhan event dengan jumlah banyak.', 3, true)
on conflict do nothing;

insert into public.contact_settings
  (email, whatsapp_utama, whatsapp_link, whatsapp_apparel, whatsapp_express, facebook, instagram, status_aktif)
values
  ('debroderapparel@gmail.com', '0853-5533-3364', 'https://wa.me/6285355333364', '0853-5533-3364', '0853-5533-3364', 'https://www.facebook.com/debroderapparel/', 'https://instagram.com/de_broder', true)
on conflict do nothing;
