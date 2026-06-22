# DEBRODER Official Website

Website resmi DEBRODER berbasis Next.js App Router, TypeScript, Tailwind CSS, dan Supabase untuk fitur Super Admin.

## Menjalankan Project

```bash
pnpm install
pnpm dev
```

## 1. Membuat Project Supabase

1. Buka Supabase dan buat project baru.
2. Simpan Project URL dan anon public key dari menu API.
3. Jangan gunakan service role key di frontend.

## 2. Environment Supabase

Salin `.env.example` menjadi `.env.local`, lalu isi:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Website publik tetap berjalan memakai fallback data statis jika Supabase belum dikonfigurasi atau data Supabase kosong.

## 3. Environment di Vercel

Tambahkan environment variables yang sama di Vercel:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## 4. Menjalankan Schema SQL

1. Buat project Supabase.
2. Buka SQL Editor di Supabase.
3. Jalankan isi `supabase/schema.sql`.

## 5. Menjalankan Seed Data

Jalankan isi `supabase/seed.sql` di SQL Editor setelah schema selesai dibuat.

## 6. Membuat User Superadmin

1. Buat user melalui Supabase Auth.
2. Ambil UUID user dari tabel `auth.users`.
3. Jalankan SQL berikut untuk membuat atau mengubah role user menjadi `superadmin`:

```sql
insert into public.profiles (id, email, role)
values ('USER_UUID_DARI_AUTH', 'email@domain.com', 'superadmin')
on conflict (id) do update set role = 'superadmin';
```

Login admin tersedia di `/admin/login`. Dashboard tersedia di `/admin/dashboard` dan hanya bisa diakses user dengan role `superadmin`.

## 7. Deploy Ulang ke Vercel

Setelah schema, seed, dan env Vercel siap, redeploy project dari dashboard Vercel atau push commit baru ke repository.

## Build Production

```bash
pnpm build
pnpm start
```

## Deploy ke Vercel

1. Upload repository/project ini ke Git provider.
2. Import project di Vercel.
3. Tambahkan environment variables Supabase di Vercel.
4. Deploy.

Catatan: jangan pernah memasukkan Supabase service role key ke frontend atau environment publik.
