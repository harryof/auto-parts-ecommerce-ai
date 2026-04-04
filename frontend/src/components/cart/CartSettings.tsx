import React from "react";

interface CartSettingsProps {
  deliveryMethod: string;
  setDeliveryMethod: (m: string) => void;
  paymentMethod: string;
  setPaymentMethod: (m: string) => void;
}

const CartSettings: React.FC<CartSettingsProps> = ({
  deliveryMethod,
  setDeliveryMethod,
  paymentMethod,
  setPaymentMethod,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 lg:mb-0">
      <h2 className="font-medium text-secondary-800 mb-4">Способ доставки</h2>

      <div className="space-y-2 mb-6">
        <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="delivery"
            value="courier"
            checked={deliveryMethod === "courier"}
            onChange={() => setDeliveryMethod("courier")}
            className="mr-3"
          />
          <div>
            <div className="font-medium text-secondary-800">
              Доставка курьером
            </div>
            <div className="text-sm text-gray-600">300 ₽, 1-2 дня</div>
          </div>
        </label>

        <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="delivery"
            value="pickup"
            checked={deliveryMethod === "pickup"}
            onChange={() => setDeliveryMethod("pickup")}
            className="mr-3"
          />
          <div>
            <div className="font-medium text-secondary-800">
              Самовывоз из магазина
            </div>
            <div className="text-sm text-gray-600">
              Бесплатно, сегодня с 10:00
            </div>
          </div>
        </label>
      </div>

      <h2 className="font-medium text-secondary-800 mb-4">Способ оплаты</h2>

      <div className="space-y-2">
        <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="payment"
            value="card"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
            className="mr-3"
          />
          <div>
            <div className="font-medium text-secondary-800">
              Оплата картой при получении
            </div>
          </div>
        </label>

        <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="payment"
            value="online"
            checked={paymentMethod === "online"}
            onChange={() => setPaymentMethod("online")}
            className="mr-3"
          />
          <div>
            <div className="font-medium text-secondary-800">
              Онлайн оплата на сайте
            </div>
          </div>
        </label>

        <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="payment"
            value="cash"
            checked={paymentMethod === "cash"}
            onChange={() => setPaymentMethod("cash")}
            className="mr-3"
          />
          <div>
            <div className="font-medium text-secondary-800">
              Наличными при получении
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default CartSettings;
