"use client";

import { useState, useRef } from "react";
import { Phone, X, MessageCircle, Bot, Mic, PhoneOff } from "lucide-react";
import { AiChatWidget } from "./AiChatWidget";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

const channels = [
  {
    label: "WhatsApp",
    href: "https://wa.me/393791137917?text=Ciao%20Auto%20Per%20Tutti!%20Vorrei%20maggiori%20informazioni.",
    bg: "bg-[#25D366]",
    icon: <WhatsAppIcon className="w-5 h-5" />,
    external: true,
  },
  {
    label: "Telegram",
    href: "https://t.me/autopertutti",
    bg: "bg-[#229ED9]",
    icon: <TelegramIcon className="w-5 h-5" />,
    external: true,
  },
  {
    label: "Chiama ora",
    href: "tel:+390815763372",
    bg: "bg-[#1A1A1A]",
    icon: <Phone className="w-5 h-5" />,
    external: false,
  },
];

export default function MultiMessengerWidget() {
  const [open, setOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [isVapiActive, setIsVapiActive] = useState(false);
  const vapiRef = useRef<any>(null);

  const handleVoiceCall = async () => {
    if (isVapiActive && vapiRef.current) {
      vapiRef.current.stop();
      setIsVapiActive(false);
      return;
    }

    try {
      const { default: Vapi } = await import("@vapi-ai/web");
      const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!);
      vapiRef.current = vapi;

      vapi.on("call-start", () => setIsVapiActive(true));
      vapi.on("call-end", () => {
        setIsVapiActive(false);
        vapiRef.current = null;
      });
      vapi.on("error", () => {
        setIsVapiActive(false);
        vapiRef.current = null;
      });

      await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!);
      setOpen(false);
    } catch (error) {
      console.error("VAPI error:", error);
      setIsVapiActive(false);
    }
  };

  return (
    <>
      <AiChatWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-2.5">
        {open && (
          <>
            {/* Standard channels */}
            {channels.map((ch, i) => (
              <a
                key={ch.label}
                href={ch.href}
                target={ch.external ? "_blank" : undefined}
                rel={ch.external ? "noopener noreferrer" : undefined}
                className={`flex items-center gap-2.5 ${ch.bg} text-white text-sm font-bold px-4 py-2.5 rounded-full shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-200`}
                style={{
                  animation: `slideUp 0.2s ease ${i * 0.05}s both`,
                }}
              >
                {ch.icon}
                {ch.label}
              </a>
            ))}

            {/* Chat AI */}
            <button
              onClick={() => {
                setChatOpen(true);
                setOpen(false);
              }}
              className={`flex items-center gap-2.5 bg-[#DF0000] text-white text-sm font-bold px-4 py-2.5 rounded-full shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-200`}
              style={{
                animation: `slideUp 0.2s ease ${channels.length * 0.05}s both`,
              }}
            >
              <Bot className="w-5 h-5" />
              Chat AI
            </button>

            {/* Call AI */}
            <button
              onClick={handleVoiceCall}
              className={`flex items-center gap-2.5 ${
                isVapiActive ? "bg-[#7C3AED] vapi-active" : "bg-[#7C3AED]"
              } text-white text-sm font-bold px-4 py-2.5 rounded-full shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-200`}
              style={{
                animation: `slideUp 0.2s ease ${(channels.length + 1) * 0.05}s both`,
              }}
            >
              {isVapiActive ? (
                <>
                  <PhoneOff className="w-5 h-5" />
                  Termina
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5" />
                  Chiama AI
                </>
              )}
            </button>
          </>
        )}

        <button
          onClick={() => setOpen(!open)}
          className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
            open ? "bg-[#1A1A1A] rotate-90" : "bg-[#DF0000]"
          }`}
          aria-label={open ? "Chiudi" : "Contattaci"}
        >
          {open ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-7 h-7 text-white" />
          )}
        </button>
      </div>
    </>
  );
}
