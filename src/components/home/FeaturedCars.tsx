"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowRight } from "lucide-react";
import CarCard from "@/components/shared/CarCard";
import SectionReveal from "@/components/shared/SectionReveal";
import carsData from "@/data/cars.json";

const featured = carsData.filter((c) => c.featured);

export default function FeaturedCars() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[#DF0000] font-semibold text-sm uppercase tracking-widest mb-3">Ultimi arrivi</p>
            <h2 className="text-4xl font-black text-[#1A1A1A] font-[family-name:var(--font-montserrat)]">
              Auto in evidenza
            </h2>
          </div>
          <Link
            href="/vendita"
            className="inline-flex items-center gap-2 text-[#DF0000] font-semibold text-sm hover:gap-3 transition-all"
          >
            Vedi tutte le auto <ArrowRight className="w-4 h-4" />
          </Link>
        </SectionReveal>
      </div>

      <div className="pl-4 sm:pl-6 lg:pl-[calc((100vw-1280px)/2+2rem)]">
        <Swiper
          modules={[Navigation, FreeMode]}
          freeMode
          spaceBetween={20}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2.2, spaceBetween: 20 },
            768: { slidesPerView: 2.8, spaceBetween: 20 },
            1024: { slidesPerView: 3.2, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="!overflow-visible"
        >
          {featured.map((car) => (
            <SwiperSlide key={car.id} className="!h-auto">
              <CarCard car={car} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
