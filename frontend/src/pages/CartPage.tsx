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
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--color-border2)",
            borderRadius: "1.5rem",
            padding: "3rem 2rem",
            textAlign: "center",
            maxWidth: "420px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "var(--bg-card-deep)",
              border: "1px solid var(--color-border2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
            }}
          >
            <ShoppingBag size={36} style={{ color: "var(--color-muted)" }} />
          </div>
          <h1
            style={{
              fontSize: "1.4rem",
              fontWeight: 700,
              color: "var(--color-text)",
              marginBottom: "0.5rem",
            }}
          >
            Ваша корзина пуста
          </h1>
          <p
            style={{
              color: "var(--color-muted)",
              fontSize: "0.9rem",
              marginBottom: "2rem",
            }}
          >
            Перейдите в каталог, чтобы найти нужные товары для вашего
            автомобиля.
          </p>
          <Link
            to="/catalog"
            style={{
              display: "inline-block",
              width: "100%",
              padding: "0.875rem",
              background: "linear-gradient(135deg, #F3C15F, #D9AB52)",
              color: "#141824",
              fontWeight: 700,
              fontSize: "0.95rem",
              borderRadius: "0.75rem",
              textDecoration: "none",
              textAlign: "center",
              boxShadow: "0 4px 15px rgba(243,193,95,0.25)",
              transition: "all 0.2s ease",
            }}
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
          style={{ color: "var(--color-muted)", textDecoration: "none" }}
          className="flex items-center mb-6 hover:text-primary-500 transition-colors"
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
