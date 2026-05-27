import React from "react";
import { ShieldCheck } from "lucide-react";

interface CartSummaryProps {
  itemCount: number;
  subtotal: number;
  deliveryCost: number;
  total: number;
  deliveryMethod: string;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.6rem 0.875rem",
  background: "var(--bg-card-deep)",
  border: "1.5px solid var(--color-border2)",
  borderRadius: "0.65rem",
  color: "var(--color-text)",
  fontSize: "0.875rem",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.75rem",
  fontWeight: 600,
  color: "var(--color-muted)",
  marginBottom: "0.35rem",
  letterSpacing: "0.03em",
};

const FocusInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  const [focused, setFocused] = React.useState(false);
  return (
    <input
      {...props}
      style={{
        ...inputStyle,
        borderColor: focused ? "#F3C15F" : "var(--color-border2)",
        boxShadow: focused
          ? "0 0 0 2px rgba(243,193,95,0.15)"
          : "none",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
};

const FocusTextarea: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = (props) => {
  const [focused, setFocused] = React.useState(false);
  return (
    <textarea
      {...props}
      style={{
        ...inputStyle,
        resize: "vertical",
        borderColor: focused ? "#F3C15F" : "var(--color-border2)",
        boxShadow: focused
          ? "0 0 0 2px rgba(243,193,95,0.15)"
          : "none",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
};

const CartSummary: React.FC<CartSummaryProps> = ({
  itemCount,
  subtotal,
  deliveryCost,
  total,
  deliveryMethod,
}) => {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--color-border2)",
        borderRadius: "1.25rem",
        padding: "1.25rem",
        position: "sticky",
        top: "1rem",
      }}
    >
      
      <div
        style={{
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--color-muted)",
          marginBottom: "1rem",
        }}
      >
        Ваш заказ
      </div>

      
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{ fontSize: "0.875rem", color: "var(--color-muted)" }}
          >
            Товары ({itemCount})
          </span>
          <span
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--color-text)",
            }}
          >
            {subtotal.toLocaleString()} ₽
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{ fontSize: "0.875rem", color: "var(--color-muted)" }}
          >
            Доставка
          </span>
          <span
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              color: deliveryCost > 0 ? "var(--color-text)" : "#4ade80",
            }}
          >
            {deliveryCost > 0 ? `${deliveryCost} ₽` : "Бесплатно"}
          </span>
        </div>
      </div>

      
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.875rem 0",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          marginBottom: "1.25rem",
        }}
      >
        <span
          style={{
            fontSize: "0.9rem",
            fontWeight: 700,
            color: "var(--color-text)",
          }}
        >
          Итого
        </span>
        <span
          style={{
            fontSize: "1.2rem",
            fontWeight: 800,
            color: "#F3C15F",
          }}
        >
          {total.toLocaleString()} ₽
        </span>
      </div>

      
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <div>
          <label htmlFor="name" style={labelStyle}>
            Ваше имя *
          </label>
          <FocusInput
            id="name"
            type="text"
            placeholder="Иван Иванов"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" style={labelStyle}>
            Телефон *
          </label>
          <FocusInput
            id="phone"
            type="tel"
            placeholder="+7 (___) ___-__-__"
            required
          />
        </div>

        <div>
          <label htmlFor="email" style={labelStyle}>
            Email
          </label>
          <FocusInput
            id="email"
            type="email"
            placeholder="example@mail.ru"
          />
        </div>

        {deliveryMethod === "courier" && (
          <div>
            <label htmlFor="address" style={labelStyle}>
              Адрес доставки *
            </label>
            <FocusTextarea
              id="address"
              rows={3}
              placeholder="Город, улица, дом, квартира"
              required
            />
          </div>
        )}

        <div>
          <label htmlFor="comment" style={labelStyle}>
            Комментарий
          </label>
          <FocusTextarea
            id="comment"
            rows={2}
            placeholder="Необязательно"
          />
        </div>

        
        <button
          style={{
            width: "100%",
            padding: "0.875rem",
            background: "linear-gradient(135deg, #F3C15F, #D9AB52)",
            color: "#141824",
            fontWeight: 700,
            fontSize: "0.95rem",
            borderRadius: "0.75rem",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: "0 4px 15px rgba(243,193,95,0.25)",
            marginTop: "0.25rem",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translateY(-2px)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 6px 20px rgba(243,193,95,0.35)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translateY(0)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 4px 15px rgba(243,193,95,0.25)";
          }}
        >
          Оформить заказ
        </button>

        
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.4rem",
            color: "var(--color-muted)",
            fontSize: "0.72rem",
          }}
        >
          <ShieldCheck size={13} />
          Данные защищены и не передаются третьим лицам
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
