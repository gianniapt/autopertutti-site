import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/shared/SocialIcons";
import SectionReveal from "@/components/shared/SectionReveal";
import LeadForm from "@/components/contatti/LeadForm";

export const metadata: Metadata = {
  title: "Contatti Auto Per Tutti — 3 Sedi Napoli, Agnano, Carrara — Tel/WhatsApp",
  description:
    "Contatta Auto Per Tutti. Tre sedi a Napoli, Agnano e Carrara. Tel: 081 576 3372. WhatsApp: +39 379 113 7917. Risposta garantita entro 30 minuti.",
};

const locations = [
  {
    name: "Agnano (sede principale)",
    address: "Via Circumflegrea, 80078 Pozzuoli (NA)",
    phone: "+39 081 576 3372",
    email: "info@autopertutti.it",
    hours: [
      { days: "Lun – Ven", time: "9:00 – 19:00" },
      { days: "Sabato", time: "9:00 – 17:00" },
      { days: "Domenica", time: "Chiuso" },
    ],
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.0!2d14.1553!3d40.8289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b08c5a6e8b0b5%3A0x0!2sVia+Circumflegrea%2C+Pozzuoli+NA!5e0!3m2!1sit!2sit!4v1620000000000",
    primary: true,
  },
  {
    name: "Napoli",
    address: "Via Nuova Agnano, Napoli (NA)",
    phone: "+39 081 576 3372",
    email: "info@autopertutti.it",
    hours: [
      { days: "Lun – Ven", time: "9:00 – 19:00" },
      { days: "Sabato", time: "9:00 – 17:00" },
      { days: "Domenica", time: "Chiuso" },
    ],
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.0!2d14.1953!3d40.8689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b0eff4b6a30e5%3A0x0!2sNapoli+NA!5e0!3m2!1sit!2sit!4v1620000000000",
    primary: false,
  },
  {
    name: "Carrara",
    address: "Via Carriona, 54033 Carrara (MS)",
    phone: "+39 081 576 3372",
    email: "info@autopertutti.it",
    hours: [
      { days: "Lun – Ven", time: "9:00 – 18:00" },
      { days: "Sabato", time: "9:00 – 13:00" },
      { days: "Domenica", time: "Chiuso" },
    ],
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.0!2d10.0981!3d44.0781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d4e1e2b5cc0c6b%3A0x0!2sVia+Carriona%2C+Carrara+MS!5e0!3m2!1sit!2sit!4v1620000000000",
    primary: false,
  },
];

export default function ContattiPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#DF0000] font-semibold text-sm uppercase tracking-widest mb-3">Contatti</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white font-[family-name:var(--font-montserrat)] mb-4">
            Siamo qui per te
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Tre sedi operative. Risposta garantita entro 30 minuti su WhatsApp durante l'orario lavorativo.
          </p>
        </div>
      </section>

      {/* Quick contact */}
      <section className="py-8 bg-[#DF0000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center sm:justify-between items-center">
            <a href="https://wa.me/393791137917" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-bold hover:opacity-80 transition-opacity">
              <MessageCircle className="w-5 h-5" />
              WhatsApp: +39 379 113 7917
            </a>
            <a href="tel:+390815763372" className="inline-flex items-center gap-2 text-white font-bold hover:opacity-80">
              <Phone className="w-5 h-5" />
              Telefono: 081 576 3372
            </a>
            <a href="mailto:info@autopertutti.it" className="inline-flex items-center gap-2 text-white font-bold hover:opacity-80">
              <Mail className="w-5 h-5" />
              info@autopertutti.it
            </a>
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="mb-12">
            <p className="text-center text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3">
              Inviaci un messaggio
            </p>
            <h2 className="text-center text-3xl font-black text-[#1A1A1A] font-[family-name:var(--font-montserrat)]">
              Raccontaci cosa cerchi
            </h2>
          </SectionReveal>
          <LeadForm />
        </div>
      </section>

      {/* Locations */}
      <section className="py-16 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-3xl font-black text-[#1A1A1A] font-[family-name:var(--font-montserrat)]">
              Le nostre sedi
            </h2>
          </SectionReveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {locations.map((loc, i) => (
              <SectionReveal key={loc.name} delay={i * 0.1}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-full flex flex-col">
                  {/* Map */}
                  <div className="h-40 bg-gray-100">
                    <iframe
                      src={loc.mapSrc}
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: 160 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  {/* Info */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-black text-[#1A1A1A] font-[family-name:var(--font-montserrat)] mb-3">
                      {loc.name}
                    </h3>
                    <div className="space-y-2 text-sm flex-1">
                      <div className="flex items-start gap-2 text-gray-600">
                        <MapPin className="w-3.5 h-3.5 text-[#DF0000] mt-0.5 shrink-0" />
                        <span className="text-xs">{loc.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#DF0000] shrink-0" />
                        <a href={`tel:${loc.phone.replace(/\s/g, "")}`} className="text-xs text-gray-600 hover:text-[#DF0000] transition-colors">
                          {loc.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-[#DF0000] shrink-0" />
                        <a href={`mailto:${loc.email}`} className="text-xs text-gray-600 hover:text-[#DF0000] transition-colors">
                          {loc.email}
                        </a>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#DF0000] mt-0.5 shrink-0" />
                        <div className="space-y-0.5">
                          {loc.hours.map((h) => (
                            <div key={h.days} className={`flex gap-2 text-xs ${h.time === "Chiuso" ? "text-gray-300" : "text-gray-600"}`}>
                              <span className="w-20">{h.days}</span>
                              <span className="font-medium">{h.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <a
                        href={`https://wa.me/393791137917?text=${encodeURIComponent(`Ciao! Vi contatto dalla sede di ${loc.name}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1 py-2 bg-[#DF0000] text-white text-xs font-bold rounded-full hover:bg-[#B50000] transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        WhatsApp
                      </a>
                      <a
                        href={`tel:${loc.phone.replace(/\s/g, "")}`}
                        className="flex-1 flex items-center justify-center gap-1 py-2 border-2 border-gray-200 text-gray-700 text-xs font-bold rounded-full hover:border-[#DF0000] hover:text-[#DF0000] transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Chiama
                      </a>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <p className="text-gray-500 text-sm mb-4">Seguici sui social</p>
            <div className="flex justify-center gap-4">
              <a href="https://www.facebook.com/AutoPerTutti" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-[#1877F2] text-white text-sm font-bold rounded-full hover:opacity-90 transition-opacity">
                <FacebookIcon className="w-4 h-4" /> Facebook
              </a>
              <a href="https://www.instagram.com/autopertutti/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-full hover:opacity-90 transition-opacity">
                <InstagramIcon className="w-4 h-4" /> Instagram
              </a>
              <a href="https://www.youtube.com/user/Fratellisimioli" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-[#FF0000] text-white text-sm font-bold rounded-full hover:opacity-90 transition-opacity">
                <YoutubeIcon className="w-4 h-4" /> YouTube
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
