"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { LOCATIONS_ARRAY } from "@/config/locations";

const navLinks = [
  { href: "/vendita", label: "Vendita Auto" },
  { href: "/noleggio", label: "Noleggio" },
  { href: "/officina", label: "Officina" },
  { href: "/lavaggio", label: "Autolavaggio" },
  { href: "/contatti", label: "Contatti" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const headerBg =
    isHome && !scrolled
      ? "bg-transparent"
      : "bg-[#1A1A1A] shadow-lg";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-autopertutti.webp"
              alt="Auto Per Tutti"
              width={150}
              height={40}
              className="h-10 w-auto md:h-12"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-[#DF0000] ${
                  pathname === link.href
                    ? "text-[#DF0000]"
                    : "text-white/90"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Location Selector */}
            <div className="relative">
              <button
                onClick={() => setLocationOpen(!locationOpen)}
                className="flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-[#DF0000] transition-colors"
              >
                <MapPin className="w-4 h-4" />
                Sedi
              </button>
              {locationOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-[#1A1A1A] border border-white/10 rounded-lg shadow-xl z-50">
                  {LOCATIONS_ARRAY.map((loc) => (
                    <Link
                      key={loc.id}
                      href="/contatti"
                      onClick={() => setLocationOpen(false)}
                      className="block px-4 py-3 text-sm text-white/80 hover:bg-[#DF0000]/20 hover:text-[#DF0000] border-b border-white/5 last:border-b-0 transition-colors"
                    >
                      <p className="font-medium">{loc.name}</p>
                      <p className="text-xs text-white/40 mt-0.5">{loc.address}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+390815763372"
              className="flex items-center gap-2 text-white/80 text-sm hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              081 576 3372
            </a>
            <a
              href="https://wa.me/393791137917?text=Ciao!%20Vorrei%20informazioni."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#DF0000] text-white text-sm font-semibold rounded-full hover:bg-[#B50000] transition-all duration-200 hover:shadow-lg hover:shadow-red-900/30"
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2 rounded-md"
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#1A1A1A] border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                  pathname === link.href
                    ? "bg-[#DF0000] text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a
                href="tel:+390815763372"
                className="flex items-center gap-2 px-3 py-3 text-sm text-white/80 hover:text-white"
              >
                <Phone className="w-4 h-4" />
                081 576 3372
              </a>
              <a
                href="https://wa.me/393791137917"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center px-4 py-3 bg-[#DF0000] text-white text-sm font-semibold rounded-full"
              >
                Contattaci su WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
