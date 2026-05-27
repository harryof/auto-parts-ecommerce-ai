import React from "react";

const BRANDS = [
  "BOSCH", "BREMBO", "NGK", "MAHLE", "MANN-FILTER", "DENSO", "VALEO", "SACHS", "LUK", "KYB",
  "BOSCH", "BREMBO", "NGK", "MAHLE", "MANN-FILTER", "DENSO", "VALEO", "SACHS", "LUK", "KYB"
];

const BrandsMarquee: React.FC = () => {
  return (
    <div className="w-full bg-dark-950 py-10 border-y border-white/5 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 mb-4">
        <h3 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-dark-400">
          Официальный дилер ведущих мировых брендов
        </h3>
      </div>
      
      <div className="relative flex overflow-x-hidden">
        
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-dark-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-dark-950 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee whitespace-nowrap flex items-center min-w-full">
          {BRANDS.map((brand, index) => (
            <span
              key={index}
              className="mx-8 text-2xl md:text-3xl font-black text-dark-300 hover:text-white transition-colors cursor-default"
            >
              {brand}
            </span>
          ))}
        </div>
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center min-w-full">
          {BRANDS.map((brand, index) => (
            <span
              key={`clone-${index}`}
              className="mx-8 text-2xl md:text-3xl font-black text-dark-300 hover:text-white transition-colors cursor-default"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsMarquee;
