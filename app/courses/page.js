'use client';

import React, { useEffect, useState } from 'react';
import { Typography } from '@material-tailwind/react';
import CoursesGrid from '@/components/CoursesGrid';
import Construction from '@/components/Construction'

const Courses = () => {

    return (
        <div className="flex flex-col p-6 items-center lg:mr-24 lg:ml-24 relative">
            {/* Overlay to enforce the blur and show "Under Construction" */}

            <Construction />
            <img src='imgs/courses_1.png' width={'200px'} />
            <Typography variant="h5" textGradient className='mb-4 text-lwr-orange-color-100'>
                Available Courses
            </Typography>
            <CoursesGrid />
        </div>
    );
}

export default Courses;
