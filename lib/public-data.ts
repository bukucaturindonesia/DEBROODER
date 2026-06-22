import { fallbackContent } from "@/lib/fallback-data";
import { createSupabaseServerClient } from "@/lib/supabase";
import type {
  AboutContent,
  ContactSettings,
  HeroBanner,
  Product,
  PublicContent,
  ServiceCategory,
  Store,
  Testimonial
} from "@/lib/types";

async function readActive<T>(
  table: string,
  fallback: T[],
  order = "urutan"
): Promise<T[]> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return fallback;
  }

  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("status_aktif", true)
    .order(order, { ascending: true });

  if (error || !data || data.length === 0) {
    return fallback;
  }

  return data as T[];
}

async function readSingle<T>(
  table: string,
  fallback: T,
  filterActive = true
): Promise<T> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return fallback;
  }

  let query = supabase.from(table).select("*").limit(1);

  if (filterActive) {
    query = query.eq("status_aktif", true);
  }

  const { data, error } = await query.maybeSingle();

  if (error || !data) {
    return fallback;
  }

  return data as T;
}

export async function getPublicContent(): Promise<PublicContent> {
  const [heroes, about, categories, products, stores, testimonials, contact] =
    await Promise.all([
      readActive<HeroBanner>("hero_banners", fallbackContent.heroes),
      readSingle<AboutContent>("about_content", fallbackContent.about),
      readActive<ServiceCategory>(
        "service_categories",
        fallbackContent.categories
      ),
      readActive<Product>("products", fallbackContent.products),
      readActive<Store>("stores", fallbackContent.stores),
      readActive<Testimonial>("testimonials", fallbackContent.testimonials),
      readSingle<ContactSettings>(
        "contact_settings",
        fallbackContent.contact,
        true
      )
    ]);

  return {
    hero: heroes[0] || fallbackContent.hero,
    heroes: heroes.length ? heroes : fallbackContent.heroes,
    about,
    categories,
    products,
    stores,
    testimonials,
    contact
  };
}
