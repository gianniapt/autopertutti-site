import Link from "next/link";
import carsData from "@/data/cars.json";
import SectionReveal from "@/components/shared/SectionReveal";
import BrandLogo from "@/components/shared/BrandLogo";

const brandOrder = [
  "Volkswagen", "BMW", "Toyota", "Audi", "Mercedes-Benz",
  "Fiat", "Ford", "Jeep", "Renault", "Porsche", "Peugeot", "Volvo",
];

export default function BrandGrid() {
  const brandCounts = carsData.reduce<Record<string, number>>((acc, car) => {
    acc[car.brand] = (acc[car.brand] || 0) + 1;
    return acc;
  }, {});

  return (
    <section className="py-10 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-center text-gray-400 text-xs font-semibold uppercase tracking-widest mb-6">
            Sfoglia per marca
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {brandOrder.map((brand) => (
              <Link
                key={brand}
                href={`/vendita?brand=${encodeURIComponent(brand)}`}
                className="group flex flex-col items-center gap-2 p-3 hover:scale-110 transition-transform duration-200"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white rounded-lg shadow-sm group-hover:shadow-md group-hover:bg-gray-50 transition-all">
                  <BrandLogo brand={brand} size="lg" />
                </div>
                <div className="text-center">
                  <p className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#DF0000]">
                    {brand}
                  </p>
                  {brandCounts[brand] && (
                    <span className="text-xs text-gray-400">
                      {brandCounts[brand]}
                    </span>
                  )}
                </div>
              </Link>
            ))}
            <Link
              href="/vendita"
              className="flex flex-col items-center justify-center gap-2 p-3 group hover:scale-110 transition-transform duration-200"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-[#1A1A1A] text-white rounded-lg shadow-sm group-hover:bg-[#DF0000] group-hover:shadow-md transition-all font-bold text-lg">
                →
              </div>
              <p className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#DF0000]">Tutte</p>
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
