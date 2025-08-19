import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ChevronLeft, Truck, CreditCard } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const [deliveryMethod, setDeliveryMethod] = useState('courier');
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCost = deliveryMethod === 'pickup' ? 0 : 300;
  const total = subtotal + deliveryCost;
  
  const handleQuantityChange = (id: number | string, quantity: number) => {
    if (quantity >= 1) {
      updateQuantity(id, quantity);
    }
  };
  
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="flex justify-center mb-4">
          <ShoppingBag size={64} className="text-gray-300" />
        </div>
        <h1 className="text-2xl font-bold text-secondary-800 mb-2">
          Ваша корзина пуста
        </h1>
        <p className="text-gray-600 mb-6">
          Добавьте товары в корзину, чтобы оформить заказ
        </p>
        <Link
          to="/catalog"
          className="inline-flex items-center text-primary-700 hover:text-primary-800 font-medium"
        >
          <ChevronLeft size={20} className="mr-1" />
          Вернуться к покупкам
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary-800 mb-6">
        Корзина
      </h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:flex-1">
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
                    
                    <div className="text-sm text-gray-600 mt-1">
                      Арт: {item.article}
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                          className="w-12 h-8 border-t border-b border-gray-300 text-center"
                        />
                        
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
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
          
          <div className="bg-white rounded-lg shadow p-4 mb-6 lg:mb-0">
            <h2 className="font-medium text-secondary-800 mb-4">
              Способ доставки
            </h2>
            
            <div className="space-y-2 mb-6">
              <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="delivery"
                  value="courier"
                  checked={deliveryMethod === 'courier'}
                  onChange={() => setDeliveryMethod('courier')}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium text-secondary-800">Доставка курьером</div>
                  <div className="text-sm text-gray-600">300 ₽, 1-2 дня</div>
                </div>
              </label>
              
              <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="delivery"
                  value="pickup"
                  checked={deliveryMethod === 'pickup'}
                  onChange={() => setDeliveryMethod('pickup')}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium text-secondary-800">Самовывоз из магазина</div>
                  <div className="text-sm text-gray-600">Бесплатно, сегодня с 10:00</div>
                </div>
              </label>
            </div>
            
            <h2 className="font-medium text-secondary-800 mb-4">
              Способ оплаты
            </h2>
            
            <div className="space-y-2">
              <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium text-secondary-800">Оплата картой при получении</div>
                </div>
              </label>
              
              <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={() => setPaymentMethod('online')}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium text-secondary-800">Онлайн оплата на сайте</div>
                </div>
              </label>
              
              <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium text-secondary-800">Наличными при получении</div>
                </div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="lg:w-80">
          <div className="bg-white rounded-lg shadow p-4 sticky top-4">
            <h2 className="font-medium text-secondary-800 mb-4">
              Ваш заказ
            </h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Товары ({items.length})</span>
                <span className="text-secondary-800">{subtotal.toLocaleString()} ₽</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Доставка</span>
                <span className="text-secondary-800">
                  {deliveryCost > 0 ? `${deliveryCost} ₽` : 'Бесплатно'}
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
              
              {deliveryMethod === 'courier' && (
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
        </div>
      </div>
    </div>
  );
};

export default CartPage;