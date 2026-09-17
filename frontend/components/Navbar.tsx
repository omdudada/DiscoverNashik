"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/i18n";
import LanguageSelector from "./LanguageSelector";
import logoImg from "@/public/logo.jpeg";

const PORTAL_LINKS = [
  { href: "/business/apply", labelKey: "nav.business", defaultLabel: "Business Registration / Login", icon: "💼", desc: "Apply or manage business listing" },
  { href: "/admin", labelKey: "nav.admin", defaultLabel: "Admin Portal Login", icon: "🛡️", desc: "Admin dashboard & approvals" },
];

export default function Navbar() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-orange-100 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="w-full flex items-center justify-between px-4 sm:px-6 md:px-8 py-2">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 text-xl font-black tracking-tight text-gray-900 group">
          <img
            src={logoImg.src}
            alt="Discover Nashik Logo"
            className="h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover shadow-md border-2 border-orange-400/80 group-hover:scale-105 transition duration-200"
          />
          <span>
            Discover <span className="text-orange-600">Nashik</span>
          </span>
        </Link>

        {/* Right Actions & Popover Menu Container */}
        <div className="relative flex items-center gap-3" ref={menuRef}>
          {/* Kumbh Mela 2027 Hub Button */}
          <Link
            href="/kumbh"
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 px-4 py-1.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-orange-500/20 hover:shadow-lg hover:scale-105 transition"
          >
            <span>🚩</span>
            <span>Kumbh Mela 2027</span>
          </Link>

          {/* Menu Button (3 Horizontal Lines) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border text-gray-700 shadow-2xs transition active:scale-95 ${
              isMenuOpen
                ? "bg-orange-600 text-white border-orange-600 shadow-md"
                : "bg-gray-50 border-gray-200 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600"
            }`}
            aria-label="Toggle settings & login menu"
            title="Menu"
          >
            {isMenuOpen ? (
              <span className="text-base font-bold">✕</span>
            ) : (
              <svg
                className="h-6 w-6 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Popover Dropdown Menu (Anchored under the Menu Button) */}
          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-orange-100/80 bg-white p-4 shadow-2xl backdrop-blur-md z-50 animate-in fade-in zoom-in-95 duration-150">
              {/* Popover Arrow Pointer */}
              <div className="absolute -top-2 right-4 h-4 w-4 rotate-45 border-l border-t border-orange-100 bg-white"></div>

              {/* Language Selection Bar */}
              <div className="mb-4 rounded-xl bg-orange-50/60 p-3 border border-orange-100">
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-orange-800 mb-1.5 flex items-center gap-1">
                  <span>🌐</span>
                  <span>Select Language / भाषा</span>
                </label>
                <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded-lg border border-orange-200/80 shadow-2xs">
                  <span className="text-xs font-semibold text-gray-700">App Language:</span>
                  <LanguageSelector />
                </div>
              </div>

              {/* Login / Management Options */}
              <div className="space-y-3">
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 px-1">
                  🔐 Login & Management
                </h4>

                <div className="space-y-2">
                  {PORTAL_LINKS.map((item) => {
                    const translated = t(item.labelKey);
                    const label = translated !== item.labelKey ? translated : item.defaultLabel;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="group flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/60 p-3 transition hover:border-orange-300 hover:bg-orange-50 hover:shadow-md"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm group-hover:scale-110 transition">
                          {item.icon}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-gray-900 group-hover:text-orange-600 transition">
                            {label}
                          </div>
                          <p className="text-[10px] text-gray-500 mt-0.5">{item.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Popover Footer */}
              <div className="mt-4 border-t border-gray-100 pt-2.5 text-center text-[10px] font-medium text-gray-400">
                Discover Nashik • Kumbh Mela 2027
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
