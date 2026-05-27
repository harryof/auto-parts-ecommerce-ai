import React from "react";
import { Link } from "react-router-dom";
import { User, Heart, ShoppingCart, Settings, Package, LogOut, Sun, Moon } from "lucide-react";
import { Product } from "../../types/product";
import { useTheme } from "../../context/ThemeContext";

interface CurrentUser {
  name: string;
  email: string;
}

interface HeaderActionsProps {
  currentUser: CurrentUser | null;
  userMenuOpen: boolean;
  setUserMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
  favs: Product[];
  cartCount: number;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({
  currentUser,
  userMenuOpen,
  setUserMenuOpen,
  handleLogout,
  favs,
  cartCount,
}) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex items-center gap-2 lg:gap-5 ml-auto">
      
      {currentUser ? (
        <div className="relative hidden lg:block" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setUserMenuOpen((v) => !v)}
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <User size={18} />{" "}
            <span className="font-medium">{currentUser.name.split(" ")[0]}</span>
          </button>
          {userMenuOpen && (
            <div className="absolute top-full right-0 mt-3 bg-dark-800 border border-white/5 rounded-xl shadow-card overflow-hidden w-52 animate-slide-down">
              <div className="px-4 py-3 border-b border-white/5">
                <p className="font-semibold text-white">{currentUser.name}</p>
                <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
              </div>
              {[
                { to: "/profile", icon: <Settings size={15} />, label: "Кабинет" },
                { to: "/orders", icon: <Package size={15} />, label: "Заказы" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                >
                  <span className="text-gray-500">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-white/5"
              >
                <LogOut size={15} /> Выйти
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/auth"
          className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
        >
          <User size={18} /> <span className="hidden lg:block font-medium">Войти</span>
        </Link>
      )}

      
      <button
        onClick={toggleTheme}
        title={theme === "dark" ? "Светлая тема" : "Тёмная тема"}
        className="p-2 text-gray-300 hover:text-primary-400 transition-colors duration-200"
        aria-label="Toggle theme"
      >
        {theme === "dark"
          ? <Sun size={20} className="transition-transform duration-300 rotate-0 scale-100" />
          : <Moon size={20} className="transition-transform duration-300 rotate-0 scale-100" />}
      </button>

      
      <Link
        to="/favorites"
        className="relative p-2 text-gray-300 hover:text-white transition-colors"
      >
        <Heart size={20} />
        {favs.length > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] flex items-center justify-center bg-primary-500 text-dark-950 text-[10px] font-bold rounded-full">
            {favs.length}
          </span>
        )}
      </Link>

      
      <Link
        to="/cart"
        className="relative p-2 text-gray-300 hover:text-white transition-colors"
      >
        <ShoppingCart size={20} />
        {cartCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] flex items-center justify-center bg-primary-500 text-dark-950 text-[10px] font-bold rounded-full">
            {cartCount}
          </span>
        )}
      </Link>
    </div>
  );
};

export default HeaderActions;
