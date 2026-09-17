"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/lib/i18n/i18n";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "🛕 What makes Trimbakeshwar sacred?",
  "🌊 Ramkund Ghat & Shahi Snan details",
  "🍽️ Where is the best Misal Pav in Nashik?",
  "🚨 Emergency pilgrim helpline numbers",
];

export default function FloatingAiBot() {
  const { t, locale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Namaste! 🙏 I am your Discover Nashik AI Assistant powered by Gemini 3.6. How can I help you with temples, ghats, food, or Kumbh Mela 2027 today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages, loading]);

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
            content: "Sorry, I am unable to connect to the backend server right now. Please try again.",
          },
        ]);
      }
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content: "Network error. Please make sure the backend API is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Floating Chat Pop-up Window */}
      {isOpen && (
        <div className="mb-4 flex h-[540px] w-[92vw] sm:w-[400px] flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-2xl backdrop-blur-md transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              {/* Logo Icon */}
              <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 text-xl backdrop-blur-sm border border-white/30 shadow-inner">
                🤖
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-orange-600"></span>
              </div>
              <div>
                <h3 className="text-sm font-bold leading-none">Discover Nashik AI</h3>
                <p className="mt-1 text-[11px] font-medium text-orange-100 flex items-center gap-1">
                  <span>✨ Powered by Gemini 3.6</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              title="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-orange-50/20 p-4 text-xs">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-orange-600 text-white rounded-br-none font-medium"
                      : "bg-white text-gray-800 border border-gray-100 rounded-bl-none whitespace-pre-wrap"
                  }`}
                >
                  {m.role === "assistant" && (
                    <div className="mb-1 text-[9px] font-bold text-orange-600 uppercase tracking-wider flex items-center gap-1">
                      <span>✨</span>
                      <span>AI Assistant</span>
                    </div>
                  )}
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-none border border-gray-100 bg-white px-3.5 py-2 text-xs font-semibold text-orange-600 shadow-sm flex items-center gap-2">
                  <span className="animate-spin">⏳</span>
                  <span>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="flex items-center gap-1 overflow-x-auto bg-gray-50/80 px-3 py-2 scrollbar-none border-t border-gray-100">
            {SUGGESTIONS.map((sugg, idx) => (
              <button
                key={idx}
                onClick={() => send(sugg.replace(/^[^\s]+\s/, ""))}
                disabled={loading}
                className="shrink-0 rounded-full border border-orange-200 bg-white px-2.5 py-1 text-[11px] font-medium text-orange-800 shadow-2xs hover:bg-orange-50 transition disabled:opacity-50"
              >
                {sugg}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="flex gap-2 border-t border-gray-100 bg-white p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              disabled={loading}
              placeholder="Ask anything about Nashik..."
              className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              className="rounded-full bg-orange-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-orange-700 transition disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button & AI Logo */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 rounded-full bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 p-3.5 sm:px-5 text-white shadow-2xl shadow-orange-600/40 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/60"
        title="Open AI Assistant"
      >
        {/* Pulsing Outer Ring */}
        <span className="absolute -inset-1 rounded-full bg-orange-500 opacity-40 blur-sm animate-pulse group-hover:opacity-75"></span>

        {/* AI Bot Custom Logo Icon */}
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-lg backdrop-blur-md shadow-inner">
          <svg
            className="h-5 w-5 text-white transform group-hover:rotate-12 transition duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <span className="absolute -top-1 -right-1 text-xs">✨</span>
        </div>

        <span className="hidden text-xs font-extrabold tracking-wide sm:inline-block">
          {isOpen ? "Close AI" : "Ask AI Bot"}
        </span>
      </button>
    </div>
  );
}
