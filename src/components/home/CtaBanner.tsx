import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import SectionReveal from "@/components/shared/SectionReveal";

export default function CtaBanner() {
  return (
    <section className="py-20 bg-[#DF0000] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full" />
      <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-black/10 rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-white font-[family-name:var(--font-montserrat)] mb-4">
            Non sai quale auto scegliere? Chiedi ai nostri esperti
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Contattaci su WhatsApp per una risposta in 5 minuti, o chiamaci per una consulenza dettagliata. Disponibili Lun-Sab, 9:00-19:00.
          </p>
          <div className="flex flex-col gap-4 sm:gap-3 sm:flex-row justify-center">
            <a
              href="https://wa.me/393791137917?text=Ciao!%20Vorrei%20maggiori%20informazioni%20sui%20vostri%20servizi."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3.5 bg-white text-[#DF0000] font-bold rounded-full hover:bg-gray-50 transition-all duration-200 hover:shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Scrivici su WhatsApp
            </a>
            <a
              href="tel:+390815763372"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3.5 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-200"
            >
              <Phone className="w-5 h-5" />
              Chiamaci ora
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
