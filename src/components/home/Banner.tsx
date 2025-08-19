import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    id: 1,
    title: 'ПРИВЕДИ ДРУГА',
    subtitle: 'ПОЛУЧИ БОНУС',
    description: 'Рекомендуйте автосервис «МОЯ АВТОКОМПАНИЯ» вашим друзьям и получайте: 500 подарочных бонусов на вашу карту Вираж Бонус, а друг - скидку 15% на работы автосервиса.',
    image: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    buttonText: 'Подробнее',
    buttonLink: '/promotion/refer-friend'
  },
  {
    id: 2,
    title: 'СКИДКА 20%',
    subtitle: 'НА ВСЕ МАСЛА',
    description: 'Только до конца месяца! Скидка 20% на все моторные и трансмиссионные масла ведущих производителей.',
    image: 'https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    buttonText: 'В каталог',
    buttonLink: '/catalog/oils'
  },
  {
    id: 3,
    title: 'БЕСПЛАТНАЯ ДИАГНОСТИКА',
    subtitle: 'ПРИ ЗАПИСИ ОНЛАЙН',
    description: 'Запишитесь на сервис через наш сайт и получите бесплатную диагностику подвески!',
    image: 'https://images.pexels.com/photos/3807319/pexels-photo-3807319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    buttonText: 'Записаться',
    buttonLink: '/service/booking'
  }
];

const Banner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden h-[400px] mb-8">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-700 flex items-center ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${banner.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="container mx-auto px-4 md:px-10 lg:px-20">
            <div className="max-w-lg">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                {banner.title}
              </h2>
              <h3 className="text-2xl md:text-3xl text-primary-400 mb-4">
                {banner.subtitle}
              </h3>
              <p className="text-gray-200 mb-6 text-sm md:text-base">
                {banner.description}
              </p>
              <a
                href={banner.buttonLink}
                className="inline-block px-6 py-3 bg-primary-700 text-white font-medium rounded-md hover:bg-primary-800 transition-colors"
              >
                {banner.buttonText}
              </a>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 z-20 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 z-20 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-primary-600' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;