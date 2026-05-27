import React, { useState } from "react";
import { Product } from "../../types/product";

interface ProductTabsProps {
  product: Product;
}

const TABS = [
  { key: "description",    label: "Описание" },
  { key: "specifications", label: "Характеристики" },
  { key: "compatibility",  label: "Совместимость" },
];

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");

  const specs = product.specifications ?? {};
  const hasSpecs = Object.keys(specs).length > 0;
  const hasCars = product.compatibleCars && product.compatibleCars.length > 0;

  return (
    <div className="glass rounded-2xl overflow-hidden mb-6">
      
      <div className="flex border-b border-white/5 overflow-x-auto no-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-all relative
              ${activeTab === tab.key
                ? "text-primary-400"
                : "text-dark-400 hover:text-white"
              }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      
      <div className="p-6">
        
        {activeTab === "description" && (
          <div className="text-dark-200 leading-relaxed text-sm">
            {product.description
              ? <p>{product.description}</p>
              : <p className="text-dark-500 italic">Описание отсутствует</p>
            }
          </div>
        )}

        
        {activeTab === "specifications" && (
          hasSpecs ? (
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(specs).map(([key, value], i) => (
                  <tr
                    key={key}
                    className={i % 2 === 0 ? "bg-dark-900/40" : ""}
                  >
                    <td className="py-2.5 px-4 text-dark-400 font-medium w-48 rounded-l-lg">{key}</td>
                    <td className="py-2.5 px-4 text-white rounded-r-lg">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-dark-500 italic text-sm">Характеристики не указаны</p>
          )
        )}

        
        {activeTab === "compatibility" && (
          hasCars ? (
            <div>
              <p className="text-xs text-dark-400 mb-3">Товар совместим со следующими автомобилями:</p>
              <div className="flex flex-wrap gap-2">
                {product.compatibleCars!.map((car) => (
                  <span
                    key={car}
                    className="px-3 py-1.5 bg-dark-800 border border-white/5 rounded-xl text-sm text-dark-200"
                  >
                    {car}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-dark-500 italic text-sm">Данные о совместимости не указаны</p>
          )
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
