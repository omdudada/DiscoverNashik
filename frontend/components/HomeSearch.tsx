"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/i18n";
import { NASHIK_PLACES, Place, searchPlaces } from "@/lib/placesData";

const CATEGORIES = [
  { slug: "all", labelKey: "common.all", icon: "✨", defaultLabel: "All Places" },
  { slug: "temples", labelKey: "categories.temples", icon: "🛕", defaultLabel: "Temples" },
  { slug: "ghats", labelKey: "categories.ghats", icon: "🌊", defaultLabel: "Ghats" },
  { slug: "mountains", labelKey: "categories.mountains", icon: "⛰️", defaultLabel: "Mountains" },
  { slug: "food", labelKey: "categories.food", icon: "🍽️", defaultLabel: "Food" },
  { slug: "accommodation", labelKey: "categories.accommodation", icon: "🏨", defaultLabel: "Stay" },
  { slug: "attractions", labelKey: "categories.attractions", icon: "📍", defaultLabel: "Attractions" },
  { slug: "shopping", labelKey: "categories.shopping", icon: "🛍️", defaultLabel: "Shopping" },
  { slug: "culture", labelKey: "categories.culture", icon: "🎭", defaultLabel: "Culture" },
];

interface HomeSearchProps {
  initialCategory?: string;
}

