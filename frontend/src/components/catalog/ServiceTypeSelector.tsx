import React from "react";
import { Car } from "lucide-react";

interface ServiceTypeSelectorProps {
  onVinSearch: () => void;
}

const ServiceTypeSelector: React.FC<ServiceTypeSelectorProps> = ({ onVinSearch }) => {
  return (
    <div className="mb-8">
      <button
        id="vin-search-open"
        onClick={onVinSearch}
        className="relative flex items-center gap-4 p-5 rounded-2xl border border-amber-500/30 bg-dark-800 hover:border-amber-400/60 hover:bg-amber-500/5 transition-all duration-300 text-left group overflow-hidden"
      >
        
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none rounded-2xl" />

        <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center bg-amber-500/15 text-amber-400 group-hover:bg-amber-500/25 transition-colors">
          <Car size={26} />
        </div>

        <div>
          <div className="text-sm font-bold mb-1 text-dark-100 group-hover:text-white transition-colors">
            Поиск по VIN
          </div>
          <div className="text-xs text-amber-400 font-medium">Подбор запчастей по номеру вашего авто</div>
        </div>

        
        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </button>
    </div>
  );
};

export default ServiceTypeSelector;
