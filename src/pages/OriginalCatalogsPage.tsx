import React, { useState } from "react";

interface Manufacturer {
  id: number;
  name: string;
  logo: string;
  description: string;
  categories: string[];
  catalogUrl: string;
}

const manufacturers: Manufacturer[] = [
  {
    id: 1,
    name: "BMW",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png",
    description:
      "Официальный каталог запчастей BMW с полным ассортиментом оригинальных деталей",
    categories: [
      "Двигатель",
      "Тормозная система",
      "Подвеска",
      "Кузовные детали",
      "Электрика",
    ],
    catalogUrl: "https://www.bmw.ru/ru/catalog.html",
  },
  {
    id: 2,
    name: "Mercedes-Benz",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png",
    description:
      "Каталог оригинальных запчастей Mercedes-Benz для всех моделей",
    categories: [
      "Двигатель",
      "Тормозная система",
      "Подвеска",
      "Кузовные детали",
      "Электрика",
    ],
    catalogUrl: "https://www.mercedes-benz.ru/parts-catalog/",
  },
  {
    id: 3,
    name: "Audi",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/2048px-Audi-Logo_2016.svg.png",
    description:
      "Полный каталог оригинальных запчастей Audi с техническими спецификациями",
    categories: [
      "Двигатель",
      "Тормозная система",
      "Подвеска",
      "Кузовные детали",
      "Электрика",
    ],
    catalogUrl: "https://www.audi.ru/ru/web/ru/parts-catalog.html",
  },
  {
    id: 4,
    name: "Toyota",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/2048px-Toyota_carlogo.svg.png",
    description:
      "Официальный каталог запчастей Toyota с гарантией оригинальности",
    categories: [
      "Двигатель",
      "Тормозная система",
      "Подвеска",
      "Кузовные детали",
      "Электрика",
    ],
    catalogUrl: "https://www.toyota.ru/parts/",
  },
];

const OriginalCatalogsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedManufacturer, setSelectedManufacturer] =
    useState<Manufacturer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredManufacturers = manufacturers.filter((manufacturer) => {
    const matchesSearch =
      manufacturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manufacturer.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || manufacturer.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const allCategories = Array.from(
    new Set(manufacturers.flatMap((m) => m.categories))
  );

  const handleOpenCatalog = (manufacturer: Manufacturer) => {
    setSelectedManufacturer(manufacturer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedManufacturer(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Оригинальные каталоги</h1>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Поиск по производителю или описанию..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="w-full md:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Все категории</option>
              {allCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredManufacturers.map((manufacturer) => (
          <div
            key={manufacturer.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={manufacturer.logo}
                  alt={manufacturer.name}
                  className="w-16 h-16 object-contain"
                />
                <h2 className="text-2xl font-semibold">{manufacturer.name}</h2>
              </div>
              <p className="text-gray-600 mb-4">{manufacturer.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {manufacturer.categories.map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleOpenCatalog(manufacturer)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Открыть каталог
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedManufacturer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                Каталог {selectedManufacturer.name}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mb-4">
              <p className="text-gray-600">
                Вы будете перенаправлены на официальный каталог{" "}
                {selectedManufacturer.name}
              </p>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Отмена
              </button>
              <a
                href={selectedManufacturer.catalogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Перейти в каталог
              </a>
            </div>
          </div>
        </div>
      )}

      {filteredManufacturers.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Ничего не найдено
          </h3>
          <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
        </div>
      )}

      <div className="mt-12 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">
          Преимущества оригинальных каталогов
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Гарантия качества</h3>
            <p className="text-gray-600">
              Все запчасти в каталогах имеют гарантию производителя и
              соответствуют стандартам качества
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Точные спецификации</h3>
            <p className="text-gray-600">
              Подробные технические характеристики и совместимость с моделями
              автомобилей
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Актуальные цены</h3>
            <p className="text-gray-600">
              Регулярное обновление цен и наличие запчастей на складе
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OriginalCatalogsPage;
