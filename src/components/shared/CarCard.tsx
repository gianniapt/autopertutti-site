import Link from "next/link";
import Image from "next/image";
import { Gauge, Fuel, Settings, MapPin } from "lucide-react";
import BrandLogo from "@/components/shared/BrandLogo";

interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  km: number;
  fuel: string;
  transmission: string;
  power: string;
  image: string;
  badge?: string | null;
  badgeColor?: string | null;
  location: string;
}

const badgeStyles: Record<string, string> = {
  green: "bg-emerald-100 text-emerald-700",
  blue: "bg-blue-100 text-blue-700",
  red: "bg-red-100 text-[#DF0000]",
};

export default function CarCard({ car }: { car: Car }) {
  return (
    <Link href={`/vendita/${car.id}`} className="car-card block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
        <Image
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading="lazy"
          priority={false}
          unoptimized
        />
        {car.badge && (
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${badgeStyles[car.badgeColor || "green"]}`}>
            {car.badge}
          </span>
        )}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {car.location}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-start gap-2">
            <BrandLogo brand={car.brand} size="sm" />
            <div>
              <p className="text-xs text-gray-500 font-medium">{car.brand}</p>
              <h3 className="font-bold text-gray-900 leading-tight">{car.model}</h3>
            </div>
          </div>
          <span className="text-[#DF0000] font-black text-lg whitespace-nowrap">
            €{car.price.toLocaleString("it-IT")}
          </span>
        </div>

        <p className="text-xs text-gray-400 mb-3">{car.year} · {car.km.toLocaleString("it-IT")} km</p>

        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Fuel className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate">{car.fuel}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Settings className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate">{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Gauge className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate">{car.power}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
