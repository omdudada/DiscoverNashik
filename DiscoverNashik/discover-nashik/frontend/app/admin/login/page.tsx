"use client";
import { useTranslation } from "@/lib/i18n/i18n";

export default function AdminLoginPage() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-bold text-gray-900">{t("admin.login")}</h1>
      <form className="mt-6 space-y-4">
        <input type="email" placeholder="Email" required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        <input type="password" placeholder="Password" required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        <button type="submit" className="w-full rounded-full bg-gray-900 py-2.5 text-sm font-semibold text-white">
          {t("admin.login")}
        </button>
      </form>
      {/* Auth: Supabase Auth (email/password), admin role checked via a
          `role` claim / RLS-protected `admins` table — see backend/middleware/auth.js */}
    </div>
  );
}
