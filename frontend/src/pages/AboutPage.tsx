import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck, Truck, Star, Clock, Users, Package,
  Award, Target, Headphones, ChevronRight, Zap,
} from "lucide-react";

/* ── Animated counter hook ──────────────────────────────────── */
function useCounter(target: number, duration = 1800, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, trigger]);
  return count;
}

/* ── Stats data ─────────────────────────────────────────────── */
const STATS = [
  { value: 15,     suffix: "+",  label: "лет на рынке",         icon: Clock },
  { value: 50000,  suffix: "+",  label: "довольных клиентов",   icon: Users },
  { value: 100000, suffix: "+",  label: "товаров в каталоге",   icon: Package },
  { value: 24,     suffix: "/7", label: "поддержка клиентов",   icon: Headphones },
];

/* ── Advantages ─────────────────────────────────────────────── */
const ADVANTAGES = [
  { icon: ShieldCheck, title: "Гарантия качества",        text: "Все товары проходят проверку на соответствие оригинальным стандартам производителей. Работаем только с сертифицированными поставщиками." },
  { icon: Truck,       title: "Быстрая доставка",         text: "Собственный склад с более чем 100 000 позиций обеспечивает отправку в день заказа. Доставляем по всей России за 1–3 дня." },
  { icon: Star,        title: "Официальный дилер",        text: "Являемся официальными партнёрами ведущих производителей автозапчастей: Bosch, Mann-Filter, Bilstein, Castrol, Brembo." },
  { icon: Headphones,  title: "Экспертная поддержка",     text: "Команда технических специалистов поможет подобрать запчасти под ваш автомобиль. Консультации по телефону, WhatsApp и онлайн-чату." },
  { icon: Zap,         title: "ИИ подбор запчастей",      text: "Умный алгоритм подбирает совместимые запчасти по марке и модели вашего авто. Просто введите VIN — и система найдёт всё нужное." },
  { icon: Award,       title: "Лучшие цены",              text: "Прямые контракты с производителями позволяют предлагать цены ниже рыночных. Программа лояльности для постоянных клиентов." },
];

/* ── Timeline ───────────────────────────────────────────────── */
const TIMELINE = [
  { year: "2010", text: "Основание компании. Первый склад на 500 м² в Москве." },
  { year: "2013", text: "Запуск интернет-магазина. Выход на федеральный уровень." },
  { year: "2016", text: "Открытие собственного сервисного центра диагностики." },
  { year: "2019", text: "Партнёрство с ведущими европейскими производителями." },
  { year: "2022", text: "Внедрение системы ИИ-подбора запчастей по VIN." },
  { year: "2025", text: "Более 50 000 активных клиентов по всей России." },
];

/* ── Team ───────────────────────────────────────────────────── */
const TEAM = [
  { name: "Алексей Смирнов",  role: "Основатель & CEO",               initials: "АС" },
  { name: "Мария Козлова",    role: "Руководитель склада",             initials: "МК" },
  { name: "Дмитрий Орлов",    role: "Главный технический специалист",  initials: "ДО" },
  { name: "Ирина Захарова",   role: "Руководитель отдела продаж",      initials: "ИЗ" },
];

