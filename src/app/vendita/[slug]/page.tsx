import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Fuel, Settings, Gauge, MapPin, Calendar, ArrowLeft, Phone, MessageCircle } from "lucide-react";
import carsData from "@/data/cars.json";

export async function generateStaticParams() {
  return carsData.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const car = carsData.find((c) => c.id === slug);
  if (!car) return { title: "Auto non trovata" };
  return {
    title: `${car.brand} ${car.model} ${car.year} | Auto Per Tutti`,
    description: `${car.brand} ${car.model} ${car.year}, ${car.km?.toLocaleString("it-IT") || ''} km, ${car.fuel}, ${car.transmission}. Prezzo €${car.price.toLocaleString("it-IT")}.`,
  };
}

export default async function CarDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const car = carsData.find((c) => c.id === slug);
  if (!car) notFound();

  const waMsg = encodeURIComponent(
    `Ciao! Sono interessato alla ${car.brand} ${car.model} ${car.year} (€${car.price.toLocaleString("it-IT")}). Posso avere più informazioni?`
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/vendita"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#DF0000] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Torna al catalogo
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: image + specs */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-6">
              <div className="relative h-72 sm:h-96">
                <Image
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  className="object-cover"
                  priority
                />
                {car.badge && (
                  <span className="absolute top-4 left-4 bg-[#DF0000] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {car.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Specs */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-[#1A1A1A] mb-4 font-[family-name:var(--font-montserrat)]">Caratteristiche tecniche</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { icon: Fuel, label: "Carburante", value: car.fuel },
                  { icon: Settings, label: "Cambio", value: car.transmission },
                  { icon: Gauge, label: "Potenza", value: car.power },
                  { icon: Calendar, label: "Anno", value: String(car.year) },
                  { icon: Gauge, label: "Chilometri", value: `${car.km?.toLocaleString("it-IT") || ''} km` },
                  { icon: MapPin, label: "Sede", value: car.location },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-[#F9FAFB] rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                      <Icon className="w-3.5 h-3.5" />
                      {label}
                    </div>
                    <p className="font-semibold text-[#1A1A1A] text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: price + CTA */}
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{car.brand}</p>
              <h1 className="text-2xl font-black text-[#1A1A1A] font-[family-name:var(--font-montserrat)] mb-1">
                {car.model}
              </h1>
              <p className="text-gray-400 text-sm mb-4">{car.year} · {car.km?.toLocaleString("it-IT") || ''} km</p>

              <div className="text-4xl font-black text-[#DF0000] mb-6">
                €{car.price.toLocaleString("it-IT")}
              </div>

              <div className="space-y-3">
                <a
                  href={`https://wa.me/393791137917?text=${waMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center justify-center gap-2 w-full py-3.5 bg-[#DF0000] text-white font-bold rounded-full"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chiedi info su WhatsApp
                </a>
                <a
                  href="tel:+390815763372"
                  className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold rounded-full hover:bg-[#1A1A1A] hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Chiama: 081 576 3372
                </a>
              </div>

              <div className="mt-5 pt-5 border-t border-gray-100 space-y-2">
                {["Garanzia 12 mesi inclusa", "Finanziamento in giornata", "Permuta valutata", "Consegna a domicilio"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-4 h-4 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-[10px]">✓</span>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
