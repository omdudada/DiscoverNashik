"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n/i18n";
import HomeSearch from "@/components/HomeSearch";

export default function CategoryPage({ params }: { params: { category: string } }) {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-semibold text-orange-600 hover:underline mb-2"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold capitalize text-gray-900">
            {params.category} Places
          </h1>
        </div>
      </div>

      <HomeSearch initialCategory={params.category} />
    </div>
  );
}
