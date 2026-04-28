import Link from "next/link";
import { Car, Key, Wrench, Droplets, ArrowRight } from "lucide-react";
import SectionReveal from "@/components/shared/SectionReveal";

const services = [
  {
    href: "/vendita",
    icon: Car,
    title: "Vendita Auto",
    desc: "Oltre 200 vetture selezionate tra nuove e usate. Finanziamenti su misura e permuta valutata sul posto.",
    color: "bg-red-50 text-[#DF0000]",
    cta: "Sfoglia il catalogo",
    stats: "200+ auto",
  },
  {
    href: "/noleggio",
    icon: Key,
    title: "Noleggio Flessibile",
    desc: "City car, SUV, premium e furgoni. Noleggio giornaliero, settimanale o mensile con o senza conducente.",
    color: "bg-blue-50 text-blue-600",
    cta: "Prenota ora",
    stats: "Da €30/giorno",
  },
  {
    href: "/officina",
    icon: Wrench,
    title: "Officina Autorizzata",
    desc: "Tagliando, freni, gomme, diagnosi elettronica e carrozzeria. Ricambi originali con garanzia 12 mesi.",
    color: "bg-amber-50 text-amber-600",
    cta: "Prenota appuntamento",
    stats: "18 marchi",
  },
  {
    href: "/lavaggio",
    icon: Droplets,
    title: "Autolavaggio",
    desc: "Tre pacchetti professionali: Basic, Premium e VIP con detailing completo. Risultato garantito.",
    color: "bg-cyan-50 text-cyan-600",
    cta: "Scegli il pacchetto",
    stats: "Da €15",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-14">
          <p className="text-[#DF0000] font-semibold text-sm uppercase tracking-widest mb-3">I nostri servizi</p>
          <h2 className="text-4xl lg:text-5xl font-black text-[#1A1A1A] font-[family-name:var(--font-montserrat)]">
            Tutto quello che<br className="hidden sm:block" /> serve alla tua auto
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map(({ href, icon: Icon, title, desc, color, cta, stats }, i) => (
            <SectionReveal key={href} delay={i * 0.1}>
              <Link
                href={href}
                className="group block bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-gray-100 hover:border-[#DF0000]/20"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{stats}</div>
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-3 font-[family-name:var(--font-montserrat)]">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{desc}</p>
                <div className="flex items-center gap-1.5 text-[#DF0000] text-sm font-semibold mt-auto">
                  {cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
