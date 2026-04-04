import React from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
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
    <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="font-medium text-secondary-800">
          Товары в корзине ({items.length})
        </h2>

        <button
          onClick={clearCart}
          className="text-sm text-gray-600 hover:text-primary-700 flex items-center"
        >
          <Trash2 size={16} className="mr-1" />
          Очистить корзину
        </button>
      </div>

      <div>
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 border-b border-gray-200 last:border-b-0 flex"
          >
            <div className="w-20 h-20 flex-shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="ml-4 flex-1">
              <Link
                to={`/product/${item.id}`}
                className="text-secondary-800 font-medium hover:text-primary-700"
              >
                {item.title}
              </Link>

              <div className="text-sm text-gray-600 mt-1">Арт: {item.article}</div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                  >
                    -
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
                    className="w-12 h-8 border-t border-b border-gray-300 text-center"
                  />

                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center">
                  <div className="text-lg font-bold text-secondary-800 mr-4">
                    {(item.price * item.quantity).toLocaleString()} ₽
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-500 hover:text-primary-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItemList;
