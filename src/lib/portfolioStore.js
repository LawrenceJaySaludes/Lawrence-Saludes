import { createClient } from "@supabase/supabase-js";

export const STORAGE_KEY = "portfolio-admin-content-v1";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const SUPABASE_TABLE =
  import.meta.env.VITE_SUPABASE_PORTFOLIO_TABLE || "portfolio_content";
const SUPABASE_ROW_ID =
  import.meta.env.VITE_SUPABASE_PORTFOLIO_ROW_ID || "main";

const isRemoteEnabled = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
const supabase = isRemoteEnabled
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function parseContent(value) {
  if (isObject(value)) {
    return value;
  }

  if (typeof value !== "string") {
    return null;
  }

  try {
    const parsed = JSON.parse(value);
    return isObject(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function isRemotePortfolioStoreEnabled() {
  return isRemoteEnabled;
}

export function readLocalPortfolioContent() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? parseContent(raw) : null;
  } catch {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // no-op
    }

    return null;
  }
}

export function saveLocalPortfolioContent(content) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

export async function loadRemotePortfolioContent() {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from(SUPABASE_TABLE)
    .select("content")
    .eq("id", SUPABASE_ROW_ID)
    .maybeSingle();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw error;
  }

  return parseContent(data?.content);
}

export async function saveRemotePortfolioContent(content) {
  if (!supabase) {
    return false;
  }

  const { error } = await supabase
    .from(SUPABASE_TABLE)
    .upsert(
      {
        id: SUPABASE_ROW_ID,
        content,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );

  if (error) {
    throw error;
  }

  return true;
}

export function subscribeToRemotePortfolioContent(onChange) {
  if (!supabase) {
    return () => {};
  }

  const channel = supabase
    .channel(`portfolio-content:${SUPABASE_ROW_ID}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: SUPABASE_TABLE,
        filter: `id=eq.${SUPABASE_ROW_ID}`,
      },
      (payload) => {
        const nextContent = parseContent(payload.new?.content);
        if (nextContent) {
          onChange(nextContent);
        }
      }
    )
    .subscribe();

  return () => {
    void supabase.removeChannel(channel);
  };
}
