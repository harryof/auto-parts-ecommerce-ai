import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PROMOS = [
  {
    id: 1,
    title: "Готовьтесь к зиме",
    subtitle: "Скидки до 30% на аккумуляторы",
    image: "https://images.pexels.com/photos/191533/pexels-photo-191533.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "/catalog/batteries",
    color: "from-blue-900/90 to-blue-900/40"
  },
  {
    id: 2,
    title: "Сезонное ТО",
    subtitle: "Моторные масла и фильтры по спеццене",
    image: "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "/catalog/oil",
    color: "from-primary-900/90 to-primary-900/40"
  }
];

const PromoBanners: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="max-w-[1600px] mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROMOS.map((promo, i) => (
          <Link
            key={promo.id}
            to={promo.link}
            className={`group relative overflow-hidden rounded-[2.5rem] h-64 md:h-80 flex items-end p-8 transition-all duration-700 hover:-translate-y-2 hover:shadow-card-hover ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            {/* BG Image */}
            <img
              src={promo.image}
              alt={promo.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${promo.color} mix-blend-multiply opacity-80 group-hover:opacity-90 transition-opacity`} />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent opacity-90" />

            {/* Content */}
            <div className="relative z-10 w-full">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-bold uppercase tracking-wider text-white bg-white/20 backdrop-blur-md rounded-full border border-white/10">
                Акция
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight">
                {promo.title}
              </h3>
              <p className="text-dark-300 font-medium mb-6">
                {promo.subtitle}
              </p>
              
              <div className="flex items-center gap-2 text-sm font-bold text-primary-400 group-hover:text-primary-300 transition-colors uppercase tracking-widest">
                В каталог <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PromoBanners;
