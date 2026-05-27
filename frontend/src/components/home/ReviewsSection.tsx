import React, { useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "Алексей Смирнов",
    car: "BMW X5 (E70)",
    text: "Отличный магазин! Заказывал комплект рычагов подвески. Привезли на следующий день, всё оригинал. Цены заметно ниже, чем у дилера. Рекомендую!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: 2,
    name: "Елена Васильева",
    car: "Toyota Camry (V70)",
    text: "Долго искала оригинальные тормозные колодки. Менеджер по VIN-коду за 5 минут подобрал нужные. Доставка быстрая, упаковка целая. Спасибо!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 3,
    name: "Дмитрий Иванов",
    car: "Volkswagen Polo",
    text: "Постоянно беру здесь фильтры и масло для планового ТО. Качество отличное, контрафакта ни разу не попадалось. Радует бонусная система.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=12"
  }
];

const ReviewsSection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="max-w-[1600px] mx-auto px-4 py-20 relative">
      <div className={`text-center mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <h2 className="section-title">
          Что говорят наши <span>клиенты</span>
        </h2>
        <div className={`accent-line mx-auto transition-all duration-1000 delay-300 ${visible ? "w-24 opacity-100" : "w-0 opacity-0"}`} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {REVIEWS.map((review, i) => (
          <div
            key={review.id}
            className={`glass p-8 rounded-3xl relative group transition-all duration-700 hover:-translate-y-2 hover:shadow-glow-sm ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            <Quote size={40} className="absolute top-6 right-6 text-white/5 group-hover:text-primary-500/10 transition-colors" />
            
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} size={16} className={idx < review.rating ? "text-primary-500 fill-primary-500" : "text-dark-500"} />
              ))}
            </div>

            <p className="text-dark-200 text-sm leading-relaxed mb-8 italic">
              "{review.text}"
            </p>

            <div className="flex items-center gap-4 mt-auto">
              <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full border-2 border-primary-500/30" />
              <div>
                <div className="font-bold text-white text-sm">{review.name}</div>
                <div className="text-xs text-primary-400">{review.car}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-primary-500/5 rounded-full blur-[100px] pointer-events-none z-0" />
    </section>
  );
};

export default ReviewsSection;
