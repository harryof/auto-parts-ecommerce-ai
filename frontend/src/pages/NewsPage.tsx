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

const CATEGORY_COLORS: Record<string, string> = {
  "Поступления": "rgba(243,193,95,0.15)",
  "Акции":       "rgba(59,130,246,0.15)",
  "События":     "rgba(16,185,129,0.15)",
};
const CATEGORY_TEXT: Record<string, string> = {
  "Поступления": "#F3C15F",
  "Акции":       "#60a5fa",
  "События":     "#34d399",
};

const NewsPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  React.useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then(res => res.json())
      .then(data => {
        
        setNewsItems(data.map((item: any) => ({
          id: item.id,
          title: item.title,
          date: new Date(item.created_at).toLocaleDateString(),
          image: item.image_url ? `http://localhost:5000${item.image_url}` : '',
          excerpt: item.excerpt,
          category: item.category
        })));
      })
      .catch(console.error);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 animate-fade-in">
      <h1 className="section-title mb-4">
        Наши <span>новости</span>
      </h1>
      <div className="accent-line mx-auto mb-12" />

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="glass rounded-2xl overflow-hidden group hover:scale-[1.01] transition-transform duration-200"
            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
          >
            
            <div className="relative h-52 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              <div className="absolute top-4 left-4">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm"
                  style={{
                    background: CATEGORY_COLORS[item.category] ?? "rgba(243,193,95,0.15)",
                    color: CATEGORY_TEXT[item.category] ?? "#F3C15F",
                    border: `1px solid ${CATEGORY_TEXT[item.category] ?? "#F3C15F"}33`,
                  }}
                >
                  {item.category}
                </span>
              </div>
            </div>

            
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-dark-400">
                  📅 {item.date}
                </span>
              </div>
              <h2
                className="text-lg font-bold mb-2 leading-snug"
                style={{ color: "var(--color-text)" }}
              >
                {item.title}
              </h2>
              <p className="text-sm text-dark-300 mb-5">{item.excerpt}</p>
              <Link
                to={`/news/${item.id}`}
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
                style={{ color: "#F3C15F" }}
              >
                Читать подробнее
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      
      <div className="mt-14 glass rounded-3xl p-10 text-center" style={{ border: "1px solid rgba(243,193,95,0.2)" }}>
        <h2 className="section-title mb-4">
          Подпишитесь на <span>новости</span>
        </h2>
        <div className="accent-line mx-auto mb-6" />
        <p className="text-dark-300 mb-6 text-base">
          Будьте в курсе последних новостей, акций и поступлений
        </p>

        {subscribed && (
          <div
            className="mb-5 mx-auto max-w-md px-4 py-3 rounded-xl text-sm font-semibold text-emerald-300 border border-emerald-500/30"
            style={{ background: "rgba(16,185,129,0.1)" }}
          >
            ✓ Спасибо за подписку!
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ваш email адрес"
            required
            className="flex-1"
            style={{
              background: "var(--input-bg)",
              color: "var(--input-color)",
              border: "1px solid var(--color-border2)",
              borderRadius: "9999px",
              padding: "0.75rem 1.25rem",
              fontSize: "0.9rem",
              outline: "none",
            }}
            onFocus={e => { e.currentTarget.style.borderColor = "#F3C15F"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(243,193,95,0.15)"; }}
            onBlur={e => { e.currentTarget.style.borderColor = "var(--color-border2)"; e.currentTarget.style.boxShadow = "none"; }}
          />
          <button type="submit" className="btn-primary px-8">
            Подписаться
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsPage;
