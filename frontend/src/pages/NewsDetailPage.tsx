import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import bmw_news from "../img/news_bmw.jpg";
import maslo_filter from "../img/maslo_filter_news.jpg";
import new_service from "../img/service_news.jpg";
import mercedes_news from "../img/mercedes_news.jpg";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  category: string;
  content: string;
}

const newsData: NewsItem[] = [
  {
    id: 1, title: "Новое поступление запчастей BMW", date: "15.03.2024",
    image: bmw_news, excerpt: "Поступили новые оригинальные запчасти для моделей BMW серии 3 и 5",
    category: "Поступления",
    content: `Мы рады сообщить о поступлении новой партии оригинальных запчастей для моделей BMW серии 3 и 5. В наличии имеются:\n\n• Тормозные колодки и диски\n• Фильтры (масляные, воздушные, салонные)\n• Подшипники ступиц\n• Амортизаторы\n• Ремни ГРМ и комплекты натяжителей\n\nВсе запчасти являются оригинальными и имеют гарантию производителя. Спешите приобрести необходимые детали по выгодным ценам!\n\nДля получения дополнительной информации о наличии конкретных запчастей, пожалуйста, свяжитесь с нашими консультантами.`,
  },
  {
    id: 2, title: "Скидки на масла и фильтры", date: "10.03.2024",
    image: maslo_filter, excerpt: "Специальные цены на масла и фильтры всех производителей",
    category: "Акции",
    content: `Весенняя распродажа масел и фильтров!\n\nС 10 по 31 марта действуют специальные цены на:\n• Моторные масла всех производителей\n• Трансмиссионные масла\n• Масла для АКПП\n• Воздушные фильтры\n• Масляные фильтры\n• Салонные фильтры\n\nСкидки до 30% на весь ассортимент!\n\nПри покупке комплекта масла и фильтров — дополнительная скидка 5%.\n\nАкция действует при наличии товара на складе.`,
  },
  {
    id: 3, title: "Открытие нового сервисного центра", date: "05.03.2024",
    image: new_service, excerpt: "Мы открываем новый современный сервисный центр",
    category: "События",
    content: `Мы рады сообщить об открытии нового современного сервисного центра!\n\nНовый центр оснащен:\n• Современным диагностическим оборудованием\n• Специализированными подъемниками\n• Компьютерной системой управления\n• Зоной ожидания с Wi-Fi и кофе\n\nВ новом центре работают опытные специалисты, прошедшие обучение у производителей.\n\nУслуги центра:\n• Диагностика всех систем автомобиля\n• Техническое обслуживание\n• Ремонт двигателей и трансмиссий\n• Кузовной ремонт\n• Покраска\n\nЗапись на сервис уже открыта!`,
  },
  {
    id: 4, title: "Новые поступления запчастей Mercedes", date: "01.03.2024",
    image: mercedes_news, excerpt: "Поступили новые оригинальные запчасти для Mercedes-Benz",
    category: "Поступления",
    content: `Поступили новые оригинальные запчасти для Mercedes-Benz!\n\nВ наличии:\n• Комплекты сцепления\n• Тормозные системы\n• Подвеска\n• Электрика\n• Кузовные детали\n\nВсе запчасти оригинальные, с гарантией производителя.\n\nСпешите приобрести необходимые детали по выгодным ценам!\n\nДля уточнения наличия конкретных запчастей обращайтесь к нашим консультантам.`,
  },
];

const CATEGORY_TEXT: Record<string, string> = {
  "Поступления": "#F3C15F",
  "Акции": "#60a5fa",
  "События": "#34d399",
};

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const newsItem = newsData.find((item) => item.id === Number(id));

  if (!newsItem) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center animate-fade-in">
        <h1 className="section-title mb-6">
          Новость <span>не найдена</span>
        </h1>
        <button onClick={() => navigate("/news")} className="btn-primary">
          Вернуться к новостям
        </button>
      </div>
    );
  }

  const catColor = CATEGORY_TEXT[newsItem.category] ?? "#F3C15F";

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in">
      {/* Back button */}
      <button
        onClick={() => navigate("/news")}
        className="inline-flex items-center gap-2 mb-8 text-sm font-semibold transition-colors duration-200 hover:opacity-80"
        style={{ color: "#F3C15F" }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Назад к новостям
      </button>

      {/* Article card */}
      <article className="glass rounded-3xl overflow-hidden" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}>
        {/* Hero image */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img
            src={newsItem.image}
            alt={newsItem.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />
          {/* Category + date over image */}
          <div className="absolute bottom-5 left-6 flex items-center gap-3">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm"
              style={{ background: `${catColor}26`, color: catColor, border: `1px solid ${catColor}44` }}
            >
              {newsItem.category}
            </span>
            <span className="text-xs font-medium text-white/80">📅 {newsItem.date}</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-8">
          <h1 className="section-title mb-4" style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)" }}>
            <span>{newsItem.title}</span>
          </h1>
          <div className="accent-line mb-8" />

          <div className="flex flex-col gap-4">
            {newsItem.content.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-relaxed text-dark-300"
                style={{ whiteSpace: "pre-line" }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{ borderTop: "1px solid var(--color-border)" }}
          >
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: "#F3C15F" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Все новости
            </Link>
            <Link to="/catalog" className="btn-primary text-sm px-6 py-3">
              Перейти в каталог
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsDetailPage;
