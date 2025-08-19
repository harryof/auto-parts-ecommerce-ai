import React from 'react';
import Banner from '../components/home/Banner';
import FeaturedProducts from '../components/home/FeaturedProducts';

const HomePage: React.FC = () => {
  return (
    <div>
      <Banner />
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;