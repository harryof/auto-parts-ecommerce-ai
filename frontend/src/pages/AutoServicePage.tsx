import React from "react";
import ServiceList, { Service } from "../components/autoservice/ServiceList";
import WhyChooseUs from "../components/autoservice/WhyChooseUs";
import ServiceForm from "../components/autoservice/ServiceForm";

const services: Service[] = [
  {
    id: 1,
    title: "Диагностика",
    description: "Компьютерная диагностика всех систем автомобиля с использованием современного оборудования",
    price: "от 1 500 ₽",
    duration: "30-60 мин",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Техническое обслуживание",
    description: "Полное ТО с заменой всех необходимых расходных материалов и жидкостей",
    price: "от 3 000 ₽",
    duration: "2-3 часа",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Ремонт двигателя",
    description: "Профессиональный ремонт двигателя любой сложности с гарантией на работы",
    price: "от 15 000 ₽",
    duration: "1-3 дня",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Кузовной ремонт",
    description: "Восстановление геометрии кузова, покраска, удаление вмятин без покраски",
    price: "от 5 000 ₽",
    duration: "1-5 дней",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const AutoServicePage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="section-title mb-4">
        <span>Автосервис</span>
      </h1>
      <div className="accent-line mx-auto mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <ServiceList services={services} />
          <WhyChooseUs />
        </div>

        <div>
          <ServiceForm services={services} />
        </div>
      </div>
    </div>
  );
};

export default AutoServicePage;

