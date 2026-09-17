"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n/i18n";

const categories = [
  { slug: "temples", key: "categories.temples", icon: "🛕", defaultLabel: "Temples & Pilgrimage" },
  { slug: "ghats", key: "categories.ghats", icon: "🌊", defaultLabel: "Ghats" },
  { slug: "mountains", key: "categories.mountains", icon: "⛰️", defaultLabel: "Mountains & Treks" },
  { slug: "food", key: "categories.food", icon: "🍽️", defaultLabel: "Food & Restaurants" },
  { slug: "accommodation", key: "categories.accommodation", icon: "🏨", defaultLabel: "Accommodation" },
  { slug: "attractions", key: "categories.attractions", icon: "📍", defaultLabel: "Tourist Attractions" },
  { slug: "shopping", key: "categories.shopping", icon: "🛍️", defaultLabel: "Shopping" },
  { slug: "culture", key: "categories.culture", icon: "🎭", defaultLabel: "Culture & Heritage" },
];

interface CategoryGridProps {
  onCategorySelect?: (slug: string) => void;
}

export default function CategoryGrid({ onCategorySelect }: CategoryGridProps) {
  const { t } = useTranslation();

  const handleCategoryClick = (slug: string) => {
    if (onCategorySelect) {
      onCategorySelect(slug);
      const searchElem = document.getElementById("search-section");
      if (searchElem) {
        searchElem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t("home.exploreCategories")}</h2>
          <p className="text-sm text-gray-500 mt-1">Select a category to quickly filter places</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {categories.map((cat) => {
          const translatedLabel = t(cat.key);
          const label = translatedLabel !== cat.key ? translatedLabel : cat.defaultLabel;

          return (
            <Link
              key={cat.slug}
              href={`/explore/${cat.slug}`}
              onClick={(e) => {
                if (onCategorySelect) {
                  e.preventDefault();
                  handleCategoryClick(cat.slug);
                }
              }}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-orange-100/60 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:bg-orange-50/30 hover:shadow-lg"
            >
              <span className="text-4xl transition group-hover:scale-110">{cat.icon}</span>
              <span className="text-sm font-semibold text-gray-800 group-hover:text-orange-600">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
