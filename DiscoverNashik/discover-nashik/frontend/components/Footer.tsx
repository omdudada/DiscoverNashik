"use client";

import { useTranslation } from "@/lib/i18n/i18n";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-8 text-sm text-gray-600">
      <div className="mx-auto max-w-7xl px-4">
        <p className="font-semibold text-gray-800">Discover Nashik</p>
        <p className="mt-1">{t("home.tagline")}</p>
        <p className="mt-4 text-xs text-gray-400">
          © {new Date().getFullYear()} Discover Nashik. Built for Kumbh Mela 2027.
        </p>
      </div>
    </footer>
  );
}
