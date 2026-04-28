import Link from "next/link";
import SectionReveal from "@/components/shared/SectionReveal";

function SuvIcon() {
  return (
    <svg viewBox="0 0 64 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-8">
      <rect x="4" y="14" width="56" height="12" rx="2" />
      <path d="M8 14V10c0-1 .5-2 2-2h12l6-6h14l4 6h8c1.5 0 2 1 2 2v4" />
      <circle cx="16" cy="27" r="4" fill="currentColor" opacity=".15" stroke="currentColor" />
      <circle cx="48" cy="27" r="4" fill="currentColor" opacity=".15" stroke="currentColor" />
    </svg>
  );
}

function BerlinaIcon() {
  return (
    <svg viewBox="0 0 64 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-8">
      <rect x="4" y="14" width="56" height="10" rx="2" />
      <path d="M10 14v-3c0-1 .5-2 1.5-2h8l8-7h12l8 7h8c1 0 1.5 1 1.5 2v3" />
      <circle cx="16" cy="25" r="3.5" fill="currentColor" opacity=".15" stroke="currentColor" />
      <circle cx="48" cy="25" r="3.5" fill="currentColor" opacity=".15" stroke="currentColor" />
    </svg>
  );
}

function FurgoneIcon() {
  return (
    <svg viewBox="0 0 64 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-8">
      <rect x="2" y="8" width="60" height="16" rx="2" />
      <path d="M42 8V4c0-1 .5-2 1.5-2h14c1 0 1.5 1 1.5 2v4" />
      <line x1="42" y1="8" x2="42" y2="24" />
      <circle cx="14" cy="25" r="3.5" fill="currentColor" opacity=".15" stroke="currentColor" />
      <circle cx="50" cy="25" r="3.5" fill="currentColor" opacity=".15" stroke="currentColor" />
    </svg>
  );
}

function ElettricaIcon() {
  return (
    <svg viewBox="0 0 64 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-8">
      <rect x="4" y="14" width="56" height="10" rx="2" />
      <path d="M10 14v-3c0-1 .5-2 1.5-2h8l8-7h12l8 7h8c1 0 1.5 1 1.5 2v3" />
      <circle cx="16" cy="25" r="3.5" fill="currentColor" opacity=".15" stroke="currentColor" />
      <circle cx="48" cy="25" r="3.5" fill="currentColor" opacity=".15" stroke="currentColor" />
      <path d="M34 2l-4 6h4l-4 6" stroke="#DF0000" strokeWidth="2.5" />
    </svg>
  );
}

function SportivaIcon() {
  return (
    <svg viewBox="0 0 64 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-8">
      <rect x="4" y="13" width="56" height="8" rx="2" />
      <path d="M8 13v-2c0-1 1-2 2-2h6l10-8h14l8 8h10c1 0 2 1 2 2v2" />
      <circle cx="16" cy="22" r="3" fill="currentColor" opacity=".15" stroke="currentColor" />
      <circle cx="48" cy="22" r="3" fill="currentColor" opacity=".15" stroke="currentColor" />
    </svg>
  );
}

const bodyStyles = [
  { id: "SUV", label: "SUV", sub: "Spazio e comfort", icon: <SuvIcon /> },
  { id: "Berlina", label: "Berlina", sub: "Eleganza classica", icon: <BerlinaIcon /> },
  { id: "Furgone", label: "Furgone", sub: "Per il lavoro", icon: <FurgoneIcon /> },
  { id: "Elettrica", label: "Elettrica", sub: "Il futuro è qui", icon: <ElettricaIcon /> },
  { id: "Sportiva", label: "Sportiva", sub: "Emozione pura", icon: <SportivaIcon /> },
];

export default function BodyStyleSection() {
  return (
    <section className="py-14 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-10">
          <p className="text-[#DF0000] font-semibold text-sm uppercase tracking-widest mb-2">Sfoglia per tipo</p>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] font-[family-name:var(--font-montserrat)]">
            Trova la forma giusta per te
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {bodyStyles.map((style, i) => (
            <SectionReveal key={style.id} delay={i * 0.08}>
              <Link
                href={`/vendita?body=${encodeURIComponent(style.id)}`}
                className="group flex flex-col items-center gap-3 p-3 sm:p-5 bg-white rounded-2xl border border-gray-100 hover:border-[#DF0000]/40 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="text-gray-400 group-hover:text-[#DF0000] transition-colors duration-300">
                  {style.icon}
                </div>
                <div>
                  <p className="font-bold text-[#1A1A1A] text-sm group-hover:text-[#DF0000] transition-colors">{style.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{style.sub}</p>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
