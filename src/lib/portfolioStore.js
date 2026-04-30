export const STORAGE_KEY = "portfolio-admin-content-v1";

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
