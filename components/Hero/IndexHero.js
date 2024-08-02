'use client';
import React from 'react'

import HeroCarousel from '@/components/Hero/Carousel'
import SearchWindow from '@/components/Hero/SearchWindow';

import { Typography } from '@material-tailwind/react';

const IndexHero = () => {
    return (
        <>
            <div className='text-center m-9 mt-20'>

                {/* Header of the page */}
                <Typography variant="h6" className='uppercase text-lwr-dark-blue dark:text-white'>Online IT Classes</Typography>
                <Typography variant="h1" className='uppercase text-lwr-dark-blue dark:text-white font-bold'>
                    <span className='text-lwr-orange-100'>Join. </span>
                    Connect.
                    Learn.
                </Typography>

                {/* Hero Carousel is carousel of images with admin */}
                <HeroCarousel />

                {/* Search Window is search engine to find the appropriate course */}
                <SearchWindow />
            </div>
        </>
    )
}

export default IndexHero;