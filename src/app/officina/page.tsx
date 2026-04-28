import type { Metadata } from "next";
import { Wrench, Clock, Shield, Check } from "lucide-react";
import BookingForm from "@/components/officina/BookingForm";
import SectionReveal from "@/components/shared/SectionReveal";
import servicesData from "@/data/services.json";

export const metadata: Metadata = {
  title: "Officina Autorizzata Multisede — Napoli, Agnano, Carrara | Tagliando, Diagnosi | Auto Per Tutti",
  description:
    "Officina autorizzata multimarca a Napoli, Agnano e Carrara. Tagliando, freni, gomme, diagnosi elettronica, carrozzeria. Ricambi originali con garanzia 12 mesi.",
};

const brandLogos = [
  "Volkswagen", "BMW", "Mercedes-Benz", "Audi", "Toyota",
  "Ford", "Fiat", "Renault", "Peugeot", "Jeep", "Volvo", "Opel",
];

export default function OfficinaPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-[#1A1A1A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=1920&q=60')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#DF0000] rounded-xl flex items-center justify-center">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <p className="text-[#DF0000] font-semibold text-sm uppercase tracking-widest">Officina</p>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white font-[family-name:var(--font-montserrat)] mb-4">
            Officina autorizzata<br className="hidden sm:block" /> multimarca
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mb-6">
            Tecnici certificati, strumentazione Bosch, ricambi originali. Garanzia 12 mesi su tutti gli interventi.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Ricambi originali", "Garanzia 12 mesi", "Diagnosi gratuita*", "Preventivo immediato"].map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5 bg-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full border border-white/20">
                <span className="w-1.5 h-1.5 bg-[#DF0000] rounded-full" />
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="py-16 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10 order-first lg:order-none">
            {/* Services list */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <SectionReveal className="mb-8">
                <h2 className="text-3xl font-black text-[#1A1A1A] font-[family-name:var(--font-montserrat)]">I nostri servizi</h2>
              </SectionReveal>

              <div className="space-y-4">
                {servicesData.services.map((service, i) => (
                  <SectionReveal key={service.id} delay={i * 0.05}>
                    <div className={`bg-white rounded-2xl p-5 border shadow-sm transition-all hover:shadow-md ${service.popular ? "border-[#DF0000]/20" : "border-gray-100"}`}>
                      {service.popular && (
                        <span className="inline-block bg-[#DF0000] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3">
                          Più richiesto
                        </span>
                      )}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-[#1A1A1A] text-lg mb-1 font-[family-name:var(--font-montserrat)]">
                            {service.name}
                          </h3>
                          <p className="text-gray-500 text-sm mb-3">{service.description}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {service.includes.map((item) => (
                              <span key={item} className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                                <Check className="w-3 h-3" />
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs text-gray-400 mb-1">da</p>
                          <p className="text-2xl font-black text-[#DF0000] font-[family-name:var(--font-montserrat)]">
                            €{service.priceFrom}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                            <Clock className="w-3 h-3" />
                            {service.duration}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>

              {/* Brand logos */}
              <SectionReveal className="mt-10">
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#DF0000]" />
                    Marchi supportati
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {brandLogos.map((brand) => (
                      <span key={brand} className="px-3 py-1.5 bg-gray-50 text-gray-600 text-sm rounded-lg border border-gray-200 font-medium">
                        {brand}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-3">* e molti altri marchi su richiesta</p>
                </div>
              </SectionReveal>
            </div>

            {/* Booking form */}
            <div className="order-1 lg:order-2">
              <BookingForm />

              <div className="mt-5 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h4 className="font-bold text-[#1A1A1A] text-sm mb-3">Orari officina</h4>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Lunedì – Venerdì</span>
                    <span className="font-medium">8:00 – 18:30</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Sabato</span>
                    <span className="font-medium">8:00 – 13:00</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Domenica</span>
                    <span>Chiuso</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-12 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { n: "12 mesi", label: "Garanzia su ogni intervento" },
              { n: "Bosch", label: "Strumentazione diagnostica" },
              { n: "OEM", label: "Ricambi originali garantiti" },
              { n: "30 min", label: "Risposta per appuntamenti" },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-[#DF0000] font-black text-2xl mb-1 font-[family-name:var(--font-montserrat)]">{item.n}</p>
                <p className="text-white/60 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
