"use client";
import { useTranslation } from "@/lib/i18n/i18n";

export default function AdminDashboardPage() {
  const { t } = useTranslation();
  const sections = [
    { key: "admin.placeManagement" },
    { key: "admin.businessApproval" },
    { key: "admin.lostFoundModeration" },
  ];
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900">{t("admin.dashboard")}</h1>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {sections.map((s) => (
          <div key={s.key} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900">{t(s.key)}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
