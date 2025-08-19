import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import logo from "../../assets/logo.svg";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt="МОЯ АВТОКОМПАНИЯ" className="h-8" />
            </Link>

            <p className="text-sm text-gray-400 mb-4">
              Интернет-магазин автозапчастей с широким ассортиментом товаров для
              вашего автомобиля.
            </p>

            <div className="space-y-2">
              <div className="flex items-center">
                <Phone size={16} className="mr-2 text-gray-400" />
                <a
                  href="tel:88007751672"
                  className="text-sm hover:text-primary-500"
                >
                  8 (800) 775-16-72
                </a>
              </div>

              <div className="flex items-center">
                <Mail size={16} className="mr-2 text-gray-400" />
                <a
                  href="mailto:info@myautocompany.ru"
                  className="text-sm hover:text-primary-500"
                >
                  info@myautocompany.ru
                </a>
              </div>

              <div className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 text-gray-400" />
                <span className="text-sm">
                  г. Казань, ул. Кремлевская , д. 35
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Категории</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/catalog/spare-parts"
                  className="text-sm text-gray-400 hover:text-primary-500"
                >
                  Запчасти
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog/tuning"
                  className="text-sm text-gray-400 hover:text-primary-500"
                >
                  Тюнинг
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog/auto-chemistry"
                  className="text-sm text-gray-400 hover:text-primary-500"
                >
                  Автохимия и автокосметика
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog/batteries"
                  className="text-sm text-gray-400 hover:text-primary-500"
                >
                  Аккумуляторы
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog/accessories"
                  className="text-sm text-gray-400 hover:text-primary-500"
                >
                  Аксессуары
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Информация</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-400 hover:text-primary-500"
                >
                  О компании
                </Link>
              </li>
              <li>
                <Link
                  to="/how-to-buy"
                  className="text-sm text-gray-400 hover:text-primary-500"
                >
                  Как купить
                </Link>
              </li>
              <li>
                <Link
                  to="/delivery"
                  className="text-sm text-gray-400 hover:text-primary-500"
                >
                  Доставка
                </Link>
              </li>
              <li>
                <Link
                  to="/payment"
                  className="text-sm text-gray-400 hover:text-primary-500"
                >
                  Оплата
                </Link>
              </li>
              <li>
                <Link
                  to="/warranty"
                  className="text-sm text-gray-400 hover:text-primary-500"
                >
                  Гарантия
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Мы в социальных сетях</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-400 hover:text-primary-500">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500">
                <Youtube size={24} />
              </a>
            </div>

            <p className="text-sm text-gray-400 mb-2">
              Подпишитесь на рассылку
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Ваш email"
                className="flex-1 py-2 px-3 text-sm bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
              <button className="bg-primary-700 text-white py-2 px-4 text-sm rounded-r-md hover:bg-primary-800">
                OK
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © {currentYear} МОЯ АВТОКОМПАНИЯ. Все права защищены.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/privacy-policy"
              className="text-sm text-gray-500 hover:text-gray-300"
            >
              Политика конфиденциальности
            </Link>
            <Link
              to="/terms"
              className="text-sm text-gray-500 hover:text-gray-300"
            >
              Условия использования
            </Link>
            <Link
              to="/sitemap"
              className="text-sm text-gray-500 hover:text-gray-300"
            >
              Карта сайта
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
