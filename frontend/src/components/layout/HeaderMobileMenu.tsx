import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { NavLink } from "./HeaderNav";

interface CurrentUser {
  name: string;
  email: string;
}

interface HeaderMobileMenuProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  navLinks: NavLink[];
  currentUser: CurrentUser | null;
}

const HeaderMobileMenu: React.FC<HeaderMobileMenuProps> = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  searchQuery,
  setSearchQuery,
  handleSearch,
  navLinks,
  currentUser,
}) => {
  if (!mobileMenuOpen) return null;

  return (
    <div className="lg:hidden absolute top-full left-0 right-0 border-b p-4 shadow-xl animate-slide-down transition-colors duration-300" style={{ backgroundColor: 'var(--bg-body)', borderColor: 'var(--color-border)' }}>
      <form onSubmit={handleSearch} className="relative mb-6 sm:hidden">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск..."
          className="input-search w-full pr-12"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        >
          <Search size={18} />
        </button>
      </form>

      <nav className="flex flex-col gap-2">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-dark-800 rounded-xl"
          >
            {link.label}
          </Link>
        ))}

        <hr className="border-white/5 my-2" />

        {currentUser && (
          <Link
            to="/profile"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-dark-800 rounded-xl"
          >
            Личный кабинет
          </Link>
        )}
      </nav>
    </div>
  );
};

export default HeaderMobileMenu;
