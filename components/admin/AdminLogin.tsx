"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

export function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const configured = isSupabaseConfigured();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const supabase = createSupabaseClient();
    if (!supabase) {
      setError("Supabase belum dikonfigurasi.");
      return;
    }

    setIsLoading(true);
    const { data, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password
      });

    if (loginError || !data.user) {
      setIsLoading(false);
      setError(loginError?.message || "Login gagal.");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle();

    if (profile?.role !== "superadmin") {
      await supabase.auth.signOut();
      setIsLoading(false);
      setError("Akses ditolak. Akun ini bukan superadmin.");
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-brand-offWhite px-4 py-10 text-brand-charcoal">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-md items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-[32px] border border-brand-softGray bg-white p-6 shadow-soft sm:p-8"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-green text-sm font-black text-white">
              DB
            </span>
            <div>
              <p className="text-sm font-black tracking-[0.22em] text-brand-green">
                DEBRODER
              </p>
              <p className="text-xs font-bold text-brand-charcoal/60">
                Super Admin
              </p>
            </div>
          </div>

          <h1 className="mt-8 text-3xl font-black">Login Super Admin</h1>
          <p className="mt-3 text-sm leading-6 text-brand-charcoal/65">
            Login ini hanya untuk pengelola konten website DEBRODER.
          </p>

          {!configured ? (
            <div className="mt-5 rounded-2xl bg-brand-offWhite p-4 text-sm font-semibold leading-6 text-brand-charcoal/70">
              Supabase belum aktif. Isi `NEXT_PUBLIC_SUPABASE_URL` dan
              `NEXT_PUBLIC_SUPABASE_ANON_KEY` untuk memakai login admin.
            </div>
          ) : null}

          <label className="mt-6 block text-sm font-black">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-brand-softGray px-4 py-3 text-base outline-none transition focus:border-brand-green"
              required
            />
          </label>

          <label className="mt-4 block text-sm font-black">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-brand-softGray px-4 py-3 text-base outline-none transition focus:border-brand-green"
              required
            />
          </label>

          {error ? (
            <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isLoading || !configured}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand-green px-6 py-4 text-sm font-black text-white transition hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Memproses..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
