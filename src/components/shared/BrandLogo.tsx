import Image from "next/image";

interface BrandLogoProps {
  brand: string;
  size?: "sm" | "md" | "lg";
}

// Brand logo URLs from Clearbit API
const brandLogos: Record<string, string> = {
  "Volkswagen": "https://logo.clearbit.com/volkswagen.com?size=200",
  "BMW": "https://logo.clearbit.com/bmw.com?size=200",
  "Toyota": "https://logo.clearbit.com/toyota.com?size=200",
  "Audi": "https://logo.clearbit.com/audi.com?size=200",
  "Mercedes-Benz": "https://logo.clearbit.com/mercedes-benz.com?size=200",
  "Fiat": "https://logo.clearbit.com/fiat.com?size=200",
  "Ford": "https://logo.clearbit.com/ford.com?size=200",
  "Jeep": "https://logo.clearbit.com/jeep.com?size=200",
  "Renault": "https://logo.clearbit.com/renault.com?size=200",
  "Porsche": "https://logo.clearbit.com/porsche.com?size=200",
  "Peugeot": "https://logo.clearbit.com/peugeot.com?size=200",
  "Volvo": "https://logo.clearbit.com/volvo.com?size=200",
  "Opel": "https://logo.clearbit.com/opel.com?size=200",
  "smart": "https://logo.clearbit.com/smart.com?size=200",
};

const sizeMap = {
  sm: { width: 24, height: 24 },
  md: { width: 32, height: 32 },
  lg: { width: 40, height: 40 },
};

export default function BrandLogo({ brand, size = "md" }: BrandLogoProps) {
  const logoUrl = brandLogos[brand];
  const { width, height } = sizeMap[size];

  if (!logoUrl) {
    return (
      <div
        style={{ width, height }}
        className="flex items-center justify-center bg-gray-200 rounded-full text-xs font-bold text-gray-600"
      >
        {brand.substring(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <div style={{ width, height }} className="relative flex-shrink-0">
      <Image
        src={logoUrl}
        alt={brand}
        fill
        className="object-contain"
        sizes={`${width}px`}
      />
    </div>
  );
}
