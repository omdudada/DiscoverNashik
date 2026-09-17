"use client";
import { useTranslation } from "@/lib/i18n/i18n";

export default function GettingAroundPage() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900">{t("kumbh.gettingAround")}</h1>
      <p className="mt-2 text-gray-600">
        Select a destination to see walking / bus / auto-taxi / parking options, sourced from
        GET /api/places/:id/transport-options.
      </p>
    </div>
  );
}
