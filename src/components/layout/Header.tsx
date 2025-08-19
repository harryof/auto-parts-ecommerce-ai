import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Phone,
  Heart,
  ShoppingCart,
  User,
  Search,
  Menu,
  ChevronDown,
  MapPin,
  LogOut,
} from "lucide-react";
import logo from "../../assets/logo.svg";
import { useCartStore } from "../../store/cartStore";
import { useFavoritesStore } from "../../store/favoritesStore";
import { getCurrentUser, logoutUser } from "../../data/users";

interface HeaderProps {
  toggleSideMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSideMenu }) => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Казань");
  const [cityMenuOpen, setCityMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const { items, clearCart } = useCartStore();
  const { items: favoriteItems, clearFavorites } = useFavoritesStore();

  useEffect(() => {
    // Обновляем информацию о пользователе при изменении localStorage
    const handleStorageChange = () => {
      setCurrentUser(getCurrentUser());
    };

    // Слушаем изменения в localStorage
    window.addEventListener("storage", handleStorageChange);

    // Создаем кастомное событие для обновления при входе/выходе
    const handleAuthChange = () => {
      setCurrentUser(getCurrentUser());
    };
    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const cartItemsCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = () => {
    // Очищаем корзину и избранное
    clearCart();
    clearFavorites();

    // Выходим из аккаунта
    logoutUser();
    setCurrentUser(null);
    setUserMenuOpen(false);

    // Вызываем кастомное событие для обновления состояния
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  const cities = [
    "Москва",
    "Санкт-Петербург",
    "Красноярск",
    "Новосибирск",
    "Екатеринбург",
    "Казань",
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleCityMenu = () => {
    setCityMenuOpen(!cityMenuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const selectCity = (city: string) => {
    setSelectedCity(city);
    setCityMenuOpen(false);
  };

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="py-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={toggleSideMenu} className="md:hidden">
              <Menu size={24} />
            </button>

            <Link to="/" className="flex items-center">
              <img src={logo} alt="МОЯ АВТОКОМПАНИЯ" className="h-8" />
            </Link>

            <div className="relative hidden md:block">
              <button
                onClick={toggleCityMenu}
                className="flex items-center text-sm text-gray-300 hover:text-white"
              >
                <MapPin size={16} className="mr-1" />
                {selectedCity}
                <ChevronDown size={16} className="ml-1" />
              </button>

              {cityMenuOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white text-black rounded shadow-lg z-50">
                  <ul className="py-1">
                    {cities.map((city) => (
                      <li key={city}>
                        <button
                          onClick={() => selectCity(city)}
                          className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                        >
                          {city}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по сайту"
                className="w-full py-1 px-3 pr-10 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          <div className="flex items-center space-x-4">
            <a href="tel:88007751672" className="hidden md:flex items-center">
              <Phone size={16} className="mr-1" />
              <span className="text-sm">8 (800) 775-16-72</span>
            </a>

            {currentUser ? (
              <div className="relative hidden sm:block">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center text-sm text-gray-300 hover:text-white"
                >
                  <User size={16} className="mr-1" />
                  <span>{currentUser.name}</span>
                  <ChevronDown size={16} className="ml-1" />
                </button>

                {userMenuOpen && (
                  <div className="absolute top-full right-0 mt-1 bg-white text-black rounded shadow-lg z-50 min-w-[200px]">
                    <div className="py-2 px-4 border-b border-gray-200">
                      <p className="font-medium">{currentUser.name}</p>
                      <p className="text-sm text-gray-600">
                        {currentUser.email}
                      </p>
                    </div>
                    <ul className="py-1">
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Личный кабинет
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/orders"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Мои заказы
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          <LogOut size={16} className="mr-2" />
                          Выйти
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="hidden sm:flex items-center text-sm text-gray-300 hover:text-white"
              >
                <User size={16} className="mr-1" />
                <span>Войти</span>
              </Link>
            )}

            <Link to="/favorites" className="relative p-1">
              <Heart size={20} />
              <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {favoriteItems.length}
              </span>
            </Link>

            <Link to="/cart" className="relative p-1">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartItemsCount}
              </span>
            </Link>

            <button onClick={toggleSearch} className="md:hidden p-1">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {isSearchOpen && (
          <div className="pb-2 md:hidden">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по сайту"
                className="w-full py-1 px-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </form>
          </div>
        )}

        {/* Main navigation */}
        <nav className="bg-primary-700 -mx-4 px-4">
          <ul className="flex flex-wrap justify-center md:justify-start space-x-1 md:space-x-4">
            <li>
              <Link
                to="/catalog"
                className="block py-3 px-2 font-medium hover:text-gray-200"
              >
                КАТАЛОГ
              </Link>
            </li>
            <li>
              <Link
                to="/autoservice"
                className="block py-3 px-2 font-medium hover:text-gray-200"
              >
                АВТОСЕРВИС
              </Link>
            </li>
            <li>
              <Link
                to="/original-catalogs"
                className="block py-3 px-2 font-medium hover:text-gray-200 whitespace-nowrap"
              >
                ОРИГИНАЛЬНЫЕ КАТАЛОГИ
              </Link>
            </li>
            <li>
              <Link
                to="/how-to-buy"
                className="block py-3 px-2 font-medium hover:text-gray-200"
              >
                КАК КУПИТЬ
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-3 px-2 font-medium hover:text-gray-200"
              >
                КОМПАНИЯ
              </Link>
            </li>
            <li>
              <Link
                to="/contacts"
                className="block py-3 px-2 font-medium hover:text-gray-200"
              >
                КОНТАКТЫ
              </Link>
            </li>
            <li>
              <Link
                to="/news"
                className="block py-3 px-2 font-medium hover:text-gray-200"
              >
                НОВОСТИ
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
