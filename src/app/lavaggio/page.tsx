import type { Metadata } from "next";
import { Droplets, Check, X, Clock, MessageCircle, Phone } from "lucide-react";
import SectionReveal from "@/components/shared/SectionReveal";
import washData from "@/data/wash-packages.json";

export const metadata: Metadata = {
  title: "Autolavaggio Professionale Multisede — Napoli, Agnano, Carrara | Pacchetti Premium | Auto Per Tutti",
  description:
    "Autolavaggio professionale a Napoli, Agnano e Carrara. Tre pacchetti: Basic, Premium e VIP con detailing completo. Risultato garantito.",
};

export default function LavaggioPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-[#1A1A1A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=1920&q=60')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#DF0000] rounded-xl flex items-center justify-center">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <p className="text-[#DF0000] font-semibold text-sm uppercase tracking-widest">Autolavaggio</p>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white font-[family-name:var(--font-montserrat)] mb-4">
            La tua auto brillerà<br className="hidden sm:block" /> come nuova
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-6">
            Autolavaggio professionale a mano con prodotti premium. Tre pacchetti per ogni esigenza, con detailing completo per il massimo risultato.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <p className="text-[#DF0000] font-semibold text-sm uppercase tracking-widest mb-3">I nostri pacchetti</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] font-[family-name:var(--font-montserrat)]">
              Scegli il tuo trattamento
            </h2>
          </SectionReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {washData.packages.map((pkg, i) => (
              <SectionReveal key={pkg.id} delay={i * 0.15}>
                <div className={`relative bg-white rounded-2xl overflow-hidden shadow-sm border transition-all hover:shadow-xl ${pkg.popular ? "border-[#DF0000] ring-2 ring-[#DF0000]/20" : "border-gray-100"}`}>
                  {pkg.popular && (
                    <div className="absolute top-0 left-0 right-0 text-center py-2 bg-[#DF0000] text-white text-xs font-bold uppercase tracking-wider">
                      Il più scelto
                    </div>
                  )}
                  <div className={`p-6 ${pkg.popular ? "pt-10" : ""}`}>
                    {/* Header */}
                    <div className="mb-5">
                      <h3 className="text-2xl font-black font-[family-name:var(--font-montserrat)]" style={{ color: pkg.color }}>
                        {pkg.name}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">{pkg.tagline}</p>
                    </div>

                    {/* Price grid */}
                    <div className="grid grid-cols-3 gap-2 mb-5">
                      {[
                        { label: "Auto", price: pkg.priceAuto },
                        { label: "SUV", price: pkg.priceSUV },
                        { label: "Furgone", price: pkg.priceVan },
                      ].map(({ label, price }) => (
                        <div key={label} className="text-center bg-gray-50 rounded-xl py-2">
                          <p className="text-[10px] text-gray-400 mb-0.5">{label}</p>
                          <p className="text-lg font-black" style={{ color: pkg.popular ? "#DF0000" : "#1A1A1A" }}>€{price}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-5">
                      <Clock className="w-3.5 h-3.5" />
                      Durata: {pkg.duration}
                    </div>

                    {/* Includes */}
                    <div className="space-y-1.5 mb-5">
                      {pkg.includes.map((item) => (
                        <div key={item} className="flex items-start gap-2 text-sm text-gray-700">
                          <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          {item}
                        </div>
                      ))}
                      {pkg.excludes.map((item) => (
                        <div key={item} className="flex items-start gap-2 text-sm text-gray-300">
                          <X className="w-4 h-4 mt-0.5 shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <a
                      href={`https://wa.me/393791137917?text=${encodeURIComponent(`Ciao! Vorrei prenotare il pacchetto ${pkg.name} dell'autolavaggio.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition-all ${pkg.popular ? "bg-[#DF0000] text-white hover:bg-[#B50000] shadow-lg shadow-red-500/20" : "border-2 border-gray-200 text-gray-700 hover:border-[#DF0000] hover:text-[#DF0000]"}`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      Prenota {pkg.name}
                    </a>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-10">
            <h2 className="text-3xl font-black text-[#1A1A1A] font-[family-name:var(--font-montserrat)]">
              Servizi aggiuntivi
            </h2>
            <p className="text-gray-500 mt-2">Aggiungi a qualsiasi pacchetto</p>
          </SectionReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {washData.addons.map((addon, i) => (
              <SectionReveal key={addon.id} delay={i * 0.1}>
                <div className="bg-[#F9FAFB] rounded-xl p-5 border border-gray-100 hover:border-[#DF0000]/30 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-[#1A1A1A] text-sm">{addon.name}</h4>
                    <span className="text-[#DF0000] font-black">+€{addon.price}</span>
                  </div>
                  <p className="text-xs text-gray-500">{addon.description}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1A1A1A]">
        <div className="max-w-xl mx-auto px-4 text-center">
          <SectionReveal>
            <h2 className="text-3xl font-black text-white font-[family-name:var(--font-montserrat)] mb-4">
              Prenota il tuo lavaggio
            </h2>
            <p className="text-white/60 mb-6">Disponibile a Napoli – Agnano. Aperto dal Lunedì al Sabato 8:00–19:00.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/393791137917?text=Ciao!%20Vorrei%20prenotare%20un%20autolavaggio."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#DF0000] text-white font-bold rounded-full hover:bg-[#B50000] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Prenota su WhatsApp
              </a>
              <a
                href="tel:+390815763372"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-colors"
              >
                <Phone className="w-5 h-5" />
                081 576 3372
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
