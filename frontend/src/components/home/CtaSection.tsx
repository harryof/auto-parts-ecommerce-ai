import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PhoneCall } from "lucide-react";

const CtaSection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="max-w-[1600px] mx-auto px-4 py-10 mb-10">
      <div 
        className={`relative w-full rounded-[2rem] overflow-hidden bg-primary-500 p-8 md:p-14 transition-all duration-1000 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Decor */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 z-0" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/20 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none" />
        
        {/* Hexagon pattern overlay (subtle) */}
        <div 
          className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}
        />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black text-dark-950 mb-4 leading-tight tracking-tight">
              Не нашли нужную <br className="hidden md:block"/>деталь в каталоге?
            </h2>
            <p className="text-dark-800 text-lg md:text-xl font-medium max-w-xl">
              Наши эксперты бесплатно подберут запчасть по VIN-коду за 5 минут и предложат лучшие варианты.
            </p>
          </div>

          <div className="flex-shrink-0 flex flex-col sm:flex-row gap-4 items-center w-full md:w-auto">
            <Link 
              to="/contacts" 
              className="w-full sm:w-auto px-8 py-4 bg-dark-950 text-primary-400 hover:text-white rounded-full font-bold text-lg inline-flex items-center justify-center gap-3 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-black/50"
            >
              <PhoneCall size={20} />
              Оставить заявку
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CtaSection;
