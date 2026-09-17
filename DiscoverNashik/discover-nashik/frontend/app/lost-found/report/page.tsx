"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "@/lib/i18n/i18n";

export default function LostFoundReportPage() {
  const { t } = useTranslation();
  const params = useSearchParams();
  const type = params.get("type") === "found" ? "found" : "lost";
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // POST /api/lost-found/{lost|found}
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-lg font-semibold text-green-700">{t("lostFound.reportSubmitted")}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900">
        {type === "lost" ? t("lostFound.reportLost") : t("lostFound.iFoundThis")}
      </h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">{t("lostFound.description")}</label>
          <textarea required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" rows={3} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {type === "lost" ? t("lostFound.lastSeenLocation") : t("lostFound.foundLocation")}
          </label>
          <input required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">{t("lostFound.dateTime")}</label>
          <input type="datetime-local" required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">{t("lostFound.contactInfo")}</label>
          <input required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        </div>
        <button type="submit" className="w-full rounded-full bg-orange-600 py-2.5 text-sm font-semibold text-white">
          {t("common.submit")}
        </button>
      </form>
    </div>
  );
}
