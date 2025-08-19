import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag, ChevronLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-10">
      <div className="mb-6">
        <div className="text-9xl font-bold text-primary-700 mb-2">404</div>
        <h1 className="text-2xl font-bold text-secondary-800 mb-2">
          Страница не найдена
        </h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Извините, но страница, которую вы пытаетесь посетить, не существует или была перемещена.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center justify-center px-4 py-2 bg-primary-700 text-white rounded-md hover:bg-primary-800"
        >
          <Home size={18} className="mr-2" />
          На главную
        </Link>
        
        <Link
          to="/catalog"
          className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-300 text-secondary-700 rounded-md hover:bg-gray-50"
        >
          <ShoppingBag size={18} className="mr-2" />
          В каталог
        </Link>
        
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-300 text-secondary-700 rounded-md hover:bg-gray-50"
        >
          <ChevronLeft size={18} className="mr-2" />
          Назад
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;