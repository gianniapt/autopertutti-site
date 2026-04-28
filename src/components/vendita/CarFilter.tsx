"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, LayoutGrid, List, X } from "lucide-react";
import CarCard from "@/components/shared/CarCard";
import carsData from "@/data/cars.json";

interface Props {
  initialBrand?: string;
  initialBody?: string;
}

export default function CarFilter({ initialBrand = "", initialBody = "" }: Props) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState({
    brand: initialBrand,
    fuel: "",
    transmission: "",
    maxPrice: 100000,
    location: "",
    body: initialBody,
  });
  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  const [showFilters, setShowFilters] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleFilterChange = useCallback(
    (newFilters: typeof filters) => {
      setFilters(newFilters);
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(() => {
        setDebouncedFilters(newFilters);
      }, 300);
    },
    []
  );

  const brands = [...new Set(carsData.map((c) => c.brand))].sort();
  const fuels = [...new Set(carsData.map((c) => c.fuel))].sort();
  const transmissions = [...new Set(carsData.map((c) => c.transmission))].sort();

  const filtered = useMemo(
    () =>
      carsData.filter(
        (c) =>
          (!debouncedFilters.brand || c.brand === debouncedFilters.brand) &&
          (!debouncedFilters.fuel || c.fuel === debouncedFilters.fuel) &&
          (!debouncedFilters.transmission || c.transmission === debouncedFilters.transmission) &&
          c.price <= debouncedFilters.maxPrice &&
          (!debouncedFilters.location || c.location === debouncedFilters.location)
      ),
    [debouncedFilters]
  );

  const reset = () => {
    const resetFilters = { brand: "", fuel: "", transmission: "", maxPrice: 100000, location: "", body: "" };
    handleFilterChange(resetFilters);
  };

  const activeCount = [filters.brand, filters.fuel, filters.transmission, filters.location, filters.body].filter(Boolean).length + (filters.maxPrice < 100000 ? 1 : 0);

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:border-[#DF0000] transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtri
            {activeCount > 0 && (
              <span className="w-5 h-5 bg-[#DF0000] text-white text-xs rounded-full flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </button>
          {activeCount > 0 && (
            <button onClick={reset} className="text-sm text-gray-400 hover:text-[#DF0000] flex items-center gap-1">
              <X className="w-3.5 h-3.5" /> Azzera
            </button>
          )}
          <span className="text-sm text-gray-400">{filtered.length} auto trovate</span>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded-lg transition-colors ${view === "grid" ? "bg-white shadow-sm text-[#DF0000]" : "text-gray-400 hover:text-gray-600"}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-lg transition-colors ${view === "list" ? "bg-white shadow-sm text-[#DF0000]" : "text-gray-400 hover:text-gray-600"}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-h-screen md:max-h-full overflow-y-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 p-4 bg-gray-50 rounded-2xl mb-6 border border-gray-100">
              <div>
                <label htmlFor="brand-select" className="block text-xs font-semibold text-gray-400 mb-2">
                  Marca
                </label>
                <select
                  id="brand-select"
                  value={filters.brand}
                  onChange={(e) => handleFilterChange({ ...filters, brand: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#DF0000]/30 focus:border-[#DF0000]"
                >
                  <option value="">Tutte le marche</option>
                  {brands.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="fuel-select" className="block text-xs font-semibold text-gray-400 mb-2">
                  Carburante
                </label>
                <select
                  id="fuel-select"
                  value={filters.fuel}
                  onChange={(e) => handleFilterChange({ ...filters, fuel: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#DF0000]/30 focus:border-[#DF0000]"
                >
                  <option value="">Qualsiasi carburante</option>
                  {fuels.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="transmission-select" className="block text-xs font-semibold text-gray-400 mb-2">
                  Cambio
                </label>
                <select
                  id="transmission-select"
                  value={filters.transmission}
                  onChange={(e) => handleFilterChange({ ...filters, transmission: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#DF0000]/30 focus:border-[#DF0000]"
                >
                  <option value="">Qualsiasi cambio</option>
                  {transmissions.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="location-select" className="block text-xs font-semibold text-gray-400 mb-2">
                  Sede
                </label>
                <select
                  id="location-select"
                  value={filters.location}
                  onChange={(e) => handleFilterChange({ ...filters, location: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#DF0000]/30 focus:border-[#DF0000]"
                >
                  <option value="">Tutte le sedi</option>
                  {["Agnano", "Napoli", "Carrara"].map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Max prezzo: €{filters.maxPrice.toLocaleString("it-IT")}</label>
                <input
                  type="range"
                  min={5000}
                  max={100000}
                  step={1000}
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
                  className="w-full accent-[#DF0000]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg font-medium mb-2">Nessun risultato</p>
          <p className="text-sm">Prova a modificare i filtri</p>
        </div>
      ) : (
        <motion.div
          layout
          className={`grid gap-5 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((car) => (
              <motion.div
                key={car.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
