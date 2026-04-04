import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Youtube, ArrowRight, Send } from "lucide-react";
import logo from "../../assets/graphics/Logo.png";
import { useTheme } from "../../context/ThemeContext";

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-10 overflow-hidden">
      {/* Gradient top border */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #e11d48 40%, #fb923c 60%, transparent)' }} />

      {/* Bg decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-900/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img 
                src={logo} 
                alt="МОЯ АВТОКОМПАНИЯ" 
                className={`h-8 transition-all duration-300 ${theme === "dark" ? "brightness-0 invert opacity-90" : "brightness-0 opacity-100"}`} 
              />
            </Link>
            <p className="text-sm text-dark-400 leading-relaxed mb-6">
              Интернет-магазин автозапчастей с широким ассортиментом для вашего автомобиля. Гарантия качества и быстрая доставка.
            </p>
            <div className="space-y-2.5">
              {[
                { icon: <Phone size={14} />, text: '8 (800) 775-16-72', href: 'tel:88007751672' },
                { icon: <Mail size={14} />, text: 'info@myautocompany.ru', href: 'mailto:info@myautocompany.ru' },
                { icon: <MapPin size={14} />, text: 'г. Казань, ул. Кремлевская, д. 35', href: '#' },
              ].map((item, i) => (
                <a key={i} href={item.href} className="flex items-start gap-2.5 text-sm text-dark-400 hover:text-white transition-colors group">
                  <span className="text-primary-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">{item.icon}</span>
                  {item.text}
                </a>
              ))}
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3">Каталог</h3>
            <div className="accent-line w-8 mb-5" />
            <ul className="space-y-2.5">
              {[
                { to: '/catalog/spare-parts', label: 'Запчасти' },
                { to: '/catalog/tuning', label: 'Тюнинг' },
                { to: '/catalog/auto-chemistry', label: 'Автохимия' },
                { to: '/catalog/batteries', label: 'Аккумуляторы' },
                { to: '/catalog/accessories', label: 'Аксессуары' },
                { to: '/catalog/oil', label: 'Масла' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-dark-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 text-primary-500 transition-opacity -ml-3.5 group-hover:ml-0 transition-all" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3">Информация</h3>
            <div className="accent-line w-8 mb-5" />
            <ul className="space-y-2.5">
              {[
                { to: '/about', label: 'О компании' },
                { to: '/how-to-buy', label: 'Как купить' },
                { to: '/autoservice', label: 'Автосервис' },
                { to: '/news', label: 'Новости' },
                { to: '/contacts', label: 'Контакты' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-dark-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 text-primary-500 -ml-3.5 group-hover:ml-0 transition-all" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Social */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3">Рассылка</h3>
            <div className="accent-line w-8 mb-5" />
            <p className="text-sm text-dark-400 mb-4">Получайте новости и акции первыми</p>
            <form className="flex gap-2 mb-6" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Ваш email"
                className="input-dark text-sm flex-1 min-w-0"
              />
              <button type="submit" className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-primary-600 hover:bg-primary-500 text-white transition-all hover:shadow-glow-sm">
                <Send size={15} />
              </button>
            </form>

            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3">Соцсети</h3>
            <div className="accent-line w-8 mb-5" />
            <div className="flex gap-3">
              {[
                { icon: <Instagram size={18} />, href: '#', label: 'Instagram' },
                { icon: <Youtube size={18} />, href: '#', label: 'YouTube' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center text-dark-400 hover:text-white hover:bg-primary-600/20 hover:border-primary-500/30 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-dark-500">© {year} AutoParts. Все права защищены.</p>
          <div className="flex flex-wrap gap-5">
            {[
              { to: '/privacy-policy', label: 'Конфиденциальность' },
              { to: '/terms', label: 'Условия' },
            ].map(l => (
              <Link key={l.to} to={l.to} className="text-xs text-dark-500 hover:text-dark-300 transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
