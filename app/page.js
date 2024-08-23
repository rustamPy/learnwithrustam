'use client';
import React from 'react';

import Introduction from '@/components/Hero/Introduction';
import HeroCarousel from '@/components/Hero/Carousel';
import Features from '@/components/Hero/Features';
import SearchWindow from '@/components/Hero/SearchWindow';

const Index = () => (
  <div className='text-center m-9 mt-6'>
    {/* Introduction Section */}
    <Introduction />

    {/* Features Section */}
    <Features />

    {/* Search Window Section for course search */}
    <SearchWindow />

    {/* Hero Carousel Section with images */}
    <HeroCarousel />
  </div>
);

export default Index;