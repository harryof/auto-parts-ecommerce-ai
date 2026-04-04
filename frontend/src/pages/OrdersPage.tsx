import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { getCurrentUser } from "../data/users";

// Временные данные для демонстрации
const mockOrders = [
  {
    id: "1",
    date: "2024-03-15",
    status: "completed",
    total: 12500,
    items: [
      {
        id: "1",
        name: "Поршневой комплект BMW M54",
        quantity: 1,
        price: 12500,
      },
    ],
  },
  {
    id: "2",
    date: "2024-03-10",
    status: "processing",
    total: 8500,
    items: [
      { id: "2", name: "Комплект сцепления Audi A4", quantity: 1, price: 8500 },
    ],
  },
  {
    id: "3",
    date: "2024-03-05",
    status: "cancelled",
    total: 3200,
    items: [
      { id: "3", name: "Комплект тормозных колодок", quantity: 1, price: 3200 },
    ],
  },
];

const getStatusInfo = (status: string) => {
  switch (status) {
    case "completed":
      return {
        icon: <CheckCircle size={20} className="text-green-500" />,
        text: "Выполнен",
        color: "text-green-500",
      };
    case "processing":
      return {
        icon: <Clock size={20} className="text-yellow-500" />,
        text: "В обработке",
        color: "text-yellow-500",
      };
    case "cancelled":
      return {
        icon: <XCircle size={20} className="text-red-500" />,
        text: "Отменен",
        color: "text-red-500",
      };
    default:
      return {
        icon: <Clock size={20} className="text-gray-500" />,
        text: "Неизвестно",
        color: "text-gray-500",
      };
  }
};

const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  if (!currentUser) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="section-title mb-4 text-center md:text-left">
          Мои <span>заказы</span>
        </h1>
        <div className="accent-line mx-auto md:mx-0 mb-10" />

        {mockOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              У вас пока нет заказов
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Начните делать покупки, чтобы увидеть здесь свои заказы
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate("/catalog")}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Перейти в каталог
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {mockOrders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              return (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Package size={24} className="text-gray-400 mr-3" />
                        <div>
                          <h3 className="text-lg font-medium">
                            Заказ #{order.id}
                          </h3>
                          <p className="text-sm text-gray-500">
                            от{" "}
                            {new Date(order.date).toLocaleDateString("ru-RU")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {statusInfo.icon}
                        <span className={`ml-2 ${statusInfo.color}`}>
                          {statusInfo.text}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between py-2"
                        >
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">
                              {item.quantity} шт. ×{" "}
                              {item.price.toLocaleString("ru-RU")} ₽
                            </p>
                          </div>
                          <p className="font-medium">
                            {(item.price * item.quantity).toLocaleString(
                              "ru-RU"
                            )}{" "}
                            ₽
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Итого:</span>
                        <span className="text-lg font-bold">
                          {order.total.toLocaleString("ru-RU")} ₽
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => navigate(`/orders/${order.id}`)}
                        className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
                      >
                        Подробнее
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