const AboutPage: React.FC = () => {
  /* trigger stats counter when section enters viewport */
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const c0 = useCounter(STATS[0].value, 1200, statsVisible);
  const c1 = useCounter(STATS[1].value, 2000, statsVisible);
  const c2 = useCounter(STATS[2].value, 2000, statsVisible);
  const c3 = useCounter(STATS[3].value, 800,  statsVisible);
  const counts = [c0, c1, c2, c3];

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-10">

      {/* ── Hero banner ────────────────────────────────────────── */}
      <section className="relative rounded-3xl overflow-hidden mb-16"
        style={{ background: "linear-gradient(135deg, #1B2131 0%, #2A3246 50%, #1B2131 100%)" }}>
        {/* decorative circles */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #F3C15F 0%, transparent 70%)" }} />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }} />

        <div className="relative z-10 px-8 py-16 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-semibold mb-6">
            <Target size={14} />
            О нашей компании
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight tracking-tight">
            Ваш надёжный<br />
            <span style={{ color: "#F3C15F" }}>партнёр в автомире</span>
          </h1>
          <p className="text-dark-300 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Мы — ведущий онлайн-поставщик оригинальных автозапчастей в России.
            С 2010 года помогаем автовладельцам находить нужные детали быстро, выгодно и надёжно.
          </p>
          <Link to="/catalog" className="btn-primary inline-flex">
            Перейти в каталог <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Animated stats ──────────────────────────────────────── */}
      <section ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {STATS.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="glass rounded-2xl p-6 text-center group hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500/20 transition-colors">
                <Icon size={22} className="text-primary-400" />
              </div>
              <div className="text-3xl font-black text-white mb-1 tabular-nums">
                {counts[i].toLocaleString()}{s.suffix}
              </div>
              <div className="text-sm text-dark-400">{s.label}</div>
            </div>
          );
        })}
      </section>

      {/* ── Mission section ─────────────────────────────────────── */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="section-title text-left mb-6">
              Делаем <span>ремонт авто</span> доступным для каждого
            </h2>
            <p className="text-dark-300 leading-relaxed mb-4">
              Мы верим, что обслуживание автомобиля не должно быть сложным или дорогим. Наша платформа
              объединяет обширный каталог запчастей, умный ИИ-подбор по VIN и профессиональную поддержку —
              всё в одном месте.
            </p>
            <p className="text-dark-300 leading-relaxed">
              Работаем напрямую с производителями, чтобы предлагать лучшие цены без скрытых наценок.
              Каждая запчасть проходит контроль качества до попадания на склад.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {["Bosch", "Castrol", "Bilstein", "Mann-Filter", "Brembo", "Mahle", "VARTA", "Michelin"].map((brand) => (
              <div key={brand}
                className="glass rounded-xl px-4 py-3 flex items-center gap-3 hover:border-primary-500/20 border border-white/5 transition-colors">
                <div className="w-2 h-2 rounded-full bg-primary-400 flex-shrink-0" />
                <span className="text-sm font-semibold text-white">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Advantages ──────────────────────────────────────────── */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="section-title">
            Наши <span>преимущества</span>
          </h2>
          <div className="accent-line mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ADVANTAGES.map(({ icon: Icon, title, text }, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300 border border-white/5 hover:border-primary-500/20"
            >
              <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                <Icon size={22} className="text-primary-400" />
              </div>
              <h3 className="text-white font-bold mb-2">{title}</h3>
              <p className="text-dark-400 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ────────────────────────────────────────────── */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="section-title">
            Наш <span>путь</span>
          </h2>
          <div className="accent-line mx-auto" />
        </div>

        <div className="relative">
          {/* center line — hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 -translate-x-0.5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary-500/30 to-transparent" />

          <div className="space-y-6">
            {TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={i} className={`flex items-center gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Content card */}
                  <div className={`flex-1 ${isLeft ? "md:pr-10 md:text-right" : "md:pl-10"}`}>
                    <div className="glass rounded-2xl p-5 border border-white/5 hover:border-primary-500/20 transition-colors group">
                      <div className="text-primary-400 font-black text-xl mb-1">{item.year}</div>
                      <div className="text-dark-200 text-sm leading-relaxed">{item.text}</div>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="hidden md:flex w-5 h-5 rounded-full bg-primary-500 border-4 border-dark-900 flex-shrink-0 z-10 shadow-lg shadow-primary-500/40" />

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Team ────────────────────────────────────────────────── */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="section-title">
            Люди, которым <span>доверяют</span>
          </h2>
          <div className="accent-line mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {TEAM.map(({ name, role, initials }, i) => (
            <div key={i} className="glass rounded-2xl p-6 text-center group hover:-translate-y-1 transition-transform duration-300 border border-white/5">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-dark-900 font-black text-lg mx-auto mb-4 shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow">
                {initials}
              </div>
              <div className="text-white font-bold text-sm mb-1 leading-snug">{name}</div>
              <div className="text-dark-400 text-xs">{role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="glass rounded-3xl p-10 text-center border border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ background: "radial-gradient(circle at 50% 0%, #F3C15F 0%, transparent 60%)" }} />
        <div className="relative z-10">
          <h2 className="section-title mb-6">
            <span>Готовы</span> начать?
          </h2>
          <p className="text-dark-400 mb-7 max-w-md mx-auto">
            Тысячи автовладельцев уже доверяют нам. Найдите нужные запчасти прямо сейчас.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/catalog" className="btn-primary">
              Открыть каталог <ChevronRight size={16} />
            </Link>
            <Link to="/contacts" className="btn-secondary">
              Связаться с нами
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
