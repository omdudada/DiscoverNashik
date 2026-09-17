"use client";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/i18n";

export default function LostFoundPage() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">{t("lostFound.title")}</h1>
      <div className="mt-6 flex gap-3">
        <Link href="/lost-found/report?type=lost" className="rounded-full bg-orange-600 px-5 py-2 text-sm font-semibold text-white">
          {t("lostFound.reportLost")}
        </Link>
        <Link href="/lost-found/report?type=found" className="rounded-full border border-orange-600 px-5 py-2 text-sm font-semibold text-orange-600">
          {t("lostFound.iFoundThis")}
        </Link>
      </div>
      <p className="mt-8 text-gray-500">{t("common.noReportsFound")}</p>
    </div>
  );
}
