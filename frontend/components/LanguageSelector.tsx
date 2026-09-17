"use client";

import { useI18n, SUPPORTED_LOCALES, type Locale } from "@/lib/i18n/i18n";

export default function LanguageSelector() {
  const { locale, setLocale } = useI18n();

  return (
    <select
      aria-label="Select language"
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locale)}
      className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
    >
      {SUPPORTED_LOCALES.map((l) => (
        <option key={l.code} value={l.code}>
          {l.nativeLabel}
        </option>
      ))}
    </select>
  );
}
