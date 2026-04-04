import React, { useState } from "react";

const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be the logic to send the form data
    console.log("Form submitted:", formData);
    alert("Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="section-title mb-4">
        <span>Связаться</span> с нами
      </h1>
      <div className="accent-line mx-auto mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-6">Контактная информация</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <svg
                className="w-6 h-6 text-gray-600 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div>
                <h3 className="font-semibold">Адрес</h3>
                <p className="text-gray-600">
                  г. Москва, ул. Автозапчастей, д. 123
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <svg
                className="w-6 h-6 text-gray-600 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <div>
                <h3 className="font-semibold">Телефон</h3>
                <p className="text-gray-600">+7 (495) 123-45-67</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <svg
                className="w-6 h-6 text-gray-600 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-600">info@autoparts.ru</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-white mb-4">Режим работы</h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                Понедельник - Пятница: 9:00 - 20:00
              </p>
              <p className="text-gray-600">Суббота: 10:00 - 18:00</p>
              <p className="text-gray-600">Воскресенье: выходной</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-6">Форма обратной связи</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Ваше имя
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Телефон
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Тема обращения
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              >
                <option value="">Выберите тему</option>
                <option value="question">Вопрос по товару</option>
                <option value="order">Вопрос по заказу</option>
                <option value="delivery">Доставка</option>
                <option value="return">Возврат товара</option>
                <option value="other">Другое</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Сообщение
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-700 text-white py-2 px-4 rounded-md hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Отправить сообщение
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
