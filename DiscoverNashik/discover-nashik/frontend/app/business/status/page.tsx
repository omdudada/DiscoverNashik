"use client";
import { useTranslation } from "@/lib/i18n/i18n";

export default function BusinessStatusPage() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900">{t("business.applicationStatus")}</h1>
      <p className="mt-2 text-gray-600">GET /api/business/applications/:id</p>
    </div>
  );
}
