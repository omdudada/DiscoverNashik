"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/lib/i18n/i18n";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "🛕 What makes Trimbakeshwar Temple sacred?",
  "🌊 Tell me about Ramkund & Kumbh Mela Shahi Snan",
  "🍽️ Where to find the best authentic Misal Pav?",
  "⛰️ Top trek routes around Nashik & Brahmagiri",
  "🚨 Emergency contacts & pilgrim helplines",
];

export default function AiChatPage() {
  const { t, locale } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Namaste! 🙏 I am your official Discover Nashik AI Assistant powered by Gemini 3.6. Ask me anything about temples, ghats, Kumbh Mela 2027, local food, or travel guidance in Nashik!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  async function send(queryText?: string) {
    const textToSend = (queryText || input).trim();
    if (!textToSend || loading) return;

    const next = [...messages, { role: "user" as const, content: textToSend }];
    setMessages(next);
    if (!queryText) setInput("");
    setLoading(true);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";
      const res = await fetch(`${API_BASE}/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, locale }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages([...next, { role: "assistant", content: data.reply || "I am here to help!" }]);
      } else {
        setMessages([
          ...next,
          {
            role: "assistant",
            content: "Sorry, I am unable to connect to the backend server right now. Please try again in a moment.",
          },
        ]);
      }
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content: "Network connection error. Please ensure the backend server is running on port 5000.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex h-[82vh] max-w-4xl flex-col px-4 py-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-orange-100 pb-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span>✨</span>
            <span>{t("aiChat.title")}</span>
            <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-semibold text-orange-800 border border-orange-200">
              Gemini 3.6 Flash
            </span>
          </h1>
          <p className="mt-1 text-xs text-gray-500">{t("aiChat.disclaimer")}</p>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="text-xs font-semibold text-gray-400 hover:text-orange-600 transition"
          title="Clear Chat History"
        >
          Clear Chat 🗑️
        </button>
      </div>

      {/* Chat Messages Box */}
      <div className="flex-1 space-y-4 overflow-y-auto rounded-2xl border border-gray-200 bg-orange-50/20 p-4 shadow-inner">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-orange-600 text-white rounded-br-none"
                  : "bg-white text-gray-800 border border-gray-100 rounded-bl-none whitespace-pre-wrap"
              }`}
            >
              {m.role === "assistant" && (
                <div className="mb-1 text-[10px] font-bold text-orange-600 uppercase tracking-wider flex items-center gap-1">
                  <span>🤖</span>
                  <span>Discover Nashik AI</span>
                </div>
              )}
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-none border border-gray-100 bg-white px-4 py-3 text-xs font-semibold text-orange-600 shadow-sm flex items-center gap-2">
              <span className="animate-spin text-base">⏳</span>
              <span>Thinking & fetching details...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestion Chips */}
      <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {SUGGESTIONS.map((sugg, idx) => (
          <button
            key={idx}
            onClick={() => send(sugg.replace(/^[^\s]+\s/, ""))}
            disabled={loading}
            className="shrink-0 rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-medium text-orange-800 shadow-sm transition hover:bg-orange-50 hover:border-orange-300 disabled:opacity-50"
          >
            {sugg}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="mt-2 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          disabled={loading}
          placeholder={t("aiChat.placeholder")}
          className="flex-1 rounded-full border-2 border-orange-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:bg-gray-100"
        />
        <button
          onClick={() => send()}
          disabled={loading || !input.trim()}
          className="rounded-full bg-orange-600 px-6 py-2.5 text-sm font-bold text-white shadow hover:bg-orange-700 transition disabled:opacity-50"
        >
          {loading ? "Sending..." : t("common.submit")}
        </button>
      </div>
    </div>
  );
}
