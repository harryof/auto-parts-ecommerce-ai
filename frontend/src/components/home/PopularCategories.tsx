import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

import imgEngine     from "../../assets/images/cat_engine_1773677903282.png";
import imgBrakes     from "../../assets/images/cat_brakes_1773677920000.png";
import imgFilters    from "../../assets/images/cat_filters_1773677936051.png";
import imgSuspension from "../../assets/images/cat_suspension_1773677953242.png";
import imgElectrics  from "../../assets/images/cat_electrics_1774536990818.png";
import imgBody       from "../../assets/images/cat_body_1774537008748.png";
import imgLighting   from "../../assets/images/cat_lighting_1774537024443.png";
import imgBattery    from "../../assets/images/cat_battery_1774537044139.png";

const CATEGORIES = [
  { id: "engine",     title: "Двигатели и КПП",     image: imgEngine,     link: "/catalog/spare-parts/engine-parts",  gradient: "from-orange-900/60 via-black/20 to-transparent" },
  { id: "brakes",     title: "Тормозная система",   image: imgBrakes,     link: "/catalog/spare-parts/brake-system",  gradient: "from-red-900/60 via-black/20 to-transparent" },
  { id: "filters",    title: "Фильтры и масла",      image: imgFilters,    link: "/catalog/oil",                      gradient: "from-yellow-900/60 via-black/20 to-transparent" },
  { id: "suspension", title: "Подвеска и рулевое",  image: imgSuspension, link: "/catalog/spare-parts/suspension",    gradient: "from-blue-900/60 via-black/20 to-transparent" },
  { id: "electrics",  title: "Электрика",            image: imgElectrics,  link: "/catalog/spare-parts/electrics",    gradient: "from-indigo-900/60 via-black/20 to-transparent" },
  { id: "body",       title: "Кузовные детали",      image: imgBody,       link: "/catalog/spare-parts/body",         gradient: "from-slate-900/60 via-black/20 to-transparent" },
  { id: "lighting",   title: "Освещение",            image: imgLighting,   link: "/catalog/spare-parts/lighting",     gradient: "from-cyan-900/60 via-black/20 to-transparent" },
  { id: "battery",    title: "Аккумуляторы",         image: imgBattery,    link: "/catalog/spare-parts/battery",      gradient: "from-green-900/60 via-black/20 to-transparent" },
];

const ITEMS_PER_PAGE = 4;
const GAP = 24; 

const PopularCategories: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const wrapRef    = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(CATEGORIES.length / ITEMS_PER_PAGE);

  
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  
  const scrollToPage = useCallback((targetPage: number) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const containerW = wrap.clientWidth;
    wrap.scrollTo({ left: containerW * targetPage, behavior: "smooth" });
  }, []);

  const goLeft  = () => { const p = Math.max(0, page - 1); setPage(p); scrollToPage(p); };
  const goRight = () => { const p = Math.min(totalPages - 1, page + 1); setPage(p); scrollToPage(p); };

  return (
    <section ref={sectionRef} className="max-w-[1600px] mx-auto px-4 py-16">
      <h2
        className={`section-title text-center transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <span>Популярные</span> категории
      </h2>
      <div className={`accent-line mx-auto transition-all duration-1000 delay-300 ${visible ? "w-24 opacity-100" : "w-0 opacity-0"}`} />

      
      <div className="relative">

        
        <button
          onClick={goLeft}
          aria-label="Назад"
          className={`
            hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20
            w-12 h-12 items-center justify-center
            glass rounded-full border border-white/10
            text-white hover:text-[#F3C15F]
            transition-all duration-200
            hover:scale-110 hover:shadow-[0_0_20px_rgba(243,193,95,0.25)]
            ${page > 0 ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        
        <div
          ref={wrapRef}
          className="overflow-x-hidden no-scrollbar"
        >
          <div
            ref={trackRef}
            className="flex"
            style={{ gap: GAP }}
          >
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat.id}
                to={cat.link}
                className={`
                  group relative flex-shrink-0 rounded-[2rem] overflow-hidden
                  transition-all duration-700
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                `}
                style={{
                  
                  background: "#1e2a3a",
                  width: `calc((100% - ${GAP * (ITEMS_PER_PAGE - 1)}px) / ${ITEMS_PER_PAGE})`,
                  height: 220,
                  transitionDelay: `${(i % ITEMS_PER_PAGE) * 80}ms`,
                  scrollSnapAlign: "start",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                }}
              >
                
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 45%, transparent 100%)",
                  }}
                />

                
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  style={{ background: "linear-gradient(135deg, rgba(243,193,95,0.10) 0%, transparent 60%)" }}
                />

                
                <div className="absolute inset-0 flex items-center justify-center p-5 pb-12 transition-transform duration-500 group-hover:scale-110">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-contain"
                    style={{ filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.5))" }}
                  />
                </div>

                
                <div className="absolute bottom-0 left-0 right-0 z-20 px-5 py-4">
                  <h3
                    className="text-sm font-bold leading-tight drop-shadow-lg"
                    style={{ color: "#ffffff" }}
                  >
                    {cat.title}
                  </h3>
                  <div
                    className="mt-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
                    style={{ color: "#F3C15F" }}
                  >
                    <span className="text-xs font-semibold">Перейти</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                
                <div className="absolute bottom-0 left-0 right-0 h-[3px] z-30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ background: "linear-gradient(to right, #F3C15F, #F5D085)" }}
                />
              </Link>
            ))}
          </div>
        </div>

        
        <button
          onClick={goRight}
          aria-label="Вперед"
          className={`
            hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20
            w-12 h-12 items-center justify-center
            glass rounded-full border border-white/10
            text-white hover:text-[#F3C15F]
            transition-all duration-200
            hover:scale-110 hover:shadow-[0_0_20px_rgba(243,193,95,0.25)]
            ${page < totalPages - 1 ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => { setPage(i); scrollToPage(i); }}
            aria-label={`Страница ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === page
                ? "w-6 h-2 bg-[#F3C15F]"
                : "w-2 h-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default PopularCategories;
