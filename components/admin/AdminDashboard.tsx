"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { createSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

type FieldType = "text" | "textarea" | "number" | "boolean" | "list";
type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
};
type TableConfig = {
  key: string;
  label: string;
  table: string;
  description: string;
  orderField?: string;
  fields: FieldConfig[];
};
type AdminValue = string | number | boolean | string[] | null | undefined;
type AdminRow = Record<string, AdminValue> & { id?: string };

const tableConfigs: TableConfig[] = [
  {
    key: "overview",
    label: "Overview",
    table: "",
    description: "Ringkasan area pengelolaan website DEBRODER.",
    fields: []
  },
  {
    key: "products",
    label: "Kelola Produk & Layanan",
    table: "products",
    description: "Produk dan layanan populer di landing page dan koleksi.",
    orderField: "urutan",
    fields: [
      { name: "nama", label: "Nama", type: "text" },
      { name: "kategori", label: "Kategori", type: "text" },
      { name: "deskripsi", label: "Deskripsi", type: "textarea" },
      { name: "badge", label: "Badge", type: "text" },
      { name: "gambar_url", label: "Gambar URL", type: "text" },
      { name: "whatsapp_link", label: "WhatsApp Link", type: "text" },
      { name: "urutan", label: "Urutan", type: "number" },
      { name: "status_aktif", label: "Aktif", type: "boolean" }
    ]
  },
  {
    key: "categories",
    label: "Kelola Kategori Layanan",
    table: "service_categories",
    description: "Kategori layanan untuk menu koleksi dan halaman publik.",
    orderField: "urutan",
    fields: [
      { name: "nama_kategori", label: "Nama Kategori", type: "text" },
      { name: "deskripsi", label: "Deskripsi", type: "textarea" },
      { name: "gambar_url", label: "Gambar URL", type: "text" },
      { name: "link_slug", label: "Link Slug", type: "text" },
      { name: "urutan", label: "Urutan", type: "number" },
      { name: "status_aktif", label: "Aktif", type: "boolean" }
    ]
  },
  {
    key: "stores",
    label: "Kelola Store",
    table: "stores",
    description: "Store DEBRODER Apparel, WhatsApp, dan Google Maps.",
    orderField: "urutan",
    fields: [
      { name: "nama_store", label: "Nama Store", type: "text" },
      { name: "layanan_utama", label: "Layanan Utama", type: "text" },
      { name: "alamat", label: "Alamat", type: "textarea" },
      { name: "whatsapp", label: "WhatsApp", type: "text" },
      { name: "whatsapp_link", label: "WhatsApp Link", type: "text" },
      { name: "maps_link", label: "Maps Link", type: "text" },
      { name: "urutan", label: "Urutan", type: "number" },
      { name: "status_aktif", label: "Aktif", type: "boolean" }
    ]
  },
  {
    key: "hero",
    label: "Kelola Hero Banner",
    table: "hero_banners",
    description: "Headline, CTA, dan visual hero landing page.",
    fields: [
      { name: "headline", label: "Headline", type: "text" },
      { name: "subheadline", label: "Subheadline", type: "textarea" },
      { name: "cta_primary_text", label: "CTA Primary Text", type: "text" },
      { name: "cta_primary_link", label: "CTA Primary Link", type: "text" },
      { name: "cta_secondary_text", label: "CTA Secondary Text", type: "text" },
      { name: "cta_secondary_link", label: "CTA Secondary Link", type: "text" },
      { name: "image_url", label: "Image URL", type: "text" },
      { name: "status_aktif", label: "Aktif", type: "boolean" }
    ]
  },
  {
    key: "about",
    label: "Kelola Tentang Kami",
    table: "about_content",
    description: "Konten Tentang Kami dan highlights.",
    fields: [
      { name: "label", label: "Label", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "body", label: "Body", type: "textarea" },
      { name: "highlights", label: "Highlights", type: "list" },
      { name: "status_aktif", label: "Aktif", type: "boolean" }
    ]
  },
  {
    key: "testimonials",
    label: "Kelola Testimoni",
    table: "testimonials",
    description: "Testimoni pelanggan yang tampil di landing page.",
    fields: [
      { name: "nama", label: "Nama", type: "text" },
      { name: "sumber", label: "Sumber", type: "text" },
      { name: "isi_testimoni", label: "Isi Testimoni", type: "textarea" },
      { name: "status_aktif", label: "Aktif", type: "boolean" }
    ]
  },
  {
    key: "contact",
    label: "Kelola Kontak",
    table: "contact_settings",
    description: "Email, WhatsApp utama, WhatsApp unit bisnis, dan Instagram.",
    fields: [
      { name: "email", label: "Email", type: "text" },
      { name: "whatsapp_utama", label: "WhatsApp Utama", type: "text" },
      { name: "whatsapp_apparel", label: "WhatsApp Apparel", type: "text" },
      { name: "whatsapp_express", label: "WhatsApp Express", type: "text" },
      { name: "instagram", label: "Instagram", type: "text" },
      { name: "status_aktif", label: "Aktif", type: "boolean" }
    ]
  }
];

