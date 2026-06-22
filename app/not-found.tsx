import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-brand-offWhite px-4 py-10 text-brand-charcoal">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-2xl place-items-center">
        <section className="w-full rounded-[32px] border border-brand-softGray bg-white p-8 text-center shadow-soft sm:p-12">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-green text-sm font-black text-white">
            DB
          </span>
          <p className="mt-8 text-sm font-black uppercase tracking-[0.24em] text-brand-green">
            DEBRODER
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight">
            Halaman tidak ditemukan
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-brand-charcoal/65">
            Halaman yang Anda buka tidak tersedia atau sudah berpindah alamat.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-brand-green px-7 py-4 text-sm font-black text-white transition hover:bg-brand-deep"
          >
            Kembali ke Beranda
          </Link>
        </section>
      </div>
    </main>
  );
}