export default function HomeSearch({ initialCategory = "all" }: HomeSearchProps) {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [apiPlaces, setApiPlaces] = useState<Place[] | null>(null);

  // Attempt to load places from Backend API, fallback to NASHIK_PLACES
  useEffect(() => {
    async function fetchFromBackend() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";
        const res = await fetch(`${baseUrl}/places`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            // map postgres schema to Place interface
            const mapped: Place[] = data.map((item: any) => ({
              id: item.id || String(item.name).toLowerCase().replace(/\s+/g, "-"),
              name: item.name,
              categorySlug: item.category_slug || "attractions",
              categoryName: item.category_name || "Tourist Attractions",
              categoryIcon: item.icon || "📍",
              description: item.description || "Discover this wonderful destination in Nashik.",
              location: item.location || "Nashik, Maharashtra",
              distanceKm: Number(item.distance_km) || 5.0,
              price: item.price_range || null,
              rating: item.rating || 4.5,
              latitude: Number(item.latitude) || 19.9975,
              longitude: Number(item.longitude) || 73.7898,
              tags: [item.name.toLowerCase(), item.category_slug || ""],
            }));
            setApiPlaces(mapped);
          }
        }
      } catch {
        // Backend DB optional in MVP demo - fallback to client static data
        setApiPlaces(null);
      }
    }
    fetchFromBackend();
  }, []);

  const availablePlaces = apiPlaces || NASHIK_PLACES;

  const filteredPlaces = useMemo(() => {
    const q = query.trim().toLowerCase();
    return availablePlaces.filter((place) => {
      const matchesCat =
        selectedCategory === "all" ||
        place.categorySlug.toLowerCase() === selectedCategory.toLowerCase();
      if (!q) return matchesCat;

      const matchesName = place.name.toLowerCase().includes(q);
      const matchesDesc = place.description.toLowerCase().includes(q);
      const matchesLoc = place.location.toLowerCase().includes(q);
      const matchesCatName = place.categoryName.toLowerCase().includes(q);
      const matchesTags = place.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCat && (matchesName || matchesDesc || matchesLoc || matchesCatName || matchesTags);
    });
  }, [query, selectedCategory, availablePlaces]);

  return (
    <section id="search-section" className="mx-auto max-w-7xl px-4 py-8">
      {/* Search Header Container */}
      <div className="relative z-10 mx-auto max-w-4xl rounded-2xl bg-white p-4 sm:p-6 shadow-xl border border-orange-100/80 backdrop-blur-md">
        <div className="mb-4 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            🔍 Search & Browse Places in Nashik
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            Search by place name, temples, ghats, food, treks, or select a category below
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="relative flex items-center">
          <div className="pointer-events-none absolute left-4 text-gray-400">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              t("common.search") !== "common.search"
                ? `${t("common.search")} (e.g. Trimbakeshwar, Ramkund, Misal, Trek...)`
                : "Search places (e.g. Trimbakeshwar, Ramkund, Misal, Trek...)"
            }
            className="w-full rounded-xl border-2 border-orange-200 bg-orange-50/40 py-3.5 pl-12 pr-12 text-sm sm:text-base text-gray-900 placeholder-gray-400 transition focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/20"
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 text-gray-400 hover:text-gray-600 transition"
              title="Clear search"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Category Pills Slider */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap sm:justify-center">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.slug;
            const translatedText = t(cat.labelKey);
            const label = translatedText !== cat.labelKey ? translatedText : cat.defaultLabel;

            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  isActive
                    ? "bg-orange-600 text-white shadow-md shadow-orange-500/30 scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Meta Info */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-2 px-2">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span>Explore Places</span>
          <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-bold text-orange-700">
            {filteredPlaces.length} {filteredPlaces.length === 1 ? "place" : "places"}
          </span>
        </h3>

        {(query || selectedCategory !== "all") && (
          <button
            onClick={() => {
              setQuery("");
              setSelectedCategory("all");
            }}
            className="text-xs font-medium text-orange-600 hover:underline"
          >
            Clear filters & show all
          </button>
        )}
      </div>

      {/* Places Results Grid */}
      {filteredPlaces.length === 0 ? (
        <div className="mt-6 rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
          <div className="text-4xl mb-3">🔍</div>
          <h4 className="text-lg font-semibold text-gray-800">No matching places found</h4>
          <p className="mt-1 text-sm text-gray-500">
            Try searching for something else like &quot;temple&quot;, &quot;ghat&quot;, &quot;misal&quot;, or select another category above.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setSelectedCategory("all");
            }}
            className="mt-4 rounded-full bg-orange-600 px-5 py-2 text-xs font-semibold text-white shadow hover:bg-orange-700 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
              className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
            >
              <div>
                {/* Card Header: Category & Rating */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-700 border border-orange-100">
                    <span>{place.categoryIcon}</span>
                    <span>{place.categoryName}</span>
                  </span>

                  <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200/60">
                    <span>⭐</span>
                    <span>{place.rating}</span>
                  </div>
                </div>

                {/* Place Name */}
                <h4 className="mt-3 text-lg font-bold text-gray-900 group-hover:text-orange-600 transition">
                  {place.name}
                </h4>

                {/* Location & Distance */}
                <p className="mt-1 text-xs font-medium text-gray-500 flex items-center gap-1">
                  <span>📍</span>
                  <span>{place.location}</span>
                  {place.distanceKm && (
                    <span className="ml-1 rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-600">
                      {place.distanceKm} km
                    </span>
                  )}
                </p>

                {/* Description */}
                <p className="mt-3 text-xs leading-relaxed text-gray-600 line-clamp-3">
                  {place.description}
                </p>

                {/* Highlights Badges */}
                {place.highlights && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {place.highlights.slice(0, 2).map((h, idx) => (
                      <span
                        key={idx}
                        className="rounded bg-gray-50 px-2 py-0.5 text-[10px] font-medium text-gray-500 border border-gray-100"
                      >
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="mt-5 border-t border-gray-100 pt-3 flex items-center justify-between">
                {place.price ? (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                    🏷️ {place.price}
                  </span>
                ) : (
                  <span className="text-xs text-gray-400">Entry Details</span>
                )}

                <div className="flex items-center gap-2">
                  <Link
                    href={`/map?lat=${place.latitude}&lng=${place.longitude}`}
                    className="rounded-lg border border-gray-200 p-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition"
                    title="View on Map"
                  >
                    🗺️ Map
                  </Link>

                  <Link
                    href={`/place/${place.id}`}
                    className="inline-flex items-center gap-1 rounded-lg bg-orange-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-orange-700 transition"
                  >
                    <span>Details</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
