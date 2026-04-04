import React from "react";
import { Search } from "lucide-react";

interface HeaderSearchProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  className?: string; // To allow mobile vs desktop specific styles
}

const HeaderSearch: React.FC<HeaderSearchProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  className = "",
}) => {
  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Поиск запчастей, масел, аксессуаров..."
        className="input-search pl-5 pr-14"
      />
      <button
        type="submit"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-400"
      >
        <Search size={18} />
      </button>
    </form>
  );
};

export default HeaderSearch;
