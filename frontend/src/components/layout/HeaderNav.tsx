import React from "react";
import { Link } from "react-router-dom";

export interface NavLink {
  to: string;
  label: string;
}

interface HeaderNavProps {
  navLinks: NavLink[];
}

const HeaderNav: React.FC<HeaderNavProps> = ({ navLinks }) => {
  return (
    <div className="hidden lg:block">
      <nav className="max-w-[1600px] mx-auto px-4 h-12 flex items-center">
        <ul className="flex items-center justify-between w-full max-w-4xl mx-auto">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="text-base font-medium text-gray-300 hover:text-white transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default HeaderNav;
