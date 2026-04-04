import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { type LucideIcon } from "lucide-react";
import {
  Truck, MapPin, Package, Zap, Clock, CreditCard,
  Banknote, Smartphone, ShieldCheck, CheckCircle2,
  ChevronRight, Calculator, Info,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */

type Zone = "moscow" | "near" | "russia" | "far";

const REGIONS: { label: string; zone: Zone }[] = [
  // Moscow & MO
  { label: "Москва", zone: "moscow" },
  { label: "Московская область", zone: "moscow" },
  // Near regions
  { label: "Санкт-Петербург", zone: "near" },
  { label: "Ленинградская область", zone: "near" },
  { label: "Нижний Новгород", zone: "near" },
  { label: "Казань", zone: "near" },
  { label: "Самара", zone: "near" },
  { label: "Воронеж", zone: "near" },
  { label: "Ярославль", zone: "near" },
  { label: "Тверь", zone: "near" },
  { label: "Рязань", zone: "near" },
  { label: "Тула", zone: "near" },
  // Russia
  { label: "Екатеринбург", zone: "russia" },
  { label: "Краснодар", zone: "russia" },
  { label: "Ростов-на-Дону", zone: "russia" },
  { label: "Уфа", zone: "russia" },
  { label: "Пермь", zone: "russia" },
  { label: "Челябинск", zone: "russia" },
  { label: "Новосибирск", zone: "russia" },
  { label: "Омск", zone: "russia" },
  { label: "Волгоград", zone: "russia" },
  // Far
  { label: "Красноярск", zone: "far" },
  { label: "Иркутск", zone: "far" },
  { label: "Хабаровск", zone: "far" },
  { label: "Владивосток", zone: "far" },
  { label: "Якутск", zone: "far" },
];

type MethodKey = "courier" | "cdek" | "pickup" | "postamat";

interface DeliveryMethod {
  key: MethodKey;
  icon: LucideIcon;
  title: string;
  short: string;
  zones: Partial<Record<Zone, { price: number; days: string } | null>>;
}

const METHODS: DeliveryMethod[] = [
  {
    key: "courier",
    icon: Truck,
    title: "Курьер",
    short: "До двери",
    zones: {
      moscow: { price: 350, days: "1–2 дня" },
      near: { price: 600, days: "2–4 дня" },
      russia: null,
      far: null,
    },
  },
  {
    key: "cdek",
    icon: Package,
    title: "СДЭК",
    short: "ПВЗ или курьер",
    zones: {
      moscow: { price: 250, days: "1–2 дня" },
      near: { price: 350, days: "2–4 дня" },
      russia: { price: 500, days: "3–6 дней" },
      far: { price: 700, days: "5–10 дней" },
    },
  },
  {
    key: "pickup",
    icon: MapPin,
    title: "Самовывоз",
    short: "Склад в Москве",
    zones: {
      moscow: { price: 0, days: "1–2 часа" },
      near: null,
      russia: null,
      far: null,
    },
  },
  {
    key: "postamat",
    icon: Zap,
    title: "Постамат",
    short: "Яндекс / Boxberry",
    zones: {
      moscow: { price: 200, days: "1–2 дня" },
      near: { price: 300, days: "2–5 дней" },
      russia: { price: 400, days: "4–8 дней" },
      far: null,
    },
  },
];

const FREE_THRESHOLDS: Record<Zone, number | null> = {
  moscow: 5000,
  near: 15000,
  russia: 15000,
  far: null,
};

const PAYMENT: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: CreditCard, title: "Банковская карта", text: "Visa, Mastercard, МИР — онлайн" },
  { icon: Smartphone, title: "СБП / QR-код", text: "Без комиссии через Систему быстрых платежей" },
  { icon: Banknote, title: "Наличными", text: "Курьеру или при самовывозе" },
  { icon: ShieldCheck, title: "Для юр. лиц", text: "Счёт-фактура, НДС, безналичный расчёт" },
];

