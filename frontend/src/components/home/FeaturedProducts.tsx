import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Flame, Sparkles, Star } from "lucide-react";
import { products } from "../../data/products";
import ProductCard from "../catalog/ProductCard";

const TABS = [
  { id: "hits",        label: "Хиты",       icon: <Flame    size={14}/> },
  { id: "new",         label: "Новинки",    icon: <Sparkles size={14}/> },
  { id: "recommended", label: "Топ выбор",  icon: <Star     size={14}/> },
];

const FeaturedProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState("hits");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver to trigger fade-in
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const filtered = products.filter(p => {
    if (activeTab === "hits")        return p.isHit;
    if (activeTab === "new")         return p.isNew;
    if (activeTab === "recommended") return p.isRecommended;
    return true;
  });
  return (
    <section ref={sectionRef} className="max-w-[1600px] mx-auto px-4 py-20">
      {/* Header */}
      <div className={`relative flex flex-col items-center gap-4 mb-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <div className="text-center">
          <h2 className="section-title">Лучшие <span>предложения</span></h2>
          <div className="accent-line mx-auto" />
        </div>
        <Link to="/catalog" className="sm:absolute sm:right-0 sm:bottom-0 flex items-center gap-2 text-sm font-semibold text-dark-300 hover:text-white transition-colors group self-center sm:self-auto">
          Весь каталог <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Tabs */}
      <div className={`flex gap-2 mb-8 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-primary-600 text-white shadow-glow-sm"
                : "glass text-dark-300 hover:text-white hover:bg-white/10"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            index={i}
            visible={visible}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
