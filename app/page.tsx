import React from 'react';
// Componenets
import HeroPage from '@/components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import FeaturedProperties from '@/components/FeaturedProperties';
import RecentProperties from '@/components/RecentProperties';


// LWRs

import LWRHero from '@/components/Hero/LWRHero';


const Index = () => {
  return (
    <>
      <LWRHero />
      {/* <HeroPage />
      <InfoBoxes />
      <FeaturedProperties />
      <RecentProperties /> */}
      {/* <section className="m-auto max-w-lg my-10 px-6">
        <a
          href={'/properties'}
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >View All Properties</a>
      </section> */}
    </>
  )
}

export default Index