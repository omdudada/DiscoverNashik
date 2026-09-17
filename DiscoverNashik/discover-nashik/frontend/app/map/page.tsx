"use client";
import dynamic from "next/dynamic";
import { useTranslation } from "@/lib/i18n/i18n";

const PlaceMap = dynamic(() => import("@/components/PlaceMap"), { ssr: false });

export default function MapPage() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-4 text-2xl font-bold text-gray-900">{t("nav.map")}</h1>
      <div className="h-[70vh] overflow-hidden rounded-xl border border-gray-200">
        <PlaceMap lat={19.9975} lng={73.7898} label="Nashik" />
      </div>
    </div>
  );
}
