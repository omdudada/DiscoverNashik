"use client";
import { useState } from "react";
import { useTranslation } from "@/lib/i18n/i18n";

export default function BusinessApplyPage() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // POST /api/business/apply
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-lg font-semibold text-green-700">
          {t("lostFound.reportSubmitted") /* reuse generic "submitted" copy */}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900">{t("business.applyTitle")}</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">{t("business.businessName")}</label>
          <input required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">{t("business.category")}</label>
          <select required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
            <option value="">{t("common.selectCategory")}</option>
            <option value="temples">{t("categories.temples")}</option>
            <option value="food">{t("categories.food")}</option>
            <option value="accommodation">{t("categories.accommodation")}</option>
          </select>
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
