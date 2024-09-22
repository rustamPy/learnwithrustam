'use client';
import React from 'react';

import Introduction from '@/components/pro/Hero/Introduction';
import HeroCarousel from '@/components/pro/Hero/Carousel';
import Features from '@/components/pro/Hero/Features';
import SearchWindow from '@/components/pro/Hero/SearchWindow';

const Index = () => (
  <div className='m-1 mt-6 flex flex-col items-center'>
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