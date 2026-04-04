import React from "react";

interface CartSummaryProps {
  itemCount: number;
  subtotal: number;
  deliveryCost: number;
  total: number;
  deliveryMethod: string;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  itemCount,
  subtotal,
  deliveryCost,
  total,
  deliveryMethod,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 sticky top-4">
      <h2 className="font-medium text-secondary-800 mb-4">Ваш заказ</h2>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Товары ({itemCount})</span>
          <span className="text-secondary-800">
            {subtotal.toLocaleString()} ₽
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Доставка</span>
          <span className="text-secondary-800">
            {deliveryCost > 0 ? `${deliveryCost} ₽` : "Бесплатно"}
          </span>
        </div>

        <div className="pt-3 border-t border-gray-200 flex justify-between font-bold">
          <span>Итого</span>
          <span className="text-lg">{total.toLocaleString()} ₽</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Ваше имя *
          </label>
          <input
            id="name"
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder="Иван Иванов"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Телефон *
          </label>
          <input
            id="phone"
            type="tel"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder="+7 (___) ___-__-__"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder="example@mail.ru"
          />
        </div>

        {deliveryMethod === "courier" && (
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Адрес доставки *
            </label>
            <textarea
              id="address"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
              rows={3}
              placeholder="Город, улица, дом, квартира"
              required
            />
          </div>
        )}

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            Комментарий к заказу
          </label>
          <textarea
            id="comment"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
            rows={2}
            placeholder="Необязательно"
          />
        </div>

        <button className="w-full py-3 bg-primary-700 text-white font-medium rounded-md hover:bg-primary-800">
          Оформить заказ
        </button>

        <p className="text-xs text-gray-500 text-center">
          Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных
        </p>
      </div>
    </div>
  );
};

export default CartSummary;
