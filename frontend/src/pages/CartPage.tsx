import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import CartItemList from "../components/cart/CartItemList";
import CartSettings from "../components/cart/CartSettings";
import CartSummary from "../components/cart/CartSummary";

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const [deliveryMethod, setDeliveryMethod] = useState("courier");
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Calculate totals
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryCost = deliveryMethod === "courier" ? 300 : 0;
  const total = subtotal + deliveryCost;
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  const handleQuantityChange = (id: string | number, value: number) => {
    if (value >= 1) {
      updateQuantity(id, value);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-secondary-800 mb-2">
            Ваша корзина пуста
          </h1>
          <p className="text-gray-600 mb-8">
            Перейдите в каталог, чтобы найти нужные товары для вашего
            автомобиля.
          </p>
          <Link
            to="/catalog"
            className="inline-block w-full py-3 bg-primary-700 text-white font-medium rounded-md hover:bg-primary-800 transition-colors"
          >
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col items-center mb-12">
        <Link
          to="/catalog"
          className="text-gray-500 hover:text-primary-700 flex items-center mb-6"
        >
          <ArrowLeft size={20} className="mr-1" />
          Вернуться к покупкам
        </Link>
        <div className="text-center">
          <h1 className="section-title mb-4">
            Оформление <span>заказа</span>
          </h1>
          <div className="accent-line mx-auto" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <CartItemList
            items={items}
            handleQuantityChange={handleQuantityChange}
            removeItem={removeItem}
            clearCart={clearCart}
          />
          <CartSettings
            deliveryMethod={deliveryMethod}
            setDeliveryMethod={setDeliveryMethod}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </div>

        <div className="lg:w-1/3">
          <CartSummary
            itemCount={itemCount}
            subtotal={subtotal}
            deliveryCost={deliveryCost}
            total={total}
            deliveryMethod={deliveryMethod}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
