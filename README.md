# DEBRODER Official Website

Website resmi DEBRODER berbasis Next.js App Router, TypeScript, Tailwind CSS, dan Supabase untuk fitur Super Admin.

## Menjalankan Project

```bash
pnpm install
pnpm dev
```

## Environment Supabase

Salin `.env.example` menjadi `.env.local`, lalu isi:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Website publik tetap berjalan memakai fallback data statis jika Supabase belum dikonfigurasi atau data Supabase kosong.

## Setup Database

1. Buat project Supabase.
2. Buka SQL Editor di Supabase.
3. Jalankan isi `supabase/schema.sql`.
4. Jalankan isi `supabase/seed.sql`.

## Membuat User Superadmin

1. Buat user melalui Supabase Auth.
2. Ambil UUID user dari tabel `auth.users`.
3. Jalankan SQL berikut di SQL Editor:

```sql
insert into public.profiles (id, email, role)
values ('USER_UUID_DARI_AUTH', 'email@domain.com', 'superadmin')
on conflict (id) do update set role = 'superadmin';
```

Login admin tersedia di `/admin/login`. Dashboard tersedia di `/admin/dashboard` dan hanya bisa diakses user dengan role `superadmin`.

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
