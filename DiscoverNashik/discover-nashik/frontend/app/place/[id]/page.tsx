"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n/i18n";
import dynamic from "next/dynamic";
import { NASHIK_PLACES } from "@/lib/placesData";

const PlaceMap = dynamic(() => import("@/components/PlaceMap"), { ssr: false });

export default function PlaceDetailsPage({ params }: { params: { id: string } }) {
  const { t } = useTranslation();

  const place = NASHIK_PLACES.find(
    (p) => p.id.toLowerCase() === params.id.toLowerCase()
  ) || {
    id: params.id,
    name: `Place #${params.id}`,
    categorySlug: "attractions",
    categoryName: "Tourist Spot",
    categoryIcon: "📍",
    description: "Discover this holy and vibrant destination in Nashik, Maharashtra.",
    location: "Nashik, Maharashtra",
    distanceKm: 5.0,
    price: "Free",
    rating: 4.5,
    latitude: 19.9975,
    longitude: 73.7898,
    tags: ["nashik", "kumbh"],
    timings: "Open daily",
    highlights: ["Scenic View", "Sacred Site"],
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-xs font-semibold text-orange-600 hover:underline mb-4"
      >
        ← Back to Search
      </Link>

      <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-lg">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-4">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
              <span>{place.categoryIcon}</span>
              <span>{place.categoryName}</span>
            </span>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">{place.name}</h1>
            <p className="mt-1 text-sm font-medium text-gray-500">📍 {place.location}</p>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-sm font-bold text-amber-800 border border-amber-200">
            <span>⭐</span>
            <span>{place.rating} / 5.0</span>
          </div>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">About this place</h3>
            <p className="mt-1 text-base text-gray-600 leading-relaxed">{place.description}</p>
          </div>

          {place.timings && (
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Visiting Hours</h3>
              <p className="mt-1 text-sm font-medium text-gray-800">⏰ {place.timings}</p>
            </div>
          )}

          {place.price && (
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Entry & Pricing</h3>
              <p className="mt-1 text-sm font-medium text-emerald-700">🏷️ {place.price}</p>
            </div>
          )}

          {place.highlights && (
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Highlights</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {place.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="rounded-lg bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-800 border border-orange-100"
                  >
                    ✓ {h}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Interactive Map */}
        <div className="mt-8">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Location & Directions</h3>
          <div className="h-72 overflow-hidden rounded-xl border border-gray-200 shadow-inner">
            <PlaceMap lat={place.latitude} lng={place.longitude} label={place.name} />
          </div>
        </div>

        {/* Footer buttons */}
        <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-5">
          <Link
            href="/"
            className="rounded-full border border-gray-300 px-6 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
          >
            ← {t("common.back")}
          </Link>

          <Link
            href={`/map?lat=${place.latitude}&lng=${place.longitude}`}
            className="rounded-full bg-orange-600 px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-orange-700 transition"
          >
            🗺️ Open on Map
          </Link>
        </div>
      </div>
    </div>
  );
}
