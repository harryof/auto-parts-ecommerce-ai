import React from "react";
import { Truck, Store, CreditCard, Globe, Wallet } from "lucide-react";

interface CartSettingsProps {
  deliveryMethod: string;
  setDeliveryMethod: (m: string) => void;
  paymentMethod: string;
  setPaymentMethod: (m: string) => void;
}

const RadioOption: React.FC<{
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}> = ({ name, value, checked, onChange, icon, title, subtitle }) => (
  <label
    style={{
      display: "flex",
      alignItems: "center",
      gap: "0.875rem",
      padding: "0.875rem 1rem",
      borderRadius: "0.75rem",
      border: checked
        ? "1.5px solid #F3C15F"
        : "1.5px solid var(--color-border2)",
      background: checked ? "rgba(243,193,95,0.06)" : "var(--bg-card-deep)",
      cursor: "pointer",
      transition: "all 0.2s ease",
    }}
  >
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      style={{ display: "none" }}
    />

    
    <div
      style={{
        width: "18px",
        height: "18px",
        borderRadius: "50%",
        border: checked ? "5px solid #F3C15F" : "2px solid var(--color-muted)",
        flexShrink: 0,
        transition: "all 0.2s ease",
        background: "transparent",
      }}
    />

    
    <div
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "0.6rem",
        background: checked ? "rgba(243,193,95,0.12)" : "var(--bg-card)",
        border: "1px solid var(--color-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: checked ? "#F3C15F" : "var(--color-muted)",
        flexShrink: 0,
        transition: "all 0.2s ease",
      }}
    >
      {icon}
    </div>

    
    <div>
      <div
        style={{
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "var(--color-text)",
          lineHeight: 1.3,
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: "0.75rem",
            color: "var(--color-muted)",
            marginTop: "0.1rem",
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  </label>
);

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    style={{
      fontSize: "0.75rem",
      fontWeight: 700,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "var(--color-muted)",
      marginBottom: "0.75rem",
    }}
  >
    {children}
  </div>
);

const CartSettings: React.FC<CartSettingsProps> = ({
  deliveryMethod,
  setDeliveryMethod,
  paymentMethod,
  setPaymentMethod,
}) => {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--color-border2)",
        borderRadius: "1.25rem",
        padding: "1.25rem",
        marginBottom: "1.5rem",
      }}
    >
      
      <SectionLabel>Способ доставки</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
        <RadioOption
          name="delivery"
          value="courier"
          checked={deliveryMethod === "courier"}
          onChange={() => setDeliveryMethod("courier")}
          icon={<Truck size={16} />}
          title="Доставка курьером"
          subtitle="300 ₽ · 1–2 рабочих дня"
        />
        <RadioOption
          name="delivery"
          value="pickup"
          checked={deliveryMethod === "pickup"}
          onChange={() => setDeliveryMethod("pickup")}
          icon={<Store size={16} />}
          title="Самовывоз из магазина"
          subtitle="Бесплатно · сегодня с 10:00"
        />
      </div>

      
      <div
        style={{
          height: "1px",
          background: "var(--color-border)",
          marginBottom: "1.25rem",
        }}
      />

      
      <SectionLabel>Способ оплаты</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <RadioOption
          name="payment"
          value="card"
          checked={paymentMethod === "card"}
          onChange={() => setPaymentMethod("card")}
          icon={<CreditCard size={16} />}
          title="Картой при получении"
        />
        <RadioOption
          name="payment"
          value="online"
          checked={paymentMethod === "online"}
          onChange={() => setPaymentMethod("online")}
          icon={<Globe size={16} />}
          title="Онлайн оплата на сайте"
        />
        <RadioOption
          name="payment"
          value="cash"
          checked={paymentMethod === "cash"}
          onChange={() => setPaymentMethod("cash")}
          icon={<Wallet size={16} />}
          title="Наличными при получении"
        />
      </div>
    </div>
  );
};

export default CartSettings;
