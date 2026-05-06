import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/graphics/Logo.png";
import { useCartStore } from "../../store/cartStore";
import { useFavoritesStore } from "../../store/favoritesStore";
import api from "../../services/api";
import { useTheme } from "../../context/ThemeContext";

import HeaderSearch from "./HeaderSearch";
import HeaderActions from "./HeaderActions";
import HeaderNav, { NavLink } from "./HeaderNav";
import HeaderMobileMenu from "./HeaderMobileMenu";

interface HeaderProps {
  toggleSideMenu: () => void;
}

const NAV_LINKS: NavLink[] = [
  { to: "/catalog", label: "Каталог" },
  { to: "/delivery", label: "Доставка" },
  { to: "/autoservice", label: "Автосервис" },
  { to: "/news", label: "Новости" },
  { to: "/about", label: "О компании" },
  { to: "/how-to-buy", label: "Как купить" },
  { to: "/contacts", label: "Контакты" },
];

const Header: React.FC<HeaderProps> = ({ toggleSideMenu }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(api.getCurrentUser());

  const { items, clearCart } = useCartStore();
  const { items: favs, clearFavorites } = useFavoritesStore();
  const cartCount = items.reduce((t, i) => t + i.quantity, 0);

  useEffect(() => {
    const update = () => setCurrentUser(api.getCurrentUser());
    window.addEventListener("storage", update);
    window.addEventListener("authChange", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("authChange", update);
    };
  }, []);

  const handleLogout = () => {
    clearCart(); clearFavorites(); api.logout();
    setCurrentUser(null); setUserMenuOpen(false);
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const close = () => { setUserMenuOpen(false); };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-colors duration-300" style={{ backgroundColor: 'var(--bg-header)', borderBottom: '1px solid var(--color-border)' }}>
      {/* ── Main Bar (Search & Actions) ── */}
      <div className="max-w-[1600px] mx-auto px-4 pt-6 pb-2 lg:pt-8 lg:pb-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0 flex items-center w-[160px] sm:w-[200px] lg:w-[280px] h-[40px] lg:h-[50px]">
          <img 
            src={logo} 
            alt="МОЯ АВТОКОМПАНИЯ" 
            className={`w-full h-full object-contain scale-[1.4] origin-left transition-all duration-300 ${theme === "dark" ? "brightness-0 invert opacity-90" : "brightness-0 opacity-100"}`} 
          />
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(v => !v)}
          className="lg:hidden p-2 text-gray-300 hover:text-white ml-auto"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Central Search */}
        <HeaderSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          className="flex-1 w-full hidden sm:block mx-4 lg:mx-12 xl:mx-20"
        />

        {/* Actions */}
        <HeaderActions
          currentUser={currentUser}
          userMenuOpen={userMenuOpen}
          setUserMenuOpen={setUserMenuOpen}
          handleLogout={handleLogout}
          favs={favs}
          cartCount={cartCount}
        />
      </div>

      <HeaderNav navLinks={NAV_LINKS} />

      <HeaderMobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        navLinks={NAV_LINKS}
        currentUser={currentUser}
      />
    </header>
  );
};

export default Header;

