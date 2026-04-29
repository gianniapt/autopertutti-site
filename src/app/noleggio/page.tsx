import type { Metadata } from "next";
import Image from "next/image";
import { Key, Users, Fuel, Settings, Check } from "lucide-react";
import RentalCalculator from "@/components/noleggio/RentalCalculator";
import SectionReveal from "@/components/shared/SectionReveal";
import fleetData from "@/data/rental-fleet.json";

export const metadata: Metadata = {
  title: "Noleggio Auto Multisede — da €30/giorno | Napoli, Agnano, Carrara | Auto Per Tutti",
  description:
    "Noleggio auto a Napoli, Agnano e Carrara da €30/giorno. City car, SUV, premium e furgoni. Prenotazione rapida, assicurazione inclusa, consegna e ritiro.",
};

const categoryColors: Record<string, string> = {
  city: "bg-blue-50 text-blue-600",
  suv: "bg-green-50 text-green-600",
  premium: "bg-amber-50 text-amber-600",
  van: "bg-purple-50 text-purple-600",
};

export default function NoleggioPage() {
  const categories = [
    { id: "city", label: "City", desc: "Ideali per la città" },
    { id: "suv", label: "SUV", desc: "Per famiglie e viaggi" },
    { id: "premium", label: "Premium", desc: "Massimo comfort" },
    { id: "van", label: "Furgoni", desc: "Per lavoro e traslochi" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-[#1A1A1A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1920&q=60')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#DF0000] rounded-xl flex items-center justify-center">
              <Key className="w-5 h-5 text-white" />
            </div>
            <p className="text-[#DF0000] font-semibold text-sm uppercase tracking-widest">Noleggio Auto</p>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white font-[family-name:var(--font-montserrat)] mb-4">
            Noleggio flessibile<br className="hidden sm:block" /> a Napoli
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mb-6">
            City car, SUV, premium e furgoni. Noleggio da 1 giorno a più mesi. Senza sorprese, con assicurazione inclusa.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Da €30/giorno", "Nessuna franchigia nascosta", "Consegna e ritiro", "Assicurazione disponibile"].map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5 bg-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full border border-white/20">
                <span className="w-1.5 h-1.5 bg-[#DF0000] rounded-full" />
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10 order-first lg:order-none">
            {/* Fleet */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <SectionReveal className="mb-8">
                <h2 className="text-3xl font-black text-[#1A1A1A] font-[family-name:var(--font-montserrat)]">Il nostro parco auto</h2>
              </SectionReveal>

              {categories.map((cat) => {
                const vehicles = fleetData.filter((v) => v.category === cat.id);
                if (!vehicles.length) return null;
                return (
                  <div key={cat.id} className="mb-10">
                    <SectionReveal>
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${categoryColors[cat.id]}`}>{cat.label}</span>
                        <span className="text-gray-400 text-sm">{cat.desc}</span>
                      </div>
                    </SectionReveal>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {vehicles.map((v, i) => (
                        <SectionReveal key={v.id} delay={i * 0.1}>
                          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 car-card">
                            <div className="relative h-40">
                              <Image src={v.image} alt={`${v.brand} ${v.model}`} width={400} height={300} className="object-cover w-full h-full" unoptimized />
                            </div>
                            <div className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <p className="text-xs text-gray-400">{v.brand}</p>
                                    {v.rentalType === "long" ? (
                                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">NLT</span>
                                    ) : (
                                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-100 text-green-700">Breve</span>
                                    )}
                                  </div>
                                  <h3 className="font-bold text-[#1A1A1A]">{v.model}</h3>
                                </div>
                                <div className="text-right">
                                  {v.rentalType === "long" ? (
                                    <>
                                      <div className="text-[#DF0000] font-black text-xl">€{v.pricePerMonth}<span className="text-xs text-gray-400 font-normal">/mese</span></div>
                                      <div className="text-xs text-gray-400">≈ €{v.pricePerDay}/gg</div>
                                    </>
                                  ) : (
                                    <span className="text-[#DF0000] font-black text-xl">€{v.pricePerDay}<span className="text-xs text-gray-400 font-normal">/gg</span></span>
                                  )}
                                </div>
                              </div>
                              <p className="text-xs text-gray-500 mb-3">{v.description}</p>
                              <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 border-t border-gray-100 pt-3">
                                <div className="flex items-center gap-1"><Users className="w-3 h-3" />{v.passengers} pax</div>
                                <div className="flex items-center gap-1"><Fuel className="w-3 h-3" />{v.fuel}</div>
                                <div className="flex items-center gap-1"><Settings className="w-3 h-3" />{v.transmission}</div>
                              </div>
                            </div>
                          </div>
                        </SectionReveal>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Calculator */}
            <div className="order-1 lg:order-2">
              <RentalCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Why rent with us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-10">
            <h2 className="text-3xl font-black text-[#1A1A1A] font-[family-name:var(--font-montserrat)]">Perché scegliere Auto Per Tutti</h2>
          </SectionReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Flotta curata", desc: "Veicoli revisionati e puliti ad ogni consegna" },
              { title: "Prezzi trasparenti", desc: "Nessun costo nascosto, tutto incluso nel preventivo" },
              { title: "Prenotazione rapida", desc: "Conferma in pochi minuti via WhatsApp" },
              { title: "Assistenza H24", desc: "Numero dedicato per emergenze stradali" },
            ].map((item, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className="text-center p-5">
                  <div className="w-10 h-10 bg-[#DF0000]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Check className="w-5 h-5 text-[#DF0000]" />
                  </div>
                  <h3 className="font-bold text-[#1A1A1A] mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
