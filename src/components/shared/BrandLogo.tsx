import Image from "next/image";

interface BrandLogoProps {
  brand: string;
  size?: "sm" | "md" | "lg";
}

// Brand logo URLs from worldvectorlogo.com
const brandLogos: Record<string, string> = {
  "Volkswagen": "https://worldvectorlogo.com/svg/volkswagen-2.svg",
  "BMW": "https://worldvectorlogo.com/svg/bmw-7.svg",
  "Toyota": "https://worldvectorlogo.com/svg/toyota-2.svg",
  "Audi": "https://worldvectorlogo.com/svg/audi-2.svg",
  "Mercedes-Benz": "https://worldvectorlogo.com/svg/mercedes-benz-3.svg",
  "Fiat": "https://worldvectorlogo.com/svg/fiat-2.svg",
  "Ford": "https://worldvectorlogo.com/svg/ford-2.svg",
  "Jeep": "https://worldvectorlogo.com/svg/jeep-2.svg",
  "Renault": "https://worldvectorlogo.com/svg/renault-2.svg",
  "Porsche": "https://worldvectorlogo.com/svg/porsche-2.svg",
  "Peugeot": "https://worldvectorlogo.com/svg/peugeot-2.svg",
  "Volvo": "https://worldvectorlogo.com/svg/volvo-3.svg",
  "Opel": "https://worldvectorlogo.com/svg/opel-2.svg",
  "smart": "https://worldvectorlogo.com/svg/smart-2.svg",
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
