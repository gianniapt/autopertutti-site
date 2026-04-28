import Link from "next/link";
import carsData from "@/data/cars.json";
import SectionReveal from "@/components/shared/SectionReveal";

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
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
            {brandOrder.map((brand) => (
              <Link
                key={brand}
                href={`/vendita?brand=${encodeURIComponent(brand)}`}
                className="group flex items-center gap-1.5 px-4 py-2 bg-[#F9FAFB] hover:bg-[#DF0000] text-gray-700 hover:text-white rounded-full border border-gray-200 hover:border-[#DF0000] text-sm font-medium transition-all duration-200"
              >
                {brand}
                {brandCounts[brand] && (
                  <span className="text-xs text-gray-400 group-hover:text-white/70">
                    ({brandCounts[brand]})
                  </span>
                )}
              </Link>
            ))}
            <Link
              href="/vendita"
              className="px-4 py-2 bg-[#1A1A1A] text-white rounded-full text-sm font-bold hover:bg-[#DF0000] transition-colors duration-200"
            >
              Tutte →
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
