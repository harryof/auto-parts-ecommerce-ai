import React, { useEffect, useRef, useState } from "react";
import { ShieldCheck, Target, Clock, ThumbsUp } from "lucide-react";

const ADVANTAGES = [
  {
    icon: <ShieldCheck size={32} />,
    title: "Оригинальные запчасти",
    desc: "Прямые поставки от производителей. Мы гарантируем 100% подлинность каждой детали.",
    color: "text-emerald-400"
  },
  {
    icon: <Target size={32} />,
    title: "Точный подбор",
    desc: "Больше не нужно гадать. 100% гарантия совместимости по VIN-коду вашего авто.",
    color: "text-primary-400"
  },
  {
    icon: <Clock size={32} />,
    title: "Быстрая доставка",
    desc: "Отправка в день заказа. Доставка по всей России проверенными ТК.",
    color: "text-blue-400"
  },
  {
    icon: <ThumbsUp size={32} />,
    title: "Простой возврат",
    desc: "Деталь не подошла? Вернем деньги без лишних вопросов в течение 14 дней.",
    color: "text-pink-400"
  }
];

const AdvantagesSection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="max-w-[1600px] mx-auto px-4 py-20">
      <div className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <h2 className="section-title text-center">
          Почему <span>выбирают</span> нас
        </h2>
        <div className={`accent-line mx-auto transition-all duration-1000 delay-300 ${visible ? "w-24 opacity-100" : "w-0 opacity-0"}`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ADVANTAGES.map((adv, i) => (
          <div
            key={i}
            className={`glass p-8 rounded-[2rem] relative overflow-hidden group transition-all duration-700 hover:-translate-y-2 hover:shadow-card-hover ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-primary-500/10 transition-colors" />

            <div className={`w-14 h-14 rounded-3xl bg-dark-900 border border-white/5 flex items-center justify-center mb-6 shadow-inner ${adv.color} group-hover:scale-110 transition-transform`}>
              {adv.icon}
            </div>

            <h3 className="text-xl font-bold text-white mb-3 leading-tight">{adv.title}</h3>
            <p className="text-dark-300 text-sm leading-relaxed">{adv.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdvantagesSection;
