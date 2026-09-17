"use client";
import { useState } from "react";
import { useTranslation } from "@/lib/i18n/i18n";

export default function GroupTrackerPage() {
  const { t } = useTranslation();
  const [groupCode, setGroupCode] = useState("");

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900">{t("groupTracker.title")}</h1>

      <div className="mt-6 space-y-3">
        <button className="w-full rounded-full bg-orange-600 py-2.5 text-sm font-semibold text-white">
          {t("groupTracker.createGroup")}
        </button>

        <div className="flex gap-2">
          <input
            value={groupCode}
            onChange={(e) => setGroupCode(e.target.value)}
            placeholder={t("groupTracker.groupCode")}
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
          <button className="rounded-full border border-orange-600 px-4 py-2 text-sm font-semibold text-orange-600">
            {t("groupTracker.joinGroup")}
          </button>
        </div>
      </div>

      <button className="mt-8 w-full rounded-full border border-red-500 py-2.5 text-sm font-semibold text-red-600">
        {t("groupTracker.imMisplaced")}
      </button>
      {/* Real-time member locations/status: implemented via WebSocket
          (Socket.IO) connection to the Group Tracker service — see
          backend/routes/groups.routes.js for the REST setup and
          backend/services notes for the realtime layer. */}
    </div>
  );
}
