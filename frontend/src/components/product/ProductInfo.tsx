import React from "react";
import { Truck, Clock, CreditCard, Tag, Package } from "lucide-react";

interface ProductInfoProps {
  brand: string;
  inStock: boolean;
  color?: string;
  serviceType?: "maintenance" | "repair";
}

const ProductInfo: React.FC<ProductInfoProps> = ({ brand, inStock, color, serviceType }) => {
  return (
    <div className="flex-1 space-y-5">
      {/* Quick specs */}
      <div className="glass rounded-2xl p-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-dark-400 mb-3">Краткие характеристики</h3>
        <ul className="space-y-2.5 text-sm">
          <li className="flex items-center gap-3">
            <Tag size={14} className="text-primary-400 flex-shrink-0" />
            <span className="text-dark-400">Бренд:</span>
            <span className="text-white font-semibold ml-auto">{brand}</span>
          </li>
          <li className="flex items-center gap-3">
            <Package size={14} className="text-primary-400 flex-shrink-0" />
            <span className="text-dark-400">Наличие:</span>
            <span className={`ml-auto font-semibold ${inStock ? "text-emerald-400" : "text-dark-400"}`}>
              {inStock ? "В наличии" : "Под заказ"}
            </span>
          </li>
          {color && (
            <li className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full flex-shrink-0 border border-white/20 bg-dark-600" />
              <span className="text-dark-400">Цвет:</span>
              <span className="text-white ml-auto">{color}</span>
            </li>
          )}
          {serviceType && (
            <li className="flex items-center gap-3">
              <span className={`px-2 py-0.5 text-xs rounded-full ml-auto font-medium
                ${serviceType === "maintenance"
                  ? "bg-primary-500/20 text-primary-400"
                  : "bg-blue-500/20 text-blue-400"
                }`}>
                {serviceType === "maintenance" ? "Для ТО" : "Для ремонта"}
              </span>
            </li>
          )}
        </ul>
      </div>

      {/* Delivery */}
      <div className="glass rounded-2xl p-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-dark-400 mb-3">Доставка</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-3 text-dark-300">
            <Truck size={14} className="text-dark-400 flex-shrink-0" />
            Доставка по городу: от 300 ₽
          </li>
          <li className="flex items-center gap-3 text-dark-300">
            <Clock size={14} className="text-dark-400 flex-shrink-0" />
            Срок доставки: 1–2 рабочих дня
          </li>
        </ul>
      </div>

      {/* Payment */}
      <div className="glass rounded-2xl p-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-dark-400 mb-3">Оплата</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-3 text-dark-300">
            <CreditCard size={14} className="text-dark-400 flex-shrink-0" />
            Картой при получении
          </li>
          <li className="flex items-center gap-3 text-dark-300">
            <CreditCard size={14} className="text-dark-400 flex-shrink-0" />
            Онлайн на сайте
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductInfo;
