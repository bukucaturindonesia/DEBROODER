import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const placeholderPattern = /^ISI_/;

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
  if (!hasValidSupabaseEnv()) {
    return null;
  }

  return createClient(supabaseUrl!, supabaseAnonKey!);
}

export function createSupabaseServerClient(): SupabaseClient | null {
  if (!hasValidSupabaseEnv()) {
    return null;
  }

  return createClient(supabaseUrl!, supabaseAnonKey!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
