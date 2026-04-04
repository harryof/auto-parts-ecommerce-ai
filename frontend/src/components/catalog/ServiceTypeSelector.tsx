import React, { useState } from "react";
import { Wrench, Settings } from "lucide-react";

interface ServiceTypeSelectorProps {
  activeType: "all" | "maintenance" | "repair";
  onChange: (type: "all" | "maintenance" | "repair") => void;
}

const ServiceTypeSelector: React.FC<ServiceTypeSelectorProps> = ({ activeType, onChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
      {/* Запчасти для ТО */}
      <button
        onClick={() => onChange(activeType === "maintenance" ? "all" : "maintenance")}
        className={`relative flex items-center gap-5 p-5 rounded-2xl border transition-all duration-300 text-left group overflow-hidden
          ${activeType === "maintenance"
            ? "border-primary-500 bg-primary-500/10"
            : "border-white/5 bg-dark-800 hover:border-primary-500/40 hover:bg-dark-700"
          }`}
      >
        {/* decorative glow */}
        {activeType === "maintenance" && (
          <div className="absolute inset-0 bg-primary-500/5 pointer-events-none" />
        )}

        <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center transition-colors
          ${activeType === "maintenance" ? "bg-primary-500/20 text-primary-400" : "bg-dark-700 text-dark-300 group-hover:text-primary-400 group-hover:bg-primary-500/10"}`}>
          <Settings size={30} />
        </div>

        <div>
          <div className={`text-base font-bold mb-1 transition-colors ${activeType === "maintenance" ? "text-white" : "text-dark-100 group-hover:text-white"}`}>
            Запчасти для ТО
          </div>
          <div className="text-sm text-primary-400 font-medium">Подбор по вашему автомобилю</div>
          <div className="text-xs text-dark-400 mt-1">Масла, фильтры, свечи, тормоза</div>
        </div>

        {activeType === "maintenance" && (
          <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
        )}
      </button>

      {/* Запчасти для ремонта */}
      <button
        onClick={() => onChange(activeType === "repair" ? "all" : "repair")}
        className={`relative flex items-center gap-5 p-5 rounded-2xl border transition-all duration-300 text-left group overflow-hidden
          ${activeType === "repair"
            ? "border-blue-500/60 bg-blue-500/10"
            : "border-white/5 bg-dark-800 hover:border-blue-500/40 hover:bg-dark-700"
          }`}
      >
        {activeType === "repair" && (
          <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />
        )}

        <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center transition-colors
          ${activeType === "repair" ? "bg-blue-500/20 text-blue-400" : "bg-dark-700 text-dark-300 group-hover:text-blue-400 group-hover:bg-blue-500/10"}`}>
          <Wrench size={30} />
        </div>

        <div>
          <div className={`text-base font-bold mb-1 transition-colors ${activeType === "repair" ? "text-white" : "text-dark-100 group-hover:text-white"}`}>
            Запчасти для ремонта
          </div>
          <div className="text-sm text-blue-400 font-medium">Подбор по VIN или схеме узлов</div>
          <div className="text-xs text-dark-400 mt-1">Двигатель, подвеска, кузов, электрика</div>
        </div>

        {activeType === "repair" && (
          <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
        )}
      </button>
    </div>
  );
};

export default ServiceTypeSelector;
