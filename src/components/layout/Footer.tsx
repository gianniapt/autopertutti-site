import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/shared/SocialIcons";
import { LOCATIONS_ARRAY } from "@/config/locations";

const services = [
  { href: "/vendita", label: "Vendita Auto" },
  { href: "/noleggio", label: "Noleggio" },
  { href: "/officina", label: "Officina" },
  { href: "/lavaggio", label: "Autolavaggio" },
  { href: "/contatti", label: "Contatti" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/logo-autopertutti.webp"
                alt="Auto Per Tutti"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Il tuo partner automotive in Campania dal 2005. Tre sedi: Napoli, Agnano, Carrara. Vendita, noleggio, officina e autolavaggio in un'unica realtà.
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/AutoPerTutti" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#DF0000] flex items-center justify-center transition-colors">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/autopertutti/" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#DF0000] flex items-center justify-center transition-colors">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="https://www.youtube.com/user/Fratellisimioli" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#DF0000] flex items-center justify-center transition-colors">
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4 uppercase tracking-wider text-xs">Servizi</h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-white/60 hover:text-[#DF0000] text-sm transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="https://www.autopertutti.net" target="_blank" rel="noopener noreferrer"
                  className="text-white/60 hover:text-[#DF0000] text-sm transition-colors">
                  Catalogo completo →
                </a>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-semibold text-white mb-4 uppercase tracking-wider text-xs">Contatti</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/60">
                <Phone className="w-4 h-4 mt-0.5 text-[#DF0000] shrink-0" />
                <a href="tel:+390815763372" className="hover:text-white transition-colors">081 576 3372</a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/60">
                <Mail className="w-4 h-4 mt-0.5 text-[#DF0000] shrink-0" />
                <a href="mailto:info@autopertutti.it" className="hover:text-white transition-colors">info@autopertutti.it</a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/60">
                <Clock className="w-4 h-4 mt-0.5 text-[#DF0000] shrink-0" />
                <span>Lun–Sab: 9:00–19:00</span>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="font-semibold text-white mb-4 uppercase tracking-wider text-xs">Le nostre sedi</h3>
            <ul className="space-y-4">
              {LOCATIONS_ARRAY.map((loc) => (
                <li key={loc.id} className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-[#DF0000] shrink-0" />
                  <div>
                    <p className="text-white text-sm font-medium">{loc.name}</p>
                    <p className="text-white/50 text-xs mt-0.5">{loc.address}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Auto Per Tutti. Tutti i diritti riservati. P.IVA 07629241215
          </p>
          <div className="flex gap-4 text-xs text-white/40">
            <a href="https://www.autopertutti.net" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Sito Dealer
            </a>
            <span>|</span>
            <Link href="/contatti" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
