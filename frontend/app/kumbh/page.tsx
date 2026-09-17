"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n/i18n";

export default function KumbhPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-b from-orange-50/60 via-white to-orange-50/20 min-h-screen pb-16">
      {/* Hero Window Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 py-12 text-white shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-4 py-1 text-xs font-bold text-orange-100 mb-4 border border-white/30">
            <span>🚩</span>
            <span>Official Kumbh Mela Nashik 2027 Command Window</span>
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Kumbh Mela 2027 Hub
          </h1>

          <p className="mt-3 text-lg font-medium text-orange-100 max-w-2xl mx-auto">
            Your essential pilgrim companion — real-time maps, place exploration, lost & found, and group safety tracking.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-sm border border-white/20">
              🌊 Godavari Shahi Snan
            </span>
            <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-sm border border-white/20">
              🛕 Trimbakeshwar & Ramkund
            </span>
            <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-sm border border-white/20">
              👥 24/7 Pilgrim Safety
            </span>
          </div>
        </div>
      </section>

      {/* Main Pilgrim Tools Window (The 4 Moved Sections) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-orange-100">
          <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span>🧰</span>
                <span>Pilgrim Services & Tools</span>
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Access key utilities moved directly into the Kumbh Mela 2027 window for quick navigation.
              </p>
            </div>
            <span className="hidden sm:inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-800">
              4 Core Services
            </span>
          </div>

          {/* 4 Core Moved Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Map */}
            <Link
              href="/map"
              className="group flex flex-col justify-between rounded-2xl border-2 border-blue-100 bg-gradient-to-b from-blue-50/40 to-white p-6 transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white shadow-md shadow-blue-500/30 group-hover:scale-110 transition">
                  🗺️
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">
                  {t("nav.map")}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-600">
                  Interactive Leaflet map showing bathing ghats, parking sectors, medical camps, and emergency shelters.
                </p>
              </div>

              <div className="mt-6 flex items-center text-xs font-bold text-blue-600 group-hover:translate-x-1 transition">
                <span>Open Pilgrim Map</span>
                <span className="ml-1">→</span>
              </div>
            </Link>

            {/* 2. Explore */}
            <Link
              href="/explore"
              className="group flex flex-col justify-between rounded-2xl border-2 border-orange-100 bg-gradient-to-b from-orange-50/40 to-white p-6 transition hover:-translate-y-1 hover:border-orange-400 hover:shadow-xl"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-600 text-2xl text-white shadow-md shadow-orange-500/30 group-hover:scale-110 transition">
                  🔍
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900 group-hover:text-orange-600 transition">
                  {t("nav.explore")}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-600">
                  Browse temples, sacred ghats, mountain treks, local food, accommodation, and shopping markets.
                </p>
              </div>

              <div className="mt-6 flex items-center text-xs font-bold text-orange-600 group-hover:translate-x-1 transition">
                <span>Explore All Places</span>
                <span className="ml-1">→</span>
              </div>
            </Link>

            {/* 3. Lost & Found */}
            <Link
              href="/lost-found"
              className="group flex flex-col justify-between rounded-2xl border-2 border-rose-100 bg-gradient-to-b from-rose-50/40 to-white p-6 transition hover:-translate-y-1 hover:border-rose-400 hover:shadow-xl"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-600 text-2xl text-white shadow-md shadow-rose-500/30 group-hover:scale-110 transition">
                  🚨
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900 group-hover:text-rose-600 transition">
                  {t("nav.lostFound")}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-600">
                  Report misplaced belongings or missing family members, and view verified crowd found reports.
                </p>
              </div>

              <div className="mt-6 flex items-center text-xs font-bold text-rose-600 group-hover:translate-x-1 transition">
                <span>Lost & Found Portal</span>
                <span className="ml-1">→</span>
              </div>
            </Link>

            {/* 4. Group Tracker */}
            <Link
              href="/group-tracker"
              className="group flex flex-col justify-between rounded-2xl border-2 border-emerald-100 bg-gradient-to-b from-emerald-50/40 to-white p-6 transition hover:-translate-y-1 hover:border-emerald-400 hover:shadow-xl"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-2xl text-white shadow-md shadow-emerald-500/30 group-hover:scale-110 transition">
                  👥
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition">
                  {t("nav.groupTracker")}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-600">
                  Create or join family/friend groups to share live locations and send quick SOS safety alerts during peak crowd days.
                </p>
              </div>

              <div className="mt-6 flex items-center text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition">
                <span>Open Group Tracker</span>
                <span className="ml-1">→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Shahi Snan & Planning Info Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span>📅</span>
          <span>Kumbh Mela 2027 Event Calendar & Guides</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Major Bathing Dates */}
          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-orange-600 font-bold text-sm">
              <span>🌅</span>
              <span>Major Bathing Dates (Shahi Snan)</span>
            </div>
            <ul className="mt-4 space-y-3 text-xs text-gray-700">
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span className="font-semibold">Dhwajarohan (Flag Hoisting)</span>
                <span className="text-orange-600 font-bold">Aug 2027</span>
              </li>
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span className="font-semibold">First Shahi Snan (Godavari)</span>
                <span className="text-orange-600 font-bold">Aug 2027</span>
              </li>
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span className="font-semibold">Second Main Shahi Snan</span>
                <span className="text-orange-600 font-bold">Sep 2027</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold">Third Shahi Snan</span>
                <span className="text-orange-600 font-bold">Sep 2027</span>
              </li>
            </ul>
          </div>

          {/* Dates & Planning */}
          <Link
            href="/kumbh/dates"
            className="group rounded-2xl border border-orange-100 bg-white p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
              <span>📋</span>
              <span>{t("kumbh.datesAndPlanning")}</span>
            </div>
            <p className="mt-3 text-xs text-gray-600 leading-relaxed">
              Complete timeline, ritual schedules, pilgrim guidelines, and packing checklist for your visit.
            </p>
            <span className="mt-6 inline-block text-xs font-bold text-orange-600 group-hover:underline">
              View Detailed Schedule →
            </span>
          </Link>

          {/* Getting Around */}
          <Link
            href="/kumbh/getting-around"
            className="group rounded-2xl border border-orange-100 bg-white p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
              <span>🚌</span>
              <span>{t("kumbh.gettingAround")}</span>
            </div>
            <p className="mt-3 text-xs text-gray-600 leading-relaxed">
              Shuttle bus routes, parking zone details, railway station connections, and pedestrian walkway maps.
            </p>
            <span className="mt-6 inline-block text-xs font-bold text-blue-600 group-hover:underline">
              View Travel Guide →
            </span>
          </Link>
        </div>

        {/* Emergency Contacts Banner */}
        <div className="mt-8 rounded-2xl bg-slate-900 p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">📞</span>
            <div>
              <h4 className="text-lg font-bold">24/7 Pilgrim Emergency Helplines</h4>
              <p className="text-xs text-slate-400 mt-1">
                Kumbh Control Room: <strong className="text-orange-400">1912</strong> | Police: <strong className="text-orange-400">112</strong> | Ambulance: <strong className="text-orange-400">108</strong>
              </p>
            </div>
          </div>
          <Link
            href="/ai-chat"
            className="shrink-0 rounded-full bg-orange-600 px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-orange-700 transition"
          >
            Ask AI Assistant ✨
          </Link>
        </div>
      </section>
    </div>
  );
}
