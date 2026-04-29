"use client";

import { useState } from "react";
import { Mail, Phone, User, MessageSquare, CheckCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export default function LeadForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "general",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Track event in GA4
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "lead_submit", {
          service: form.service,
          form_id: "contact_form",
        });
      }

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to submit form");
      }

      // Track conversion
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "conversion", {
          value: 1,
          currency: "EUR",
        });
      }

      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", service: "general", message: "" });
    } catch (err) {
      setError("Errore nell'invio. Riprova o contattaci direttamente via WhatsApp.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-black text-[#1A1A1A] mb-2 font-[family-name:var(--font-montserrat)]">
          Richiesta ricevuta!
        </h3>
        <p className="text-gray-600 mb-4">
          Grazie per il tuo interesse. Ti contatteremo entro 30 minuti durante l'orario lavorativo.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm text-[#DF0000] font-bold hover:underline"
        >
          ← Invia un'altra richiesta
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-2xl mx-auto">
      <h2 className="text-2xl font-black text-[#1A1A1A] mb-6 font-[family-name:var(--font-montserrat)]">
        Contattaci
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <User className="w-4 h-4 text-[#DF0000]" />
            Nome completo *
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DF0000] focus:ring-1 focus:ring-[#DF0000]"
            placeholder="Es. Mario Rossi"
          />
        </div>

        {/* Email */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Mail className="w-4 h-4 text-[#DF0000]" />
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DF0000] focus:ring-1 focus:ring-[#DF0000]"
            placeholder="mario@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Phone className="w-4 h-4 text-[#DF0000]" />
            Telefono *
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DF0000] focus:ring-1 focus:ring-[#DF0000]"
            placeholder="+39 123 456 7890"
          />
        </div>

        {/* Service */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Sei interessato a:
          </label>
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DF0000] focus:ring-1 focus:ring-[#DF0000]"
          >
            <option value="general">Informazioni generali</option>
            <option value="vendita">Acquisto auto</option>
            <option value="noleggio">Noleggio auto</option>
            <option value="officina">Servizio officina</option>
            <option value="altro">Altro</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <MessageSquare className="w-4 h-4 text-[#DF0000]" />
            Messaggio
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DF0000] focus:ring-1 focus:ring-[#DF0000]"
            placeholder="Raccontaci cosa cerchi..."
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#DF0000] text-white font-bold rounded-lg hover:bg-[#B50000] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Invio in corso..." : "Invia richiesta"}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Ti contatteremo entro 30 minuti durante l'orario lavorativo
        </p>
      </form>
    </div>
  );
}
