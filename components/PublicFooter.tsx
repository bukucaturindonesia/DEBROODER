import Link from "next/link";
import { Logo } from "@/components/Logo";
import { SocialIconLinks } from "@/components/SocialIconLinks";
import type { PublicContent } from "@/lib/types";
import { emailHref, facebookHref, instagramHref } from "@/lib/url";

function sectionPath(slug: string) {
  return `/${slug.replace(/^\/+/, "")}`;
}

export function PublicFooter({ content }: { content: PublicContent }) {
  const emailLink = emailHref(content.contact.email);
  const facebookLink = facebookHref(content.contact.facebook);
  const instagramLink = instagramHref(content.contact.instagram);

  return (
    <footer className="bg-brand-charcoal py-12 text-white">
      <div className="section-shell grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <Logo variant="primary-white" size="md" />
          <p className="mt-3 text-sm font-semibold text-white/70">
            Kaos Polos Import & Sablon
          </p>
          <Link
            href="/admin/login"
            className="mt-6 inline-flex text-xs font-semibold text-white/35 transition hover:text-white"
          >
            Admin
          </Link>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/60">
            Menu
          </h3>
          <div className="mt-5 grid gap-3 text-sm font-semibold text-white/75">
            <Link href="/#tentang" className="hover:text-white">
              Tentang
            </Link>
            <Link href="/#apparel" className="hover:text-white">
              DEBRODER Apparel
            </Link>
            <Link href="/express" className="hover:text-white">
              DEBRODER Express
            </Link>
            <Link href="/store" className="hover:text-white">
              Store
            </Link>
            <Link href="/#kontak" className="hover:text-white">
              Kontak
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/60">
            Layanan
          </h3>
          <div className="mt-5 grid gap-3 text-sm font-semibold text-white/75">
            {content.categories.slice(0, 7).map((service) => (
              <Link
                key={service.nama_kategori}
                href={sectionPath(service.link_slug || "koleksi")}
                className="hover:text-white"
              >
                {service.nama_kategori}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/60">
            Store
          </h3>
          <div className="mt-5 grid gap-3 text-sm font-semibold text-white/75">
            {content.stores.map((store) => (
              <a
                key={store.nama_store}
                href={store.maps_link}
                className="hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                {store.nama_store.replace("STORE ", "Store ")}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/60">
            Kontak
          </h3>
          <SocialIconLinks
            emailLink={emailLink}
            facebookLink={facebookLink}
            instagramLink={instagramLink}
            tone="light"
            className="mt-5"
          />
        </div>
      </div>
      <div className="section-shell mt-10 border-t border-white/10 pt-6">
        <p className="text-sm font-semibold text-white/60">
          &copy; 2026 DEBRODER. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
