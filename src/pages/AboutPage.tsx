import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">О нашей компании</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Наша история</h2>
          <p className="text-gray-700 leading-relaxed">
            Мы - ведущий поставщик автозапчастей в России, работающий на рынке с
            2010 года. За это время мы заслужили доверие тысяч клиентов
            благодаря качеству продукции и профессиональному сервису.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Наши преимущества</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Официальный дилер ведущих производителей автозапчастей</li>
            <li>Гарантия на все товары</li>
            <li>Быстрая доставка по всей России</li>
            <li>Профессиональная консультация специалистов</li>
            <li>Собственный склад с широким ассортиментом</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Наша миссия</h2>
          <p className="text-gray-700 leading-relaxed">
            Мы стремимся сделать обслуживание автомобилей доступным и
            качественным для каждого автовладельца. Наша цель - обеспечить
            клиентов надежными запчастями и профессиональной поддержкой.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Наши достижения</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">10+ лет</h3>
              <p className="text-gray-600">Успешной работы на рынке</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">50,000+</h3>
              <p className="text-gray-600">Довольных клиентов</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">100,000+</h3>
              <p className="text-gray-600">Товаров в каталоге</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">24/7</h3>
              <p className="text-gray-600">Поддержка клиентов</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
