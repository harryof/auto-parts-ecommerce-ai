import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { LucideIcon,
  Settings2, Droplets, Cpu, BatteryFull, Star,
  Paintbrush, Wrench, Bolt, Gauge, Filter, Circle,
  Minus, Zap,
} from "lucide-react";
import { useCategories } from "../../context/CategoriesContext";

const ICON_MAP: Record<string, LucideIcon> = {
  Settings2, Droplets, Cpu, BatteryFull, Star,
  Paintbrush, Wrench, Bolt, Gauge, Filter, Circle, Minus, Zap,
};

const SkeletonItem: React.FC = () => (
  <div className="flex items-center gap-3 px-4 py-2.5 animate-pulse">
    <div className="w-4 h-4 rounded bg-dark-700 flex-shrink-0" />
    <div className="h-3 bg-dark-700 rounded flex-1" />
  </div>
);

const CategorySidebar: React.FC = () => {
  const { categoryId, subCategoryId } = useParams<{
    categoryId: string;
    subCategoryId: string;
  }>();
  const { categories, loading } = useCategories();
  const [expanded, setExpanded] = useState<string | null>(categoryId ?? null);

  const toggle = (id: string) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 sticky top-24">
      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-white/5">
          <span className="text-xs font-bold uppercase tracking-widest text-dark-400">
            Категории
          </span>
        </div>

        <nav className="py-2">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonItem key={i} />)
            : categories.map((cat) => {
                const IconComp = ICON_MAP[cat.icon] ?? Settings2;
                const isActive = cat.id === categoryId;
                const isOpen = expanded === cat.id;

                return (
                  <div key={cat.id}>
                    <div
                      className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer group transition-colors select-none
                        ${isActive
                          ? "bg-primary-500/10 text-primary-400"
                          : "text-dark-200 hover:bg-white/5 hover:text-white"
                        }`}
                      onClick={() => toggle(cat.id)}
                    >
                      <IconComp
                        size={16}
                        className={`flex-shrink-0 transition-colors ${isActive ? "text-primary-400" : "text-dark-400 group-hover:text-white"}`}
                      />
                      <Link
                        to={`/catalog/${cat.id}`}
                        className="flex-1 text-sm font-medium leading-tight"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {cat.name}
                      </Link>
                      {cat.subCategories.length > 0 && (
                        <span className="flex-shrink-0 text-dark-500 transition-transform duration-200">
                          {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </span>
                      )}
                    </div>

                    {isOpen && cat.subCategories.length > 0 && (
                      <div className="bg-dark-900/30">
                        {cat.subCategories.map((sub) => {
                          const isSubActive = sub.id === subCategoryId;
                          return (
                            <Link
                              key={sub.id}
                              to={`/catalog/${cat.id}/${sub.id}`}
                              className={`flex items-center gap-2 pl-10 pr-4 py-2 text-sm transition-colors
                                ${isSubActive
                                  ? "text-primary-400 font-semibold bg-primary-500/10"
                                  : "text-dark-300 hover:text-white hover:bg-white/5"
                                }`}
                            >
                              <span className={`w-1 h-1 rounded-full flex-shrink-0 ${isSubActive ? "bg-primary-400" : "bg-dark-500"}`} />
                              {sub.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
        </nav>
      </div>
    </aside>
  );
};

export default CategorySidebar;
