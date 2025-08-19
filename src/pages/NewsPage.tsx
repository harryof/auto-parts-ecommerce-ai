import React, { useState } from "react";
import { Link } from "react-router-dom";
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
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Новое поступление запчастей BMW",
    date: "15.03.2024",
    image: bmw_news,
    excerpt:
      "Поступили новые оригинальные запчасти для моделей BMW серии 3 и 5",
    category: "Поступления",
  },
  {
    id: 2,
    title: "Скидки на масла и фильтры",
    date: "10.03.2024",
    image: maslo_filter,
    excerpt: "Специальные цены на масла и фильтры всех производителей",
    category: "Акции",
  },
  {
    id: 3,
    title: "Открытие нового сервисного центра",
    date: "05.03.2024",
    image: new_service,
    excerpt: "Мы открываем новый современный сервисный центр",
    category: "События",
  },
  {
    id: 4,
    title: "Новые поступления запчастей Mercedes",
    date: "01.03.2024",
    image: mercedes_news,
    excerpt: "Поступили новые оригинальные запчасти для Mercedes-Benz",
    category: "Поступления",
  },
];

const NewsPage: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Спасибо за подписку!");
    setEmail("");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Новости</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {item.category}
                </span>
                <span className="text-gray-500">{item.date}</span>
              </div>
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-600 mb-4">{item.excerpt}</p>
              <Link
                to={`/news/${item.id}`}
                className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Читать подробнее
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Подпишитесь на новости</h2>
        <p className="text-gray-600 mb-4">
          Будьте в курсе последних новостей, акций и поступлений
        </p>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ваш email"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Подписаться
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsPage;
