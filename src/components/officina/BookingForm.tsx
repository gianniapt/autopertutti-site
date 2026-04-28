"use client";

import { useState } from "react";
import { MessageCircle, Check } from "lucide-react";
import servicesData from "@/data/services.json";

interface FormData {
  name: string;
  phone: string;
  car: string;
  service: string;
  date: string;
  note: string;
}

export default function BookingForm() {
  const [form, setForm] = useState<FormData>({ name: "", phone: "", car: "", service: "", date: "", note: "" });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = "Nome richiesto";
    if (!form.phone.match(/^[\d\s+\-()]{7,}$/)) e.phone = "Telefono non valido";
    if (!form.car.trim()) e.car = "Inserisci il modello";
    if (!form.service) e.service = "Seleziona il servizio";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const msg = encodeURIComponent(
      `🔧 Prenotazione Officina\n\nNome: ${form.name}\nTelefono: ${form.phone}\nAuto: ${form.car}\nServizio: ${form.service}\nData preferita: ${form.date || "Da concordare"}\nNote: ${form.note || "Nessuna"}`
    );
    window.open(`https://wa.me/393791137917?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
        <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-7 h-7 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Richiesta inviata!</h3>
        <p className="text-gray-500 text-sm">Ti contatteremo entro 30 minuti durante l'orario lavorativo per confermare l'appuntamento.</p>
        <button onClick={() => setSubmitted(false)} className="mt-5 text-sm text-[#DF0000] font-medium hover:underline">
          Nuova prenotazione
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-xl font-black text-[#1A1A1A] font-[family-name:var(--font-montserrat)] mb-5">
        Prenota appuntamento
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              type="text"
              placeholder="Nome e Cognome *"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#DF0000]/30 focus:border-[#DF0000] transition-colors ${errors.name ? "border-red-300" : "border-gray-200"}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <input
              type="tel"
              placeholder="Telefono *"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#DF0000]/30 focus:border-[#DF0000] transition-colors ${errors.phone ? "border-red-300" : "border-gray-200"}`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <input
            type="text"
            placeholder="Marca e modello auto *"
            value={form.car}
            onChange={(e) => setForm((f) => ({ ...f, car: e.target.value }))}
            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#DF0000]/30 focus:border-[#DF0000] transition-colors ${errors.car ? "border-red-300" : "border-gray-200"}`}
          />
          {errors.car && <p className="text-red-500 text-xs mt-1">{errors.car}</p>}
        </div>

        <div>
          <select
            value={form.service}
            onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#DF0000]/30 focus:border-[#DF0000] transition-colors bg-white ${errors.service ? "border-red-300" : "border-gray-200"}`}
          >
            <option value="">Seleziona servizio *</option>
            {servicesData.services.map((s) => (
              <option key={s.id} value={s.name}>{s.name} — da €{s.priceFrom}</option>
            ))}
          </select>
          {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
        </div>

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
          min={new Date().toISOString().split("T")[0]}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#DF0000]/30 focus:border-[#DF0000] transition-colors"
        />

        <textarea
          placeholder="Note aggiuntive (opzionale)"
          value={form.note}
          onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#DF0000]/30 focus:border-[#DF0000] transition-colors resize-none"
        />

        <button
          type="submit"
          className="btn-primary flex items-center justify-center gap-2 w-full py-3.5 bg-[#DF0000] text-white font-bold rounded-full"
        >
          <MessageCircle className="w-5 h-5" />
          Invia via WhatsApp
        </button>
        <p className="text-xs text-gray-400 text-center">
          Risposta garantita entro 30 minuti durante l'orario lavorativo
        </p>
      </form>
    </div>
  );
}