function emptyForm(fields: FieldConfig[]) {
  return fields.reduce<AdminRow>((acc, field) => {
    if (field.type === "boolean") acc[field.name] = true;
    else if (field.type === "number") acc[field.name] = 1;
    else if (field.type === "list") acc[field.name] = [];
    else acc[field.name] = "";
    return acc;
  }, {});
}

function valueToText(value: AdminValue) {
  if (Array.isArray(value)) return value.join("\n");
  if (typeof value === "boolean") return value ? "Aktif" : "Nonaktif";
  return value?.toString() || "";
}

export function AdminDashboard() {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState("overview");
  const [rows, setRows] = useState<AdminRow[]>([]);
  const [form, setForm] = useState<AdminRow>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState("Memeriksa akses...");
  const [isAllowed, setIsAllowed] = useState(false);
  const [isDenied, setIsDenied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const configured = isSupabaseConfigured();

  const activeConfig = useMemo(
    () =>
      tableConfigs.find((config) => config.key === activeKey) ||
      tableConfigs[0],
    [activeKey]
  );

  useEffect(() => {
    async function checkAccess() {
      if (!configured) {
        setStatus("Supabase belum dikonfigurasi.");
        setIsDenied(true);
        return;
      }

      const supabase = createSupabaseClient();
      if (!supabase) return;

      const { data } = await supabase.auth.getSession();
      if (!data.session?.user) {
        router.replace("/admin/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.session.user.id)
        .maybeSingle();

      if (profile?.role !== "superadmin") {
        setStatus("Akses ditolak. Akun ini bukan superadmin.");
        setIsDenied(true);
        return;
      }

      setIsAllowed(true);
      setStatus("");
    }

    checkAccess();
  }, [configured, router]);

  async function loadRows(config = activeConfig) {
    const supabase = createSupabaseClient();
    if (!supabase || !config.table) return;

    setIsLoading(true);
    let query = supabase.from(config.table).select("*");
    if (config.orderField) {
      query = query.order(config.orderField, { ascending: true });
    }
    const { data, error } = await query;
    setIsLoading(false);

    if (error) {
      setStatus(error.message);
      return;
    }

    setRows((data || []) as AdminRow[]);
  }

  useEffect(() => {
    setRows([]);
    setEditingId(null);
    setForm(emptyForm(activeConfig.fields));
    if (isAllowed && activeConfig.table) {
      loadRows(activeConfig);
    }
    // loadRows intentionally uses the latest active config and local setters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConfig, isAllowed]);

  function updateField(field: FieldConfig, value: string | boolean) {
    setForm((current) => {
      if (field.type === "boolean") {
        return { ...current, [field.name]: Boolean(value) };
      }
      if (field.type === "number") {
        return { ...current, [field.name]: Number(value) || 0 };
      }
      if (field.type === "list" && typeof value === "string") {
        return {
          ...current,
          [field.name]: value
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean)
        };
      }
      return { ...current, [field.name]: value };
    });
  }

  function startEdit(row: AdminRow) {
    setEditingId(row.id || null);
    setForm(row);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm(activeConfig.fields));
  }

  async function saveRow(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = createSupabaseClient();
    if (!supabase || !activeConfig.table) return;

    setIsLoading(true);
    const payload = { ...form, updated_at: new Date().toISOString() };
    const result = editingId
      ? await supabase
          .from(activeConfig.table)
          .update(payload)
          .eq("id", editingId)
      : await supabase.from(activeConfig.table).insert(payload);
    setIsLoading(false);

    if (result.error) {
      setStatus(result.error.message);
      return;
    }

    setStatus("Data tersimpan.");
    resetForm();
    loadRows();
  }

  async function deleteRow(row: AdminRow) {
    if (!row.id || !activeConfig.table) return;
    if (!window.confirm("Hapus data ini?")) return;

    const supabase = createSupabaseClient();
    if (!supabase) return;

    const { error } = await supabase
      .from(activeConfig.table)
      .delete()
      .eq("id", row.id);

    if (error) {
      setStatus(error.message);
      return;
    }

    setStatus("Data dihapus.");
    loadRows();
  }

  async function logout() {
    const supabase = createSupabaseClient();
    await supabase?.auth.signOut();
    router.replace("/admin/login");
  }

  if (!isAllowed) {
    return (
      <main className="min-h-screen bg-brand-offWhite p-6 text-brand-charcoal">
        <div className="mx-auto mt-20 max-w-lg rounded-[28px] border border-brand-softGray bg-white p-8 text-center shadow-soft">
          <h1 className="text-3xl font-black">
            {isDenied ? "Akses Ditolak" : "Memuat Dashboard"}
          </h1>
          <p className="mt-4 text-sm font-semibold text-brand-charcoal/65">
            {status}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-offWhite text-brand-charcoal">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <aside className="hidden min-h-screen border-r border-brand-softGray bg-white p-5 lg:block">
          <div className="flex items-center gap-3">
            <Logo variant="symbol-black" size="sm" />
            <div>
              <p className="font-black tracking-[0.18em] text-brand-green">
                DEBRODER
              </p>
              <p className="text-xs font-bold text-brand-charcoal/55">
                Super Admin
              </p>
            </div>
          </div>
          <nav className="mt-8 grid gap-2">
            {tableConfigs.map((config) => (
              <button
                key={config.key}
                type="button"
                onClick={() =>
                  config.key === "logout" ? logout() : setActiveKey(config.key)
                }
                className={`rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
                  activeKey === config.key
                    ? "bg-brand-green text-white"
                    : "hover:bg-brand-offWhite"
                }`}
              >
                {config.label}
              </button>
            ))}
            <button
              type="button"
              onClick={logout}
              className="rounded-2xl px-4 py-3 text-left text-sm font-black text-red-700 hover:bg-red-50"
            >
              Logout
            </button>
          </nav>
        </aside>

        <section className="p-4 sm:p-6 lg:p-8">
          <header className="rounded-[28px] border border-brand-softGray bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-brand-green">
                  Dashboard
                </p>
                <h1 className="mt-2 text-3xl font-black">
                  {activeConfig.label}
                </h1>
                <p className="mt-2 text-sm leading-6 text-brand-charcoal/65">
                  {activeConfig.description}
                </p>
              </div>
              <button
                type="button"
                onClick={logout}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-brand-softGray px-5 py-3 text-sm font-black text-brand-green"
              >
                Logout
              </button>
            </div>
            <select
              value={activeKey}
              onChange={(event) => setActiveKey(event.target.value)}
              className="mt-5 w-full rounded-2xl border border-brand-softGray px-4 py-3 text-sm font-black lg:hidden"
            >
              {tableConfigs.map((config) => (
                <option key={config.key} value={config.key}>
                  {config.label}
                </option>
              ))}
            </select>
          </header>

          {status ? (
            <p className="mt-5 rounded-2xl bg-white p-4 text-sm font-bold text-brand-green">
              {status}
            </p>
          ) : null}

          {activeKey === "overview" ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {tableConfigs
                .filter((config) => config.key !== "overview")
                .map((config) => (
                  <button
                    key={config.key}
                    type="button"
                    onClick={() => setActiveKey(config.key)}
                    className="rounded-[28px] border border-brand-softGray bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
                  >
                    <p className="text-xl font-black">{config.label}</p>
                    <p className="mt-3 text-sm leading-6 text-brand-charcoal/65">
                      {config.description}
                    </p>
                  </button>
                ))}
            </div>
          ) : (
            <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
              <form
                onSubmit={saveRow}
                className="rounded-[28px] border border-brand-softGray bg-white p-5 shadow-sm"
              >
                <h2 className="text-2xl font-black">
                  {editingId ? "Edit Data" : "Tambah Data"}
                </h2>
                <div className="mt-5 grid gap-4">
                  {activeConfig.fields.map((field) => (
                    <label key={field.name} className="text-sm font-black">
                      {field.label}
                      {field.type === "textarea" || field.type === "list" ? (
                        <textarea
                          value={valueToText(form[field.name])}
                          onChange={(event) =>
                            updateField(field, event.target.value)
                          }
                          rows={field.type === "list" ? 5 : 4}
                          className="mt-2 w-full rounded-2xl border border-brand-softGray px-4 py-3 text-sm font-semibold outline-none focus:border-brand-green"
                        />
                      ) : field.type === "boolean" ? (
                        <span className="mt-2 flex items-center gap-3 rounded-2xl border border-brand-softGray px-4 py-3">
                          <input
                            type="checkbox"
                            checked={Boolean(form[field.name])}
                            onChange={(event) =>
                              updateField(field, event.target.checked)
                            }
                          />
                          Aktif
                        </span>
                      ) : (
                        <input
                          type={field.type === "number" ? "number" : "text"}
                          value={valueToText(form[field.name])}
                          onChange={(event) =>
                            updateField(field, event.target.value)
                          }
                          className="mt-2 w-full rounded-2xl border border-brand-softGray px-4 py-3 text-sm font-semibold outline-none focus:border-brand-green"
                        />
                      )}
                    </label>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-green px-6 py-3 text-sm font-black text-white disabled:opacity-50"
                  >
                    {isLoading ? "Menyimpan..." : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-brand-softGray px-6 py-3 text-sm font-black text-brand-green"
                  >
                    Reset
                  </button>
                </div>
              </form>

              <div className="rounded-[28px] border border-brand-softGray bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-black">Data</h2>
                  <button
                    type="button"
                    onClick={() => loadRows()}
                    className="rounded-full border border-brand-softGray px-4 py-2 text-sm font-black text-brand-green"
                  >
                    Refresh
                  </button>
                </div>
                <div className="mt-5 grid gap-4">
                  {rows.map((row) => (
                    <article
                      key={row.id || JSON.stringify(row)}
                      className="rounded-2xl border border-brand-softGray bg-brand-offWhite p-4"
                    >
                      <div className="grid gap-2 text-sm">
                        {activeConfig.fields.slice(0, 4).map((field) => (
                          <p key={field.name}>
                            <span className="font-black">{field.label}: </span>
                            <span className="text-brand-charcoal/70">
                              {valueToText(row[field.name]).slice(0, 160)}
                            </span>
                          </p>
                        ))}
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(row)}
                          className="rounded-full bg-brand-green px-4 py-2 text-xs font-black text-white"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteRow(row)}
                          className="rounded-full bg-red-700 px-4 py-2 text-xs font-black text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                  ))}
                  {!rows.length ? (
                    <p className="rounded-2xl bg-brand-offWhite p-4 text-sm font-semibold text-brand-charcoal/65">
                      Belum ada data atau tabel belum tersedia.
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
