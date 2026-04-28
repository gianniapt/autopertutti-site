"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Car, Key, Wrench, Droplets, ChevronDown } from "lucide-react";

const services = [
  { href: "/vendita", icon: Car, label: "Vendita Auto", sub: "200+ veicoli disponibili" },
  { href: "/noleggio", icon: Key, label: "Noleggio", sub: "Flessibile e conveniente" },
  { href: "/officina", icon: Wrench, label: "Officina", sub: "Autorizzata multimarca" },
  { href: "/lavaggio", icon: Droplets, label: "Autolavaggio", sub: "Professionale e rapido" },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(titleRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo(subRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .fromTo(
          cardsRef.current?.children ? Array.from(cardsRef.current.children) : [],
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        );

      // Parallax on scroll - disabilitato su mobile < 768px
      if (bgRef.current && window.innerWidth >= 768) {
        gsap.to(bgRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 scale-110"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=85')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#DF0000]/20 border border-[#DF0000]/40 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-[#DF0000] rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">3 sedi · Napoli, Agnano, Carrara</span>
          </div>

          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 font-[family-name:var(--font-montserrat)]"
          >
            Compra Auto Usate<br />
            <span className="text-[#DF0000]">Napoli</span><br />
            Finanziamento in Giornata
          </h1>

          <p
            ref={subRef}
            className="text-lg sm:text-xl text-white/75 mb-10 max-w-xl leading-relaxed"
          >
            Ricerca tra 200+ auto selezionate. Finanziamento rapido senza sorprese, permuta del tuo usato valutata correttamente, garanzia 12 mesi su ogni veicolo. Consegna a domicilio. Tre sedi: Napoli, Agnano, Carrara.
          </p>
        </div>

        {/* Service Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4"
        >
          {services.map(({ href, icon: Icon, label, sub }) => (
            <Link
              key={href}
              href={href}
              className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:bg-[#DF0000] hover:border-[#DF0000] transition-all duration-300 cursor-pointer"
            >
              <Icon className="w-7 h-7 text-white mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-white font-bold text-sm mb-0.5">{label}</p>
              <p className="text-white/60 text-xs group-hover:text-white/80">{sub}</p>
              <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <ChevronDown className="w-3 h-3 text-white -rotate-90" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/50 text-xs tracking-widest uppercase">Scopri</span>
        <ChevronDown className="w-5 h-5 text-white/50" />
      </div>
    </section>
  );
}
