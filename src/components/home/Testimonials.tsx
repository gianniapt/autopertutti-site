"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Star } from "lucide-react";
import SectionReveal from "@/components/shared/SectionReveal";

const reviews = [
  {
    name: "Marco Esposito",
    location: "Napoli",
    rating: 5,
    text: "Ho acquistato la mia BMW Serie 3 da Auto Per Tutti e sono rimasto entusiasta. Personale professionale, prezzi giusti e nessuna sorpresa. Consigliatissimi!",
    service: "Vendita Auto",
    avatar: "ME",
  },
  {
    name: "Lucia Ferrara",
    location: "Pozzuoli",
    rating: 5,
    text: "Officina super! Ho portato la mia auto per il tagliando e mi hanno fatto un check completo, segnalando anche problemi che non sapevo di avere. Onesti e competenti.",
    service: "Officina",
    avatar: "LF",
  },
  {
    name: "Antonio Russo",
    location: "Napoli",
    rating: 5,
    text: "Il noleggio è stato perfetto. Macchina pulita e in ottimo stato, prezzi competitivi e personale disponibilissimo. Tornerò sicuramente!",
    service: "Noleggio",
    avatar: "AR",
  },
  {
    name: "Giovanna De Luca",
    location: "Agnano",
    rating: 5,
    text: "Il pacchetto VIP dell'autolavaggio è spettacolare. La mia auto era come nuova dopo il trattamento. Personale gentile e professionale.",
    service: "Autolavaggio",
    avatar: "GD",
  },
  {
    name: "Salvatore Mancini",
    location: "Carrara",
    rating: 5,
    text: "Ho comprato un'auto usata e la permuta è stata gestita benissimo. Finanziamento approvato in giornata. Esperienza eccellente dal primo all'ultimo momento.",
    service: "Vendita Auto",
    avatar: "SM",
  },
  {
    name: "Federica Romano",
    location: "Napoli",
    rating: 5,
    text: "Diagnosi elettronica precisa e puntuale. Hanno risolto un problema che un'altra officina non riusciva a identificare. Bravi e trasparenti sui costi.",
    service: "Officina",
    avatar: "FR",
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-14">
          <p className="text-[#DF0000] font-semibold text-sm uppercase tracking-widest mb-3">Recensioni</p>
          <h2 className="text-4xl font-black text-[#1A1A1A] font-[family-name:var(--font-montserrat)]">
            Cosa dicono i nostri clienti
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
            </div>
            <span className="text-gray-600 font-medium">4.9/5 su Google · 340+ recensioni</span>
          </div>
        </SectionReveal>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-6 md:!pb-12"
        >
          {reviews.map((r, i) => (
            <SwiperSlide key={i}>
              <div className="bg-[#F9FAFB] rounded-2xl p-6 h-full flex flex-col border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#DF0000] flex items-center justify-center text-white font-bold text-sm">
                      {r.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1A1A1A] text-sm">{r.name}</p>
                      <p className="text-gray-400 text-xs">{r.location}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-white border border-gray-200 px-2 py-1 rounded-full text-gray-500">
                    {r.service}
                  </span>
                </div>
                <Stars n={r.rating} />
                <p className="text-gray-600 text-sm leading-relaxed mt-3 flex-1">&ldquo;{r.text}&rdquo;</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
