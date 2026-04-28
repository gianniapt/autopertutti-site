import type { Metadata } from "next";
import CarFilter from "@/components/vendita/CarFilter";
import CtaBanner from "@/components/home/CtaBanner";
import { Car, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Compra Auto Usate Multisede — Napoli, Agnano, Carrara | Finanziamento Rapido | Auto Per Tutti",
  description:
    "Compra auto usate a Napoli, Agnano e Carrara con finanziamento rapido, permuta valutata, garanzia 12 mesi e consegna a domicilio. Oltre 200 veicoli disponibili.",
};

export default async function VenditaPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string; body?: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-[#1A1A1A] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=60')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#DF0000] rounded-xl flex items-center justify-center">
              <Car className="w-5 h-5 text-white" />
            </div>
            <p className="text-[#DF0000] font-semibold text-sm uppercase tracking-widest">Vendita Auto</p>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white font-[family-name:var(--font-montserrat)] mb-4">
            Trova la tua prossima auto
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Oltre 200 vetture selezionate tra nuove e usate. Finanziamento in giornata, permuta valutata sul posto, garanzia su ogni veicolo.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3 mt-6">
            {["Garanzia 12 mesi", "Finanziamento rapido", "Permuta valutata", "Consegna a domicilio"].map((badge) => (
              <span key={badge} className="inline-flex items-center gap-1.5 bg-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full border border-white/20">
                <span className="w-1.5 h-1.5 bg-[#DF0000] rounded-full" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CarFilter initialBrand={params.brand ?? ""} initialBody={params.body ?? ""} />

          {/* Email capture box */}
          <div className="mt-8 bg-[#DF0000]/5 border-2 border-[#DF0000] rounded-2xl p-6 text-center">
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Non trovi quello che cerchi?</h3>
            <p className="text-gray-600 mb-4">Raccontaci cosa stai cercando. I nostri esperti trovano l'auto giusta per te.</p>
            <a href="https://wa.me/393791137917?text=Cerco%20auto..." className="inline-flex items-center gap-2 px-6 py-3 bg-[#DF0000] text-white font-semibold rounded-full hover:bg-[#B50000]">
              <MessageCircle className="w-5 h-5" />
              Ricevi una consulenza
            </a>
          </div>

          {/* Link to DealerK full catalog */}
          <div className="mt-12 text-center p-8 bg-[#F9FAFB] rounded-2xl border border-gray-100">
            <p className="text-gray-600 mb-3">Vuoi vedere ancora più auto? Visita il nostro catalogo completo su DealerK</p>
            <a
              href="https://www.autopertutti.net/auto/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white font-semibold rounded-full hover:bg-[#DF0000] transition-colors duration-200"
            >
              Vedi catalogo completo →
            </a>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
// Cache busting: 1777410027
