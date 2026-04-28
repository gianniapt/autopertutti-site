"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionReveal from "@/components/shared/SectionReveal";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 200, suffix: "+", label: "Auto disponibili", sublabel: "Nuove e usate" },
  { value: 20, suffix: "+", label: "Anni di esperienza", sublabel: "Dal 2005" },
  { value: 3, suffix: "", label: "Sedi operative", sublabel: "Napoli, Agnano, Carrara" },
  { value: 5000, suffix: "+", label: "Clienti soddisfatti", sublabel: "Ogni anno" },
];

function CounterItem({ value, suffix, label, sublabel }: typeof stats[0]) {
  const numRef = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: value,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toLocaleString("it-IT");
          },
        });
      },
    });
  }, [value]);

  return (
    <div className="text-center">
      <div className="flex items-end justify-center gap-1 mb-2">
        <span
          ref={numRef}
          className="text-3xl sm:text-4xl lg:text-6xl font-black text-[#DF0000] font-[family-name:var(--font-montserrat)] tabular-nums"
        >
          0
        </span>
        <span className="text-3xl sm:text-4xl lg:text-6xl font-black text-[#DF0000] font-[family-name:var(--font-montserrat)]">
          {suffix}
        </span>
      </div>
      <p className="text-[#1A1A1A] font-bold text-lg">{label}</p>
      <p className="text-gray-500 text-sm mt-1">{sublabel}</p>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section className="py-20 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-14">
          <p className="text-[#DF0000] font-semibold text-sm uppercase tracking-widest mb-3">I numeri parlano</p>
          <h2 className="text-4xl font-black text-white font-[family-name:var(--font-montserrat)]">
            La fiducia dei clienti,<br className="hidden sm:block" /> da oltre 20 anni
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <CounterItem key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
