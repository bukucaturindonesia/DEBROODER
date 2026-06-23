import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

const placeholderPattern = /^ISI_/i;

function hasValidSupabaseEnv() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return false;
  }

  if (
    placeholderPattern.test(supabaseUrl) ||
    placeholderPattern.test(supabaseAnonKey)
  ) {
    return false;
  }

  // Supabase URL harus base URL, bukan /rest/v1
  if (supabaseUrl.includes("/rest/v1")) {
    return false;
  }

  try {
    const url = new URL(supabaseUrl);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function isSupabaseConfigured() {
  return hasValidSupabaseEnv();
}

export function createSupabaseClient(): SupabaseClient | null {
  if (!hasValidSupabaseEnv() || !supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

export function createSupabaseServerClient(): SupabaseClient | null {
  if (!hasValidSupabaseEnv() || !supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
