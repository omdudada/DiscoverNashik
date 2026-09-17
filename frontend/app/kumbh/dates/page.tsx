"use client";
import { useTranslation } from "@/lib/i18n/i18n";

export default function DatesPlanningPage() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900">{t("kumbh.datesAndPlanning")}</h1>
      <h2 className="mt-6 text-lg font-semibold text-gray-800">{t("kumbh.majorBathingDates")}</h2>
      <p className="mt-2 text-gray-600">
        Populate from GET /api/events?type=bathing-date — dates themselves are factual data and
        are not translated, only the surrounding labels are.
      </p>
    </div>
  );
}
