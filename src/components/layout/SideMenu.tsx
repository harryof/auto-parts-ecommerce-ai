import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { categories } from "../../data/categories";

const categoryIcons: { [key: string]: string } = {
  "spare-parts": "🔧",
  tuning: "🏎️",
  "auto-chemistry": "🧪",
  batteries: "🔋",
  accessories: "🎮",
  tools: "🔨",
  wheels: "⚙️",
  clothing: "👕",
  oil: "💧",
};

const SideMenu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryId);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-bold text-lg text-secondary-800">Категории</h2>
      </div>

      <nav>
        <ul>
          {categories.map((category) => (
            <li
              key={category.id}
              className="border-b border-gray-200 last:border-b-0"
            >
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"
              >
                <span className="flex items-center">
                  <span className="mr-2">{categoryIcons[category.id]}</span>
                  <span className="text-secondary-700">{category.name}</span>
                </span>
                <ChevronRight
                  size={16}
                  className={`text-gray-400 transition-transform ${
                    activeCategory === category.id ? "transform rotate-90" : ""
                  }`}
                />
              </button>

              {activeCategory === category.id && (
                <div className="pl-8 pb-2">
                  <ul className="space-y-1">
                    {category.subCategories.map((subCategory) => (
                      <li key={subCategory.id}>
                        <Link
                          to={`/catalog/${category.id}/${subCategory.id}`}
                          className="block py-1 px-3 text-sm text-secondary-600 hover:text-primary-700"
                        >
                          {subCategory.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4">
        <Link
          to="/contact-us"
          className="btn bg-primary-700 w-full text-center"
        >
          Задать вопрос
        </Link>
      </div>
    </div>
  );
};

export default SideMenu;
