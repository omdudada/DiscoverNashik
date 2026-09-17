"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/i18n";
import CategoryGrid from "@/components/CategoryGrid";
import HomeSearch from "@/components/HomeSearch";

export default function HomePage() {
  const { t } = useTranslation();
  const [selectedCat, setSelectedCat] = useState("all");

  return (
    <div className="bg-gradient-to-b from-orange-50/50 via-white to-orange-50/20 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* LEFT COLUMN: Text Content & Actions */}
            <div className="lg:col-span-6 flex flex-col justify-center text-left py-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-100/80 px-4 py-1.5 text-xs font-bold text-orange-800 mb-6 border border-orange-200 self-start">
                <span>🚩</span>
                <span>Kumbh Mela Nashik 2027 Official Companion</span>
              </div>

              <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl leading-tight">
                Discover <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Nashik</span>
              </h1>

              <p className="mt-4 text-xl font-bold text-orange-600">{t("home.tagline")}</p>
              <p className="mt-3 text-base text-gray-600 leading-relaxed max-w-xl">{t("home.intro")}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#search-section"
                  className="rounded-full bg-orange-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-600/30 hover:bg-orange-700 transition hover:scale-105"
                >
                  🔍 Search Places
                </a>
                <Link
                  href="/kumbh"
                  className="rounded-full border-2 border-orange-600 px-7 py-3.5 text-sm font-bold text-orange-600 hover:bg-orange-50 transition hover:scale-105"
                >
                  {t("nav.kumbh")}
                </Link>
              </div>
            </div>

            {/* RIGHT COLUMN: Full-Cover Hero Image */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] flex">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-orange-400/25 via-amber-500/25 to-orange-600/25 blur-xl opacity-80"></div>
                <img
                  src="/hero-kumbh.png"
                  alt="Pilgrims at Godavari River Ghat in Nashik during Kumbh Mela"
                  className="relative w-full h-full object-cover rounded-3xl shadow-2xl border border-orange-100/90 transition duration-300 hover:scale-[1.005]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Search & Category Browse Section */}
      <HomeSearch key={selectedCat} initialCategory={selectedCat} />

      {/* Category Grid Section */}
      <div className="border-t border-orange-100/60 bg-white/60 backdrop-blur-sm mt-8">
        <CategoryGrid onCategorySelect={(slug) => setSelectedCat(slug)} />
      </div>
    </div>
  );
}
