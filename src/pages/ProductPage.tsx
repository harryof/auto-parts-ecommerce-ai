import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Truck,
  ShieldCheck,
  Clock,
  CreditCard,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useFavoritesStore } from "../store/favoritesStore";
import { products } from "../data/products";

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const { addItem } = useCartStore();
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useFavoritesStore();

  // Convert productId to number for comparison
  const product = products.find((p) => String(p.id) === productId);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Товар не найден
          </h1>
          <p className="text-gray-600 mb-4">
            К сожалению, запрашиваемый товар не существует.
          </p>
          <Link
            to="/catalog"
            className="inline-block bg-primary-700 text-white py-2 px-4 rounded-md hover:bg-primary-800"
          >
            Вернуться в каталог
          </Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleToggleFavorite = () => {
    if (isFavorite(String(product.id))) {
      removeFromFavorites(String(product.id));
    } else {
      addToFavorites(product);
    }
  };

  return (
    <div>
      {/* Breadcrumbs */}
      <nav className="mb-4">
        <ol className="flex text-sm">
          <li>
            <Link to="/" className="text-gray-500 hover:text-primary-700">
              Главная
            </Link>
          </li>
          <li className="mx-2">
            <ChevronRight size={14} className="text-gray-400" />
          </li>
          <li>
            <Link
              to="/catalog"
              className="text-gray-500 hover:text-primary-700"
            >
              Каталог
            </Link>
          </li>
          <li className="mx-2">
            <ChevronRight size={14} className="text-gray-400" />
          </li>
          <li>
            <Link
              to={`/catalog/${product.categoryId}`}
              className="text-gray-500 hover:text-primary-700"
            >
              {product.categoryId}
            </Link>
          </li>
          {product.subCategoryId && (
            <>
              <li className="mx-2">
                <ChevronRight size={14} className="text-gray-400" />
              </li>
              <li>
                <Link
                  to={`/catalog/${product.categoryId}/${product.subCategoryId}`}
                  className="text-gray-500 hover:text-primary-700"
                >
                  {product.subCategoryId}
                </Link>
              </li>
            </>
          )}
          <li className="mx-2">
            <ChevronRight size={14} className="text-gray-400" />
          </li>
          <li className="text-gray-700 truncate">{product.name}</li>
        </ol>
      </nav>

      <div className="bg-white rounded-lg shadow p-4 lg:p-6 mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-secondary-800 mb-2">
          {product.name}
        </h1>

        <div className="flex items-center gap-4 mb-4">
          <div className="text-sm text-gray-600">Арт: {product.id}</div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Product images */}
          <div className="lg:w-2/5">
            <div className="mb-2 border rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 md:h-80 object-contain"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="lg:w-3/5">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                {/* Brief specifications */}
                <div className="mb-4">
                  <h3 className="font-medium text-secondary-800 mb-2">
                    Характеристики:
                  </h3>
                  <ul className="text-sm space-y-1">
                    <li className="flex">
                      <span className="text-gray-600 mr-2">Бренд:</span>
                      <span className="text-secondary-800">
                        {product.brand}
                      </span>
                    </li>
                    <li className="flex">
                      <span className="text-gray-600 mr-2">Наличие:</span>
                      <span className="text-secondary-800">
                        {product.inStock ? "В наличии" : "Под заказ"}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Delivery info */}
                <div className="mb-4">
                  <h3 className="font-medium text-secondary-800 mb-2">
                    Доставка:
                  </h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center">
                      <Truck size={16} className="mr-2 text-gray-600" />
                      <span>Доставка по городу: от 300 ₽</span>
                    </li>
                    <li className="flex items-center">
                      <Clock size={16} className="mr-2 text-gray-600" />
                      <span>Срок доставки: 1-2 дня</span>
                    </li>
                  </ul>
                </div>

                {/* Payment methods */}
                <div>
                  <h3 className="font-medium text-secondary-800 mb-2">
                    Способы оплаты:
                  </h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center">
                      <CreditCard size={16} className="mr-2 text-gray-600" />
                      <span>Оплата картой при получении</span>
                    </li>
                    <li className="flex items-center">
                      <CreditCard size={16} className="mr-2 text-gray-600" />
                      <span>Оплата онлайн на сайте</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Buy section */}
              <div className="md:w-72 border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-secondary-800">
                      {product.price.toLocaleString()} ₽
                    </div>
                  </div>

                  <div
                    className={
                      product.inStock ? "text-green-600" : "text-gray-500"
                    }
                  >
                    {product.inStock ? "В наличии" : "Под заказ"}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="quantity" className="text-sm text-gray-700">
                      Количество:
                    </label>

                    <div className="flex border rounded-md">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                        className="px-2 py-1 border-r text-gray-700 disabled:text-gray-400"
                      >
                        <Minus size={16} />
                      </button>

                      <input
                        id="quantity"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) =>
                          handleQuantityChange(parseInt(e.target.value) || 1)
                        }
                        className="w-10 text-center border-none focus:outline-none focus:ring-0"
                      />

                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="px-2 py-1 border-l text-gray-700"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() =>
                      addItem(
                        {
                          id: product.id,
                          title: product.name,
                          price: product.price,
                          image: product.image,
                          article: product.id,
                          quantity: quantity,
                        },
                        quantity
                      )
                    }
                    disabled={!product.inStock}
                    className="w-full py-2 px-4 bg-primary-700 text-white rounded-md hover:bg-primary-800 disabled:bg-gray-300 disabled:text-gray-500 flex items-center justify-center"
                  >
                    <ShoppingCart size={16} className="mr-2" />В корзину
                  </button>

                  <button
                    onClick={handleToggleFavorite}
                    className={`w-full py-2 px-4 border border-gray-300 text-secondary-700 rounded-md hover:bg-gray-50 flex items-center justify-center ${
                      isFavorite(String(product.id))
                        ? "text-red-600 border-red-600"
                        : ""
                    }`}
                  >
                    <Heart
                      size={16}
                      className={`mr-2 ${
                        isFavorite(String(product.id)) ? "fill-current" : ""
                      }`}
                    />
                    {isFavorite(String(product.id))
                      ? "В избранном"
                      : "В избранное"}
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-start mb-2">
                    <ShieldCheck
                      size={16}
                      className="mr-2 text-green-600 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-sm">
                      Гарантия 14 дней на возврат товара
                    </span>
                  </div>

                  <div className="flex items-start">
                    <Truck
                      size={16}
                      className="mr-2 text-green-600 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-sm">
                      Бесплатная доставка при заказе от 5000 ₽
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === "description"
                ? "border-b-2 border-primary-700 text-primary-700"
                : "text-gray-600 hover:text-primary-700"
            }`}
          >
            Описание
          </button>

          <button
            onClick={() => setActiveTab("specifications")}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === "specifications"
                ? "border-b-2 border-primary-700 text-primary-700"
                : "text-gray-600 hover:text-primary-700"
            }`}
          >
            Характеристики
          </button>
        </div>

        <div className="p-4 lg:p-6">
          {activeTab === "description" && (
            <div className="text-gray-700">
              <p>{product.description}</p>
            </div>
          )}

          {activeTab === "specifications" && (
            <div>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="py-2 px-4 border-b border-gray-200 text-gray-600">
                      Бренд
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-secondary-800">
                      {product.brand}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-200 text-gray-600">
                      Артикул
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-secondary-800">
                      {product.id}
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-2 px-4 border-b border-gray-200 text-gray-600">
                      Наличие
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-secondary-800">
                      {product.inStock ? "В наличии" : "Под заказ"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
