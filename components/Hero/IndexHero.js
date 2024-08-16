'use client';
import React from 'react'

import Introduction from '@/components/Hero/Introduction'
import HeroCarousel from '@/components/Hero/Carousel'
import Features from '@/components/Hero/Features'
import SearchWindow from '@/components/Hero/SearchWindow';

import { Typography } from '@material-tailwind/react';

const IndexHero = () => {
    return (
        <>
            <div className='text-center m-9 mt-6'>

                {/* Introduction */}
                <Introduction />

                {/* Introduction */}
                <Features />


                <iframe src="https://open.spotify.com/embed/track/2cTJZdJuudcg4JB66koO5K?utm_source=generator" height="200" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" className='rounded-xl w-full'></iframe>
                {/* Search Window is search engine to find the appropriate course */}
                <SearchWindow />

                {/* Hero Carousel is carousel of images with admin */}
                <HeroCarousel />
            </div>
        </>
    )
}

export default IndexHero;