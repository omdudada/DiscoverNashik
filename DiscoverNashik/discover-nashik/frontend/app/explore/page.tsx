"use client";
import { useTranslation } from "@/lib/i18n/i18n";
import CategoryGrid from "@/components/CategoryGrid";

export default function ExplorePage() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">{t("nav.explore")}</h1>
      <CategoryGrid />
    </div>
  );
}