/* ══════════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════════ */
const DeliveryPage: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<MethodKey | "">("");
  const [orderAmount, setOrderAmount] = useState<string>("");

  const zone = useMemo<Zone | null>(() => {
    const r = REGIONS.find((r) => r.label === selectedRegion);
    return r ? r.zone : null;
  }, [selectedRegion]);

  const availableMethods = useMemo(() => {
    if (!zone) return METHODS;
    return METHODS.filter((m) => m.zones[zone] !== null);
  }, [zone]);

  const result = useMemo(() => {
    if (!zone || !selectedMethod) return null;
    const method = METHODS.find((m) => m.key === selectedMethod);
    if (!method) return null;
    const slot = method.zones[zone];
    if (!slot) return null;

    const amount = parseFloat(orderAmount) || 0;
    const threshold = FREE_THRESHOLDS[zone];
    const isFree = threshold !== null && amount >= threshold && slot.price > 0;

    return {
      price: isFree ? 0 : slot.price,
      originalPrice: slot.price,
      days: slot.days,
      isFree,
      threshold,
    };
  }, [zone, selectedMethod, orderAmount]);

  const isCalculated = result !== null;

  return (
    <div className="max-w-[1100px] mx-auto px-4 py-10">

      {/* ── Hero ──────────────────────────────────────────────── */}
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
            <Truck size={14} /> Доставка по России
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
            Доставим куда угодно<br />
            <span style={{ color: "#F3C15F" }}>быстро и надёжно</span>
          </h1>
          <p className="text-dark-300 text-base max-w-xl mx-auto mb-7">
            Рассчитайте стоимость и срок доставки прямо сейчас — просто выберите ваш город и удобный способ.
          </p>
          <div className="flex flex-wrap justify-center gap-5 text-sm">
            {[
              { icon: CheckCircle2, label: "Бесплатно от 5 000 ₽", color: "text-primary-400" },
              { icon: Clock, label: "Отправка в день заказа", color: "text-emerald-400" },
              { icon: Package, label: "Отслеживание online", color: "text-blue-400" },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className={`flex items-center gap-2 font-semibold ${color}`}>
                <Icon size={14} /> {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALCULATOR ─────────────────────────────────────────── */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="section-title">
            <span>Калькулятор</span> доставки
          </h2>
          <div className="accent-line mx-auto mt-2" />
          <p className="text-dark-400 text-sm mt-4">Выберите город и способ — цена и срок рассчитаются автоматически</p>
        </div>

        <div className="glass rounded-3xl p-6 md:p-8 border border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

            {/* Region */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-dark-400 mb-2">
                📍 Ваш город
              </label>
              <div className="relative">
                <select
                  value={selectedRegion}
                  onChange={(e) => { setSelectedRegion(e.target.value); setSelectedMethod(""); }}
                  className="w-full appearance-none bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-primary-500 outline-none transition-colors cursor-pointer"
                >
                  <option value="">Выберите город...</option>
                  {REGIONS.map((r) => (
                    <option key={r.label} value={r.label}>{r.label}</option>
                  ))}
                </select>
                <ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 rotate-90 pointer-events-none" />
              </div>
            </div>

            {/* Method */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-dark-400 mb-2">
                🚚 Способ доставки
              </label>
              <div className="relative">
                <select
                  value={selectedMethod}
                  onChange={(e) => setSelectedMethod(e.target.value as MethodKey)}
                  disabled={!selectedRegion}
                  className="w-full appearance-none bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-primary-500 outline-none transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <option value="">Выберите способ...</option>
                  {availableMethods.map((m) => (
                    <option key={m.key} value={m.key}>{m.title} — {m.short}</option>
                  ))}
                </select>
                <ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 rotate-90 pointer-events-none" />
              </div>
              {selectedRegion && !zone && (
                <p className="text-xs text-red-400 mt-1">Регион не найден</p>
              )}
            </div>

            {/* Order amount */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-dark-400 mb-2">
                💳 Сумма заказа (₽)
              </label>
              <input
                type="number"
                placeholder="Например: 8500"
                value={orderAmount}
                onChange={(e) => setOrderAmount(e.target.value)}
                min={0}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-primary-500 outline-none transition-colors placeholder-dark-500"
              />
              <p className="text-xs text-dark-500 mt-1 flex items-center gap-1">
                <Info size={10} /> Влияет только на бесплатную доставку
              </p>
            </div>
          </div>

          {/* Result */}
          {isCalculated && result ? (
            <div className="rounded-2xl overflow-hidden border border-primary-500/30 bg-primary-500/5">
              <div className="flex flex-col md:flex-row items-center md:items-stretch">

                {/* Cost block */}
                <div className="flex-1 p-6 text-center md:text-left border-b md:border-b-0 md:border-r border-primary-500/20">
                  <div className="text-xs font-bold uppercase tracking-wider text-dark-400 mb-2">Стоимость доставки</div>
                  {result.isFree ? (
                    <div>
                      <div className="text-4xl font-black text-emerald-400">Бесплатно</div>
                      <div className="text-sm text-dark-400 mt-1 line-through">{result.originalPrice} ₽</div>
                    </div>
                  ) : (
                    <div className="text-4xl font-black text-white">
                      {result.price === 0 ? "Бесплатно" : `${result.price} ₽`}
                    </div>
                  )}
                  {!result.isFree && result.threshold && result.price > 0 && (
                    <div className="mt-2 text-xs text-primary-400 flex items-center gap-1">
                      <Info size={10} />
                      Закажите на {result.threshold.toLocaleString()} ₽ — доставка бесплатна
                    </div>
                  )}
                </div>

                {/* Time block */}
                <div className="flex-1 p-6 text-center border-b md:border-b-0 md:border-r border-primary-500/20">
                  <div className="text-xs font-bold uppercase tracking-wider text-dark-400 mb-2">Срок доставки</div>
                  <div className="text-4xl font-black text-white">{result.days}</div>
                  <div className="text-xs text-dark-400 mt-1">с момента отправки</div>
                </div>

                {/* CTA block */}
                <div className="p-6 flex flex-col items-center justify-center gap-3">
                  <div className="text-xs text-dark-400 text-center max-w-[140px]">Готовы оформить заказ?</div>
                  <Link to="/catalog" className="btn-primary text-sm py-2.5 px-5 whitespace-nowrap">
                    В каталог <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* Placeholder */
            <div className="rounded-2xl border border-dashed border-white/10 py-10 text-center text-dark-500">
              <Calculator size={32} className="mx-auto mb-3 opacity-30" />
              <div className="text-sm">Выберите город и способ доставки,<br />чтобы увидеть стоимость и срок</div>
            </div>
          )}
        </div>
      </section>

      {/* ── Method cards ───────────────────────────────────────── */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="section-title">
            <span>Способы</span> доставки
          </h2>
          <div className="accent-line mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {METHODS.map(({ key, icon: Icon, title, short, zones }) => (
            <div
              key={key}
              className={`glass rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 group
                ${selectedMethod === key ? "border-primary-500/40 bg-primary-500/5" : "border-white/5 hover:border-primary-500/20"}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors
                  ${selectedMethod === key ? "bg-primary-500/20" : "bg-dark-800 group-hover:bg-primary-500/10"}`}>
                  <Icon size={20} className="text-primary-400" />
                </div>
                <div>
                  <div className="text-white font-bold">{title}</div>
                  <div className="text-dark-400 text-xs">{short}</div>
                </div>
              </div>

              {/* Zone table */}
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left py-1.5 text-dark-500 font-medium">Регион</th>
                    <th className="text-center py-1.5 text-dark-500 font-medium">Срок</th>
                    <th className="text-right py-1.5 text-dark-500 font-medium">Цена</th>
                  </tr>
                </thead>
                <tbody>
                  {(["moscow", "near", "russia", "far"] as Zone[]).map((z) => {
                    const slot = zones[z];
                    const labels: Record<Zone, string> = {
                      moscow: "Москва / МО",
                      near: "Ближние регионы",
                      russia: "Вся Россия",
                      far: "Дальний Восток",
                    };
                    return (
                      <tr key={z} className="border-b border-white/5 last:border-0">
                        <td className="py-2 text-dark-300">{labels[z]}</td>
                        <td className="py-2 text-center text-dark-300">{slot ? slot.days : <span className="text-dark-600">—</span>}</td>
                        <td className="py-2 text-right font-semibold">
                          {slot
                            ? slot.price === 0
                              ? <span className="text-emerald-400">Бесплатно</span>
                              : <span className="text-white">{slot.price} ₽</span>
                            : <span className="text-dark-600">—</span>
                          }
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* Free delivery banner */}
        <div className="mt-5 glass rounded-2xl p-5 border border-primary-500/20 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0">
            <Truck size={22} className="text-primary-400" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="text-white font-bold mb-0.5">Бесплатная доставка</div>
            <div className="text-dark-400 text-sm">
              По Москве — от <span className="text-primary-400 font-bold">5 000 ₽</span> &nbsp;·&nbsp;
              По России — от <span className="text-primary-400 font-bold">15 000 ₽</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Payment ─────────────────────────────────────────────── */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="section-title">
            Способы <span>оплаты</span>
          </h2>
          <div className="accent-line mx-auto" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PAYMENT.map(({ icon: Icon, title, text }, i) => (
            <div key={i} className="glass rounded-2xl p-5 text-center border border-white/5 hover:border-primary-500/20 transition-all hover:-translate-y-1 group">
              <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-dark-800 flex items-center justify-center group-hover:bg-primary-500/10 transition-colors">
                <Icon size={20} className="text-primary-400" />
              </div>
              <div className="text-white font-bold text-sm mb-1">{title}</div>
              <div className="text-dark-400 text-xs leading-relaxed">{text}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-dark-400">
          <ShieldCheck size={14} className="text-emerald-400" />
          Платежи защищены SSL. Данные карты не хранятся на наших серверах.
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="glass rounded-3xl p-10 text-center border border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 0%, #F3C15F, transparent 60%)" }} />
        <div className="relative z-10">
          <h2 className="section-title mb-6">
            <span>Остались</span> вопросы?
          </h2>
          <p className="text-dark-400 text-sm mb-7 max-w-sm mx-auto">
            Свяжитесь с нами — подберём оптимальный вариант доставки для вашего заказа.
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

export default DeliveryPage;
