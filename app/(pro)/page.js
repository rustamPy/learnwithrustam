'use client';
import React from 'react';

import Introduction from '@/components/pro/Hero/Introduction';
import HeroCarousel from '@/components/pro/Hero/Carousel';
import Features from '@/components/pro/Hero/Features';
import CourseSearch from '@/components/pro/Hero/CourseSearch';

const Index = () => (
  <div className='text-center m-9 mt-6'>
    {/* Introduction Section */}
    <Introduction />

    {/* Features Section */}
    <Features />

    {/* Search Window Section for course search */}
    <CourseSearch />

    {/* Hero Carousel Section with images */}
    <HeroCarousel />
  </div>
);

export default Index;