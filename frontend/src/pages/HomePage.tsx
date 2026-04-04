import React from 'react';
import Banner from '../components/home/Banner';
import BrandsMarquee from '../components/home/BrandsMarquee';
import PopularCategories from '../components/home/PopularCategories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import PromoBanners from '../components/home/PromoBanners';
import AdvantagesSection from '../components/home/AdvantagesSection';
import ReviewsSection from '../components/home/ReviewsSection';
import NewsletterSection from '../components/home/NewsletterSection';
import CtaSection from '../components/home/CtaSection';

const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      <Banner />
      <BrandsMarquee />
      <PopularCategories />
      <PromoBanners />
      <FeaturedProducts />
      <AdvantagesSection />
      <ReviewsSection />
      <NewsletterSection />
      <CtaSection />
    </div>
  );
};

export default HomePage;
