"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, Loader2 } from "lucide-react";
import { analytics } from "@/lib/analytics";
import { getABVariant } from "@/lib/abTest";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function AiChatWidget({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [leadFormData, setLeadFormData] = useState({ name: "", phone: "", email: "" });

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Initialize with welcome message + A/B testing
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      analytics.chatOpened();
      const variant = getABVariant("welcome_message", ["A", "B"]);
      analytics.abVariant("welcome_message", variant);

      const welcomeText = variant === "B"
        ? "Ciao! 👋 Cerchi un'auto o hai bisogno di assistenza per officina/noleggio?"
        : "Ciao! Sono l'assistente AI di Auto Per Tutti. Come posso aiutarti?";

      setMessages([
        {
          id: "1",
          role: "assistant",
          content: welcomeText,
        },
      ]);
    }
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Clean up abort controller on close
  useEffect(() => {
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, []);

  const checkPurchaseIntent = (text: string): boolean => {
    const keywords = ["comprare", "preventivo", "appuntamento", "finanziamento", "prova", "richiamarmi"];
    const lowerText = text.toLowerCase();
    return keywords.some(keyword => lowerText.includes(keyword));
  };

  const sendMessage = async () => {
    if (!input.trim() || isStreaming) return;

    setError(null);

    // Add user message
    const userMessageId = Date.now().toString();
    const userMessage: Message = { id: userMessageId, role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);

    // Track message sent
    analytics.chatMessageSent("ai_chat");

    // Check for purchase intent
    if (checkPurchaseIntent(input)) {
      analytics.leadFormShown("ai_chat");
      setTimeout(() => setShowLeadForm(true), 800);
    }

    setInput("");

    // Add empty assistant message for streaming
    const assistantMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: assistantMessageId, role: "assistant", content: "" }]);

    setIsStreaming(true);

    try {
      abortRef.current = new AbortController();

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.map(m => ({ role: m.role, content: m.content }))
            .concat({ role: "user", content: userMessage.content }),
        }),
        signal: abortRef.current.signal,
      });

      if (!response.ok) {
        throw new Error("Failed to get response from API");
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        assistantContent += chunk;

        // Update the last assistant message
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: assistantContent,
          };
          return updated;
        });
      }

      // Track intent keywords in response
      const keywords = ["comprare", "preventivo", "appuntamento", "finanziamento"];
      keywords.forEach(kw => {
        if (assistantContent.toLowerCase().includes(kw)) {
          analytics.purchaseIntentDetected(kw);
        }
      });
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        setError("Errore nella comunicazione con l'AI. Riprova.");
        setMessages(prev => prev.slice(0, -1)); // Remove empty message
      }
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!leadFormData.name || !leadFormData.phone) {
      setError("Nome e telefono sono obbligatori");
      return;
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadFormData.name,
          email: leadFormData.email || "non_fornita@chat.ai",
          phone: leadFormData.phone,
          service: "ai_chat",
          message: "Lead da AI Chat Widget",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit lead");
      }

      setLeadSent(true);
      analytics.leadSubmitted("ai_chat", "ai_chat");
      setLeadFormData({ name: "", phone: "", email: "" });
      setTimeout(() => {
        setShowLeadForm(false);
        setLeadSent(false);
      }, 2000);
    } catch (err) {
      setError("Errore nell'invio del form. Riprova.");
    }
  };

  const handleFeedback = (rating: "positive" | "negative") => {
    analytics.messageFeedback(rating);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 w-full max-w-sm">
      {/* Chat Widget */}
      <div className="rounded-lg shadow-lg overflow-hidden flex flex-col bg-white" style={{ height: "min(520px, calc(100dvh - 120px))" }}>
        {/* Header */}
        <div className="bg-[#1A1A1A] text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#DF0000] flex items-center justify-center">
              <Bot size={16} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm">Assistente AI</p>
              <p className="text-xs text-gray-300">Auto Per Tutti</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto bg-[#F9FAFB] px-4 py-4 space-y-3">
          {messages.length === 1 && messages[0].role === "assistant" && (
            <div className="flex flex-wrap gap-2">
              {["💰 Prezzi noleggio", "🔧 Tagliando da €89", "🚗 Auto usata"].map(q => (
                <button
                  key={q}
                  onClick={() => {
                    setInput(q);
                  }}
                  className="text-xs px-3 py-1 rounded-full border border-gray-300 bg-white hover:border-[#DF0000] hover:text-[#DF0000] transition"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {messages.map(msg => (
            <div key={msg.id}>
              <div
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    msg.role === "user"
                      ? "bg-[#DF0000] text-white rounded-tr-none"
                      : "bg-white text-gray-800 rounded-tl-none border border-gray-200"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
              {msg.role === "assistant" && msg.content && !isStreaming && (
                <div className="flex gap-1 mt-1 justify-start">
                  <button
                    onClick={() => handleFeedback("positive")}
                    className="text-gray-400 hover:text-green-500 text-xs"
                  >
                    👍
                  </button>
                  <button
                    onClick={() => handleFeedback("negative")}
                    className="text-gray-400 hover:text-red-500 text-xs"
                  >
                    👎
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isStreaming && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-lg rounded-tl-none px-4 py-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
            </div>
          )}

          {/* Lead Form */}
          {showLeadForm && !leadSent && (
            <div className="mt-4 p-3 bg-white border border-gray-200 rounded-lg">
              <form onSubmit={handleLeadSubmit} className="space-y-2">
                <input
                  type="text"
                  placeholder="Nome *"
                  value={leadFormData.name}
                  onChange={e => setLeadFormData({ ...leadFormData, name: e.target.value })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  required
                />
                <input
                  type="tel"
                  placeholder="Telefono *"
                  value={leadFormData.phone}
                  onChange={e => setLeadFormData({ ...leadFormData, phone: e.target.value })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  required
                />
                <input
                  type="email"
                  placeholder="Email (opzionale)"
                  value={leadFormData.email}
                  onChange={e => setLeadFormData({ ...leadFormData, email: e.target.value })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
                <button
                  type="submit"
                  className="w-full bg-[#DF0000] text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-700 transition"
                >
                  Invia Richiesta
                </button>
              </form>
            </div>
          )}

          {leadSent && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
              ✓ Richiesta ricevuta! Ti contatteremo entro 30 minuti.
            </div>
          )}
        </div>

        {/* Error Bar */}
        {error && (
          <div className="bg-red-50 border-t border-red-200 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white px-3 py-3 flex gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Scrivi un messaggio..."
            className="flex-1 resize-none border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#DF0000]"
            rows={2}
            disabled={isStreaming}
          />
          <button
            onClick={sendMessage}
            disabled={isStreaming || !input.trim()}
            className="bg-[#DF0000] text-white px-3 py-2 rounded hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isStreaming ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
