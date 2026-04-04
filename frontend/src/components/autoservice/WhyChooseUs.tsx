import React from "react";

const BENEFITS = [
  { icon: "🏆", text: "Опытные мастера с сертификатами" },
  { icon: "🔩", text: "Оригинальные запчасти" },
  { icon: "✅", text: "Гарантия на все работы" },
  { icon: "🔧", text: "Современное оборудование" },
  { icon: "⚡", text: "Быстрое выполнение заказов" },
  { icon: "📋", text: "Прозрачное ценообразование" },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="glass rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-5" style={{ color: "var(--color-text)" }}>
        Почему выбирают нас
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {BENEFITS.map(({ icon, text }) => (
          <li key={text} className="flex items-center gap-3">
            <span
              className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-base"
              style={{ background: "rgba(243,193,95,0.12)" }}
            >
              {icon}
            </span>
            <span className="text-sm font-medium text-dark-300">{text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WhyChooseUs;
