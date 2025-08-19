import React from "react";

const steps = [
  {
    id: 1,
    title: "Выберите товар",
    description:
      "Просмотрите наш каталог и выберите нужные запчасти. Используйте фильтры для удобного поиска по марке, модели и категории.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Добавьте в корзину",
    description:
      'Нажмите кнопку "Добавить в корзину" на странице товара. Вы можете изменить количество или удалить товар из корзины.',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Оформите заказ",
    description:
      'Перейдите в корзину, проверьте выбранные товары и нажмите "Оформить заказ". Заполните контактные данные и выберите способ доставки.',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Оплатите заказ",
    description:
      "Выберите удобный способ оплаты: банковской картой онлайн, наличными при получении или безналичным расчетом для юридических лиц.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Получите заказ",
    description:
      "После оплаты мы отправим вам заказ выбранным способом доставки. Вы получите уведомление о статусе заказа по email или SMS.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        />
      </svg>
    ),
  },
];

const HowToBuyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Как сделать заказ</h1>

      <div className="space-y-12">
        <div className="space-y-8">
          {steps.map((step) => (
            <div key={step.id} className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                {step.icon}
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">{step.title}</h2>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Способы оплаты</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Онлайн оплата</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Банковской картой Visa/Mastercard</li>
                <li>• Через электронные кошельки</li>
                <li>• Через интернет-банкинг</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Оплата при получении</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Наличными курьеру</li>
                <li>• Банковской картой курьеру</li>
                <li>• Безналичный расчет для юр. лиц</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Способы доставки</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Курьерская доставка</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Доставка по Москве - от 300 ₽</li>
                <li>• Доставка по России - от 500 ₽</li>
                <li>• Срок доставки: 1-3 дня</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Самовывоз</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Из магазина - бесплатно</li>
                <li>• Из пунктов выдачи - от 200 ₽</li>
                <li>• Срок готовности: 1-2 часа</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Остались вопросы?</h2>
          <p className="text-gray-600 mb-6">
            Наши специалисты готовы помочь вам с выбором и оформлением заказа
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Позвонить нам
            </button>
            <button className="bg-white text-blue-600 py-2 px-6 rounded-md border border-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Написать в чат
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToBuyPage;
