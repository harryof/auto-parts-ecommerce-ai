import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Truck, Package, MapPin, Clock, CreditCard, Banknote,
  Smartphone, ShieldCheck, ChevronRight, Search, ShoppingCart,
  ClipboardList, CheckCircle2, ChevronDown, Headphones, Zap,
} from "lucide-react";


const ORDER_STEPS = [
  {
    icon: Search,
    title: "Найдите товар",
    text: "Воспользуйтесь каталогом или поиском. Фильтруйте по марке авто, категории или VIN-номеру.",
  },
  {
    icon: ShoppingCart,
    title: "Добавьте в корзину",
    text: "Нажмите «В корзину». Вы можете добавить несколько товаров и изменить количество в любой момент.",
  },
  {
    icon: ClipboardList,
    title: "Оформите заказ",
    text: "Укажите контактные данные, выберите способ доставки и оплаты. Проверьте состав заказа.",
  },
  {
    icon: CreditCard,
    title: "Оплатите",
    text: "Оплатите любым удобным способом: карта, СБП, наличные или безналичный расчёт для юр. лиц.",
  },
  {
    icon: CheckCircle2,
    title: "Получите заказ",
    text: "Мы отправим уведомление при отгрузке. Отслеживайте заказ в личном кабинете в реальном времени.",
  },
];

const DELIVERY_METHODS = [
  {
    icon: Truck,
    title: "Курьер по Москве",
    badge: "1–2 дня",
    badgeColor: "text-primary-400 bg-primary-500/10",
    items: [
      "Доставка в пределах МКАД — 350 ₽",
      "За МКАД — от 500 ₽ (до 30 км)",
      "Экспресс-доставка в день заказа — 800 ₽",
      "Бесплатно при заказе от 5 000 ₽",
    ],
  },
  {
    icon: Package,
    title: "СДЭК / Почта России",
    badge: "2–7 дней",
    badgeColor: "text-blue-400 bg-blue-500/10",
    items: [
      "Доставка по всей России",
      "Отправка в день заказа при оплате до 14:00",
      "Стоимость от 300 ₽ (зависит от региона)",
      "Отслеживание посылки онлайн",
    ],
  },
  {
    icon: MapPin,
    title: "Самовывоз",
    badge: "Бесплатно",
    badgeColor: "text-emerald-400 bg-emerald-500/10",
    items: [
      "Склад: Москва, ул. Автозаводская, 12",
      "Режим: Пн–Пт 9:00–20:00, Сб 10:00–18:00",
      "Готовность к выдаче — от 1 часа",
      "Возможен осмотр товара перед оплатой",
    ],
  },
  {
    icon: Zap,
    title: "Постаматы и ПВЗ",
    badge: "1–4 дня",
    badgeColor: "text-purple-400 bg-purple-500/10",
    items: [
      "ПВЗ СДЭК — более 4 000 точек по России",
      "Постаматы Яндекс Go — Москва и регионы",
      "Хранение до 7 дней",
      "Стоимость от 200 ₽",
    ],
  },
];

const PAYMENT_METHODS = [
  { icon: CreditCard,  title: "Банковская карта",   text: "Visa, Mastercard, МИР — онлайн через защищённый шлюз" },
  { icon: Smartphone,  title: "СБП / QR-код",        text: "Система быстрых платежей без комиссии" },
  { icon: Banknote,    title: "Наличными",            text: "Оплата наличными курьеру или при самовывозе" },
  { icon: ShieldCheck, title: "Для юр. лиц (НДС)",   text: "Безналичный расчёт, счёт-фактура, акт" },
];

const FAQ = [
  {
    q: "Можно ли изменить адрес доставки после оформления?",
    a: "Да, пока заказ не передан в службу доставки. Свяжитесь с нами по телефону или через чат в течение 1 часа после оплаты.",
  },
  {
    q: "Что делать, если пришёл не тот товар или он повреждён?",
    a: "Сфотографируйте товар и упаковку и отправьте нам через раздел «Контакты». Мы организуем возврат и повторную отправку за наш счёт.",
  },
  {
    q: "Как отследить статус заказа?",
    a: "Трек-номер отправляется на вашу электронную почту после отгрузки. Также статус доступен в личном кабинете в разделе «Мои заказы».",
  },
  {
    q: "Есть ли бесплатная доставка?",
    a: "Да! При заказе от 5 000 ₽ — бесплатная курьерская доставка по Москве. При заказе от 15 000 ₽ — бесплатная доставка по России (СДЭК).",
  },
  {
    q: "Какой срок возврата товара?",
    a: "14 дней с момента получения при сохранении товарного вида и упаковки. Для возврата заполните заявку на сайте или свяжитесь с нами.",
  },
];


const HowToBuyPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="max-w-[1100px] mx-auto px-4 py-10">

      
      <section
        className="relative rounded-3xl overflow-hidden mb-14 px-8 py-16 text-center"
        style={{ background: "linear-gradient(135deg, #1B2131 0%, #2A3246 60%, #1B2131 100%)" }}
      >
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #F3C15F, transparent 70%)" }} />
        <div className="absolute -bottom-12 -left-12 w-52 h-52 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)" }} />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-semibold mb-5">
            <Truck size={14} /> Доставка и оплата
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
            Доставка по всей<br />
            <span style={{ color: "#F3C15F" }}>России</span>
          </h1>
          <p className="text-dark-300 text-base max-w-xl mx-auto mb-8">
            Быстро, надёжно, с отслеживанием. Отправляем ежедневно с собственного склада.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {[
              { label: "Бесплатно от 5 000 ₽", color: "text-primary-400" },
              { label: "Отправка в день заказа", color: "text-emerald-400" },
              { label: "Отслеживание онлайн", color: "text-blue-400" },
            ].map(({ label, color }) => (
              <div key={label} className={`flex items-center gap-2 font-semibold ${color}`}>
                <CheckCircle2 size={14} /> {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="section-title">
            Как сделать <span>заказ</span>
          </h2>
          <div className="accent-line mx-auto" />
        </div>

        <div className="relative">
          
          <div className="hidden md:block absolute top-10 left-[calc(10%+2rem)] right-[calc(10%+2rem)] h-0.5 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {ORDER_STEPS.map(({ icon: Icon, title, text }, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                
                <div className="relative mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors z-10 relative">
                    <Icon size={24} className="text-primary-400" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary-500 text-dark-900 text-xs font-black flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-white font-bold text-sm mb-1">{title}</h3>
                <p className="text-dark-400 text-xs leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="section-title">
            Варианты <span>доставки</span>
          </h2>
          <div className="accent-line mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {DELIVERY_METHODS.map(({ icon: Icon, title, badge, badgeColor, items }, i) => (
            <div key={i} className="glass rounded-2xl p-6 border border-white/5 hover:border-primary-500/20 transition-all duration-300 hover:-translate-y-1 group">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-dark-800 flex items-center justify-center group-hover:bg-primary-500/10 transition-colors">
                    <Icon size={20} className="text-primary-400" />
                  </div>
                  <h3 className="text-white font-bold">{title}</h3>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${badgeColor}`}>{badge}</span>
              </div>
              <ul className="space-y-2">
                {items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-dark-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500/50 flex-shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        
        <div className="mt-5 glass rounded-2xl p-5 border border-primary-500/20 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0">
            <Truck size={22} className="text-primary-400" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="text-white font-bold mb-0.5">Условия бесплатной доставки</div>
            <div className="text-dark-400 text-sm">
              По Москве — от <span className="text-primary-400 font-bold">5 000 ₽</span> · 
              По России — от <span className="text-primary-400 font-bold">15 000 ₽</span>
            </div>
          </div>
          <Link to="/catalog" className="btn-primary whitespace-nowrap text-sm py-2.5 px-5">
            В каталог <ChevronRight size={14} />
          </Link>
        </div>
      </section>

      
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="section-title">
            Способы <span>оплаты</span>
          </h2>
          <div className="accent-line mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PAYMENT_METHODS.map(({ icon: Icon, title, text }, i) => (
            <div key={i} className="glass rounded-2xl p-5 text-center border border-white/5 hover:border-primary-500/20 transition-all hover:-translate-y-1 group">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-dark-800 flex items-center justify-center group-hover:bg-primary-500/10 transition-colors">
                <Icon size={22} className="text-primary-400" />
              </div>
              <div className="text-white font-bold text-sm mb-1">{title}</div>
              <div className="text-dark-400 text-xs leading-relaxed">{text}</div>
            </div>
          ))}
        </div>

        
        <div className="mt-5 flex items-center justify-center gap-3 text-sm text-dark-400">
          <ShieldCheck size={16} className="text-emerald-400" />
          Все платежи защищены SSL-шифрованием. Данные карты не хранятся на наших серверах.
        </div>
      </section>

      
      <section className="mb-16">
        <div className="glass rounded-2xl overflow-hidden border border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
            {[
              { icon: Clock,        label: "Время обработки",  val: "до 2 часов",    note: "в рабочие дни" },
              { icon: Truck,        label: "Срок доставки",    val: "1–7 дней",      note: "зависит от региона" },
              { icon: Headphones,   label: "Поддержка",        val: "24/7",          note: "чат и телефон" },
            ].map(({ icon: Icon, label, val, note }, i) => (
              <div key={i} className="flex items-center gap-4 p-6">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-primary-400" />
                </div>
                <div>
                  <div className="text-xs text-dark-400 mb-0.5">{label}</div>
                  <div className="text-white font-black text-lg leading-none">{val}</div>
                  <div className="text-dark-500 text-xs mt-0.5">{note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="section-title">
            Частые <span>вопросы</span>
          </h2>
          <div className="accent-line mx-auto" />
        </div>

        <div className="space-y-3">
          {FAQ.map(({ q, a }, i) => (
            <div
              key={i}
              className={`glass rounded-2xl border transition-all duration-300 overflow-hidden
                ${openFaq === i ? "border-primary-500/30" : "border-white/5 hover:border-white/10"}`}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className={`text-sm font-semibold transition-colors ${openFaq === i ? "text-primary-400" : "text-white"}`}>
                  {q}
                </span>
                <ChevronDown
                  size={16}
                  className={`flex-shrink-0 text-dark-400 transition-transform duration-300 ${openFaq === i ? "rotate-180 text-primary-400" : ""}`}
                />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5 text-sm text-dark-300 leading-relaxed border-t border-white/5 pt-4">
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      
      <section className="glass rounded-3xl p-10 text-center border border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 0%, #F3C15F, transparent 60%)" }} />
        <div className="relative z-10">
          <h2 className="section-title mb-6">
            <span>Остались</span> вопросы?
          </h2>
          <p className="text-dark-400 mb-7 max-w-sm mx-auto text-sm">
            Наши специалисты всегда готовы помочь с выбором товара и оформлением заказа.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contacts" className="btn-primary">
              Связаться с нами <ChevronRight size={16} />
            </Link>
            <Link to="/catalog" className="btn-secondary">
              Открыть каталог
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowToBuyPage;
