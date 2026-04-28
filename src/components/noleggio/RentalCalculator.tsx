"use client";

import { useState } from "react";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import fleetData from "@/data/rental-fleet.json";

const categories = [
  { id: "city", label: "City" },
  { id: "suv", label: "SUV" },
  { id: "premium", label: "Premium" },
  { id: "van", label: "Furgone" },
];

export default function RentalCalculator() {
  const [days, setDays] = useState(3);
  const [category, setCategory] = useState("city");
  const [extras, setExtras] = useState({ gps: false, insurance: false, driver: false });

  const baseVehicle = fleetData.find((v) => v.category === category);
  const basePrice = baseVehicle?.pricePerDay ?? 35;
  const gpsPrice = 5;
  const insurancePrice = 15;
  const driverPrice = 80;

  const daily =
    basePrice +
    (extras.gps ? gpsPrice : 0) +
    (extras.insurance ? insurancePrice : 0) +
    (extras.driver ? driverPrice : 0);
  const total = daily * days;

  const waMsg = encodeURIComponent(
    `Ciao! Vorrei noleggiare un'auto ${categories.find(c => c.id === category)?.label} per ${days} giorni. Totale stimato: €${total}. Posso prenotare?`
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8 sticky top-24">
      <h3 className="text-xl font-black text-[#1A1A1A] font-[family-name:var(--font-montserrat)] mb-6">
        Calcola il tuo noleggio
      </h3>

      {/* Category */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Categoria veicolo
        </label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${
                category === c.id
                  ? "bg-[#DF0000] text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Days */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Numero di giorni
          </label>
          <span className="text-[#DF0000] font-bold text-lg">{days} gg</span>
        </div>
        <input
          type="range"
          min={1}
          max={30}
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="w-full h-2 rounded-full accent-[#DF0000]"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1 giorno</span>
          <span>30 giorni</span>
        </div>
      </div>

      {/* Extras */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Opzioni aggiuntive
        </label>
        <div className="space-y-2">
          {[
            { key: "gps", label: "GPS Navigatore", price: gpsPrice },
            { key: "insurance", label: "Assicurazione Kasko", price: insurancePrice },
            { key: "driver", label: "Con conducente", price: driverPrice },
          ].map(({ key, label, price }) => (
            <label
              key={key}
              className="flex items-center justify-between p-3 rounded-xl border border-gray-100 cursor-pointer hover:border-[#DF0000]/30 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={extras[key as keyof typeof extras]}
                  onChange={(e) => setExtras((x) => ({ ...x, [key]: e.target.checked }))}
                  className="accent-[#DF0000] w-4 h-4 rounded"
                />
                <span className="text-sm text-gray-700">{label}</span>
              </div>
              <span className="text-sm font-semibold text-gray-500">+€{price}/gg</span>
            </label>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="bg-[#F9FAFB] rounded-xl p-4 mb-5">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>€{daily}/giorno × {days} giorni</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-[#1A1A1A]">Totale stimato</span>
          <span className="text-3xl font-black text-[#DF0000] font-[family-name:var(--font-montserrat)]">
            €{total}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-1">IVA inclusa · prezzo indicativo</p>
      </div>

      {/* CTA */}
      <div className="space-y-2">
        <a
          href={`https://wa.me/393791137917?text=${waMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex items-center justify-center gap-2 w-full py-3.5 bg-[#DF0000] text-white font-bold rounded-full"
        >
          <MessageCircle className="w-5 h-5" />
          Prenota su WhatsApp
        </a>
        <a
          href="tel:+390815763372"
          className="flex items-center justify-center gap-2 w-full py-3 text-sm text-gray-500 hover:text-[#DF0000] transition-colors"
        >
          <Phone className="w-4 h-4" />
          Oppure chiama 081 576 3372
        </a>
      </div>
    </div>
  );
}
