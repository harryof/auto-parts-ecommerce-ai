import React from "react";
import { X, SlidersHorizontal } from "lucide-react";

export interface FiltersState {
  priceMin: number;
  priceMax: number;
  brands: string[];
  colors: string[];
  inStockOnly: boolean;
}

interface FilterPanelProps {
  filters: FiltersState;
  onChange: (f: FiltersState) => void;
  availableBrands: string[];
  availableColors: string[];
}

const COLOR_SWATCH: Record<string, string> = {
  "Чёрный": "#111827",
  "Белый": "#f8fafc",
  "Серый": "#6b7280",
  "Красный": "#ef4444",
  "Синий": "#3b82f6",
  "Зелёный": "#22c55e",
  "Жёлтый": "#eab308",
  "Серебристый": "#c0c0c0",
};

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onChange,
  availableBrands,
  availableColors,
}) => {
  const setFilters = (partial: Partial<FiltersState>) =>
    onChange({ ...filters, ...partial });

  const toggleBrand = (b: string) =>
    setFilters({
      brands: filters.brands.includes(b)
        ? filters.brands.filter((x) => x !== b)
        : [...filters.brands, b],
    });

  const toggleColor = (c: string) =>
    setFilters({
      colors: filters.colors.includes(c)
        ? filters.colors.filter((x) => x !== c)
        : [...filters.colors, c],
    });

  const activeCount =
    filters.brands.length +
    filters.colors.length +
    (filters.inStockOnly ? 1 : 0) +
    (filters.priceMin > 0 ? 1 : 0) +
    (filters.priceMax < 1000000 ? 1 : 0);

  return (
    <div className="glass rounded-2xl p-5 mb-4">
      
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={15} className="text-primary-400" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">Фильтры</h2>
          {activeCount > 0 && (
            <span className="px-2 py-0.5 bg-primary-500 text-dark-900 text-xs font-bold rounded-full">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={() =>
              onChange({ priceMin: 0, priceMax: 1000000, brands: [], colors: [], inStockOnly: false })
            }
            className="text-xs text-dark-400 hover:text-primary-400 transition-colors flex items-center gap-1"
          >
            <X size={12} /> Сбросить
          </button>
        )}
      </div>

      
      {activeCount > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {filters.brands.map((b) => (
            <button
              key={b}
              onClick={() => toggleBrand(b)}
              className="flex items-center gap-1 px-2.5 py-1 bg-primary-500/20 border border-primary-500/30 text-primary-300 text-xs rounded-full hover:bg-primary-500/30 transition-colors"
            >
              {b} <X size={10} />
            </button>
          ))}
          {filters.colors.map((c) => (
            <button
              key={c}
              onClick={() => toggleColor(c)}
              className="flex items-center gap-1 px-2.5 py-1 bg-dark-700 border border-white/10 text-dark-200 text-xs rounded-full hover:bg-dark-600 transition-colors"
            >
              <span
                className="w-2.5 h-2.5 rounded-full border border-white/20 inline-block"
                style={{ background: COLOR_SWATCH[c] ?? "#888" }}
              />
              {c} <X size={10} />
            </button>
          ))}
          {filters.inStockOnly && (
            <button
              onClick={() => setFilters({ inStockOnly: false })}
              className="flex items-center gap-1 px-2.5 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs rounded-full hover:bg-emerald-500/30 transition-colors"
            >
              В наличии <X size={10} />
            </button>
          )}
        </div>
      )}

      
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-dark-300 mb-3 uppercase tracking-wider">Цена, ₽</h3>
        <div className="flex gap-2">
          <input
            type="number"
            value={filters.priceMin || ""}
            onChange={(e) => setFilters({ priceMin: Number(e.target.value) })}
            className="w-1/2 p-2 rounded-lg bg-dark-900 border border-white/5 text-sm text-white focus:border-primary-500 outline-none transition-colors"
            placeholder="От"
          />
          <input
            type="number"
            value={filters.priceMax < 1000000 ? filters.priceMax : ""}
            onChange={(e) => setFilters({ priceMax: Number(e.target.value) || 1000000 })}
            className="w-1/2 p-2 rounded-lg bg-dark-900 border border-white/5 text-sm text-white focus:border-primary-500 outline-none transition-colors"
            placeholder="До"
          />
        </div>
      </div>

      
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-dark-300 mb-3 uppercase tracking-wider">Наличие</h3>
        <label className="flex items-center gap-3 cursor-pointer group">
          <div
            className={`relative w-9 h-5 rounded-full transition-colors ${filters.inStockOnly ? "bg-primary-500" : "bg-dark-700 border border-white/10"}`}
            onClick={() => setFilters({ inStockOnly: !filters.inStockOnly })}
          >
            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${filters.inStockOnly ? "translate-x-4" : "translate-x-0.5"}`} />
          </div>
          <span className={`text-sm transition-colors ${filters.inStockOnly ? "text-white" : "text-dark-300 group-hover:text-white"}`}>
            Только в наличии
          </span>
        </label>
      </div>

      
      {availableBrands.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-dark-300 mb-3 uppercase tracking-wider">Бренд</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {availableBrands.map((brand) => {
              const checked = filters.brands.includes(brand);
              return (
                <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    className="relative flex items-center justify-center w-5 h-5 rounded border border-white/10 bg-dark-900 group-hover:border-primary-500 transition-colors overflow-hidden flex-shrink-0"
                    onClick={() => toggleBrand(brand)}
                  >
                    {checked && (
                      <div className="w-full h-full bg-primary-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-dark-900" viewBox="0 0 12 10" fill="none">
                          <path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <span className={`text-sm transition-colors ${checked ? "text-white font-medium" : "text-dark-200 group-hover:text-white"}`}>
                    {brand}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      
      {availableColors.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-dark-300 mb-3 uppercase tracking-wider">Цвет</h3>
          <div className="flex flex-wrap gap-2">
            {availableColors.map((color) => {
              const checked = filters.colors.includes(color);
              const hex = COLOR_SWATCH[color] ?? "#888";
              return (
                <button
                  key={color}
                  onClick={() => toggleColor(color)}
                  title={color}
                  className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-110 ${checked ? "border-primary-400 scale-110 shadow-lg shadow-primary-500/30" : "border-white/10"}`}
                  style={{ background: hex }}
                />
              );
            })}
          </div>
          {availableColors.length > 0 && (
            <div className="mt-2 text-xs text-dark-400">
              {filters.colors.length > 0 ? filters.colors.join(", ") : "Любой цвет"}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
