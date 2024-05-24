'use client';
import React from 'react'

import HeroCarousel from '@/components/Hero/Carousel'
import HeroTabs from '@/components/Hero/Tabs';
import Courses from '@/components/Hero/Courses';


import { Typography } from '@material-tailwind/react';


const LWRHero = () => {
    return (
        <>
            <div className='text-center m-9 mt-20' style={{ textAlign: "-webkit-center" }}>
                <Typography variant="h8" className='uppercase text-lwr-dark-blue dark:text-white'>Online IT Classes</Typography>
                <Typography variant="h1" className='uppercase text-lwr-dark-blue dark:text-white font-bold'>
                    <span className='text-lwr-orange'>Join. </span>
                    Learn.
                    Connect.
                </Typography>
                <HeroCarousel />
                <HeroTabs />
            </div>
        </>
    )
}

export default LWRHero