import React from "react";
import { Link } from "react-router-dom";
import { Trash2, Minus, Plus } from "lucide-react";
import { CartItem } from "../../store/cartStore";

interface CartItemListProps {
  items: CartItem[];
  handleQuantityChange: (id: number | string, q: number) => void;
  removeItem: (id: number | string) => void;
  clearCart: () => void;
}

const CartItemList: React.FC<CartItemListProps> = ({
  items,
  handleQuantityChange,
  removeItem,
  clearCart,
}) => {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--color-border2)",
        borderRadius: "1.25rem",
        overflow: "hidden",
        marginBottom: "1.5rem",
      }}
    >
      
      <div
        style={{
          padding: "1rem 1.25rem",
          borderBottom: "1px solid var(--color-border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "var(--color-text)",
            margin: 0,
          }}
        >
          Товары в корзине{" "}
          <span
            style={{
              color: "var(--color-muted)",
              fontWeight: 400,
            }}
          >
            ({items.length})
          </span>
        </h2>

        <button
          onClick={clearCart}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.8rem",
            color: "var(--color-muted)",
            background: "none",
            border: "none",
            cursor: "pointer",
            transition: "color 0.2s",
            padding: "0.25rem 0.5rem",
            borderRadius: "0.5rem",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color = "#ef4444")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color =
              "var(--color-muted)")
          }
        >
          <Trash2 size={14} />
          Очистить
        </button>
      </div>

      
      <div>
        {items.map((item, idx) => (
          <div
            key={item.id}
            style={{
              padding: "1rem 1.25rem",
              borderBottom:
                idx < items.length - 1
                  ? "1px solid var(--color-border)"
                  : "none",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLDivElement).style.background =
                "var(--bg-card-hover)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLDivElement).style.background =
                "transparent")
            }
          >
            
            <div
              style={{
                width: "72px",
                height: "72px",
                flexShrink: 0,
                borderRadius: "0.75rem",
                overflow: "hidden",
                background: "var(--bg-card-deep)",
                border: "1px solid var(--color-border)",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>

            
            <div style={{ flex: 1, minWidth: 0 }}>
              <Link
                to={`/product/${item.id}`}
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "var(--color-text)",
                  textDecoration: "none",
                  display: "block",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "#F3C15F")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--color-text)")
                }
              >
                {item.title}
              </Link>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-muted)",
                  marginTop: "0.2rem",
                }}
              >
                Арт: {item.article}
              </div>
            </div>

            
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 0,
                border: "1px solid var(--color-border2)",
                borderRadius: "0.6rem",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <button
                onClick={() =>
                  handleQuantityChange(item.id, item.quantity - 1)
                }
                style={{
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--bg-card-deep)",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--color-muted)",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "var(--bg-card-hover)";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "var(--color-text)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "var(--bg-card-deep)";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "var(--color-muted)";
                }}
              >
                <Minus size={13} />
              </button>

              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(
                    item.id,
                    parseInt(e.target.value) || 1
                  )
                }
                style={{
                  width: "40px",
                  height: "32px",
                  border: "none",
                  borderLeft: "1px solid var(--color-border)",
                  borderRight: "1px solid var(--color-border)",
                  background: "var(--bg-card)",
                  color: "var(--color-text)",
                  textAlign: "center",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  outline: "none",
                }}
              />

              <button
                onClick={() =>
                  handleQuantityChange(item.id, item.quantity + 1)
                }
                style={{
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--bg-card-deep)",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--color-muted)",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "var(--bg-card-hover)";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "var(--color-text)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "var(--bg-card-deep)";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "var(--color-muted)";
                }}
              >
                <Plus size={13} />
              </button>
            </div>

            
            <div
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--color-text)",
                minWidth: "90px",
                textAlign: "right",
                flexShrink: 0,
              }}
            >
              {(item.price * item.quantity).toLocaleString()} ₽
            </div>

            
            <button
              onClick={() => removeItem(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
                borderRadius: "0.5rem",
                border: "none",
                background: "none",
                color: "var(--color-muted)",
                cursor: "pointer",
                flexShrink: 0,
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(239,68,68,0.1)";
                (e.currentTarget as HTMLButtonElement).style.color = "#ef4444";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "none";
                (e.currentTarget as HTMLButtonElement).style.color =
                  "var(--color-muted)";
              }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItemList;
