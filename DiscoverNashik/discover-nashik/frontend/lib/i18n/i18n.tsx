"use client";

/**
 * Discover Nashik — i18n system
 * -------------------------------------------------------------
 * Design goals (see project spec):
 *  - Default language is English on a brand-new browser session.
 *  - Once the user picks Hindi/Marathi, it must survive client-side
 *    navigation across the whole App Router tree.
 *  - It must reset to English when the tab/browser session actually
 *    ends (sessionStorage is exactly this: per-tab, cleared when the
 *    tab/browser closes — unlike localStorage, which is permanent).
 *  - The provider must live ABOVE the router in the tree (in the root
 *    layout) and must never be re-instantiated per-route, or the
 *    language will appear to "reset" on navigation even though the
 *    storage value is still correct.
 *
 * Common bug this avoids: putting the <I18nProvider> inside a page
 * component (or re-creating the Context object per render) causes
 * every route change to mount a fresh provider with default state
 * before the effect that reads sessionStorage has run — producing a
 * visible Hindi -> English -> Hindi flash. Mounting it once in
 * app/layout.tsx and reading storage synchronously on first render
 * (via useState initializer, not useEffect) avoids that flash.
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

import en from "./locales/en.json";
import hi from "./locales/hi.json";
import mr from "./locales/mr.json";

export type Locale = "en" | "hi" | "mr";

export const SUPPORTED_LOCALES: { code: Locale; label: string; nativeLabel: string }[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "hi", label: "Hindi", nativeLabel: "हिंदी" },
  { code: "mr", label: "Marathi", nativeLabel: "मराठी" },
];

const DEFAULT_LOCALE: Locale = "en";

// sessionStorage key. Session-scoped by design — do NOT switch this to
// localStorage; that would make the selected language "sticky" across
// browser restarts, which the spec explicitly forbids.
const STORAGE_KEY = "discover-nashik:locale";

const dictionaries: Record<Locale, Record<string, any>> = { en, hi, mr };

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "hi" || stored === "mr") {
      return stored;
    }
  } catch {
    // sessionStorage can throw in private-browsing / disabled-storage
    // situations — fall back to the default rather than crashing.
  }
  return DEFAULT_LOCALE;
}

function getNested(obj: Record<string, any>, path: string): string | undefined {
  return path.split(".").reduce<any>((acc, key) => (acc == null ? acc : acc[key]), obj);
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  // Lazy initializer runs synchronously during the first render on the
  // client, and returns "en" during SSR (window is undefined there) —
  // matching hydration and avoiding a flash of the wrong language.
  const [locale, setLocaleState] = useState<Locale>(() => readStoredLocale());

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage write failures; in-memory state still updates,
      // so the UI still reflects the user's choice for this render tree.
    }
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const dict = dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
      let value = getNested(dict, key);
      if (value === undefined) {
        // Fall back to English rather than showing the raw key, then
        // fall back to the key itself if even English is missing it
        // (a signal during development that a key audit is needed).
        value = getNested(dictionaries[DEFAULT_LOCALE], key) ?? key;
      }
      if (vars) {
        for (const [varName, varValue] of Object.entries(vars)) {
          value = value.replace(`{${varName}}`, String(varValue));
        }
      }
      return value;
    },
    [locale]
  );

  const contextValue = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an <I18nProvider> (see app/layout.tsx)");
  }
  return ctx;
}

// Convenience hook for components that only need the translate function.
export function useTranslation() {
  const { t, locale } = useI18n();
  return { t, locale };
}
