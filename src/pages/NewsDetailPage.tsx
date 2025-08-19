import React from "react";
import { useParams, useNavigate } from "react-router-dom";
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

// Временные данные для демонстрации
const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Новое поступление запчастей BMW",
    date: "15.03.2024",
    image: bmw_news,
    excerpt:
      "Поступили новые оригинальные запчасти для моделей BMW серии 3 и 5",
    category: "Поступления",
    content: `Мы рады сообщить о поступлении новой партии оригинальных запчастей для моделей BMW серии 3 и 5. В наличии имеются:

• Тормозные колодки и диски
• Фильтры (масляные, воздушные, салонные)
• Подшипники ступиц
• Амортизаторы
• Ремни ГРМ и комплекты натяжителей

Все запчасти являются оригинальными и имеют гарантию производителя. Спешите приобрести необходимые детали по выгодным ценам!

Для получения дополнительной информации о наличии конкретных запчастей, пожалуйста, свяжитесь с нашими консультантами.`,
  },
  {
    id: 2,
    title: "Скидки на масла и фильтры",
    date: "10.03.2024",
    image: maslo_filter,
    excerpt: "Специальные цены на масла и фильтры всех производителей",
    category: "Акции",
    content: `Весенняя распродажа масел и фильтров!

С 10 по 31 марта действуют специальные цены на:
• Моторные масла всех производителей
• Трансмиссионные масла
• Масла для АКПП
• Воздушные фильтры
• Масляные фильтры
• Салонные фильтры

Скидки до 30% на весь ассортимент!

При покупке комплекта масла и фильтров - дополнительная скидка 5%.

Акция действует при наличии товара на складе.`,
  },
  {
    id: 3,
    title: "Открытие нового сервисного центра",
    date: "05.03.2024",
    image: new_service,
    excerpt: "Мы открываем новый современный сервисный центр",
    category: "События",
    content: `Мы рады сообщить об открытии нового современного сервисного центра!

Новый центр оснащен:
• Современным диагностическим оборудованием
• Специализированными подъемниками
• Компьютерной системой управления
• Зоной ожидания с Wi-Fi и кофе

В новом центре работают опытные специалисты, прошедшие обучение у производителей.

Услуги центра:
• Диагностика всех систем автомобиля
• Техническое обслуживание
• Ремонт двигателей и трансмиссий
• Кузовной ремонт
• Покраска

Запись на сервис уже открыта!`,
  },
  {
    id: 4,
    title: "Новые поступления запчастей Mercedes",
    date: "01.03.2024",
    image: mercedes_news,
    excerpt: "Поступили новые оригинальные запчасти для Mercedes-Benz",
    category: "Поступления",
    content: `Поступили новые оригинальные запчасти для Mercedes-Benz!

В наличии:
• Комплекты сцепления
• Тормозные системы
• Подвеска
• Электрика
• Кузовные детали

Все запчасти оригинальные, с гарантией производителя.

Спешите приобрести необходимые детали по выгодным ценам!

Для уточнения наличия конкретных запчастей обращайтесь к нашим консультантам.`,
  },
];

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const newsItem = newsData.find((item) => item.id === Number(id));

  if (!newsItem) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Новость не найдена
          </h1>
          <button
            onClick={() => navigate("/news")}
            className="text-blue-600 hover:text-blue-800"
          >
            Вернуться к списку новостей
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate("/news")}
        className="text-blue-600 hover:text-blue-800 mb-6 flex items-center"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Назад к новостям
      </button>

      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={newsItem.image}
          alt={newsItem.title}
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {newsItem.category}
            </span>
            <span className="text-gray-500">{newsItem.date}</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">{newsItem.title}</h1>
          <div className="prose max-w-none">
            {newsItem.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsDetailPage;
