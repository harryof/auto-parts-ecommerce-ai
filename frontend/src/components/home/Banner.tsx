import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Package, ShieldCheck, Truck } from "lucide-react";
import imgHero from "../../assets/images/hero_auto_parts_1773677862466.png";

const Banner: React.FC = () => {
  return (
    <div className="w-full">
      {/* ── Main Hero Section ── */}
      <section className="relative w-full pt-10 pb-16 lg:pt-24 lg:pb-32 overflow-hidden mx-auto">
        <div className="max-w-[1600px] mx-auto px-4 relative z-10 flex flex-col-reverse lg:flex-row items-center gap-12">

          {/* Hero Image (Left side on screenshot, actually the 3D parts) */}
          <div className="w-full lg:w-1/2 animate-slide-in-left relative">
            {/* The generated image goes here. We'll simulate the floating parts. */}
            <div className="relative aspect-[4/3] w-full max-w-lg mx-auto lg:max-w-none">
              <img
                src={imgHero}
                alt="Автозапчасти"
                className="w-full h-full object-contain drop-shadow-2xl animate-float rounded-2xl"
                style={{ filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.5))" }}
              />
            </div>
          </div>

          {/* Hero Content (Right side) */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 tracking-tight leading-tight">
              АВТОЗАПЧАСТИ
            </h1>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight">
              ПО <span className="highlight-yellow">ВЫГОДНЫМ ЦЕНАМ!</span>
            </h2>

            <p className="text-gray-400 text-lg sm:text-xl mb-10 max-w-md">
              Широкий выбор запчастей для всех марок автомобилей
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link to="/catalog" className="btn-primary">
                Смотреть каталог
              </Link>
              <Link to="/sale" className="btn-secondary group">
                Акции <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="mb-10">
        <div className="max-w-[1600px] mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">

            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-dark-800 rounded-xl text-gray-300 group-hover:text-primary-500 transition-colors">
                <Package size={28} />
              </div>
              <span className="font-semibold text-gray-200">Более 100 000 товаров</span>
            </div>

            <div className="hidden md:block w-px h-12 bg-white/10" />

            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-dark-800 rounded-xl text-gray-300 group-hover:text-primary-500 transition-colors">
                <ShieldCheck size={28} />
              </div>
              <span className="font-semibold text-gray-200">Гарантия качества</span>
            </div>

            <div className="hidden md:block w-px h-12 bg-white/10" />

            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-dark-800 rounded-xl text-gray-300 group-hover:text-primary-500 transition-colors">
                <Truck size={28} />
              </div>
              <span className="font-semibold text-gray-200">Доставка 1-2 дня</span>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
