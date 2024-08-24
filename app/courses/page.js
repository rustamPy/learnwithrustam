'use client';

import React, { useState } from 'react';
import { Typography } from '@material-tailwind/react';
import CoursesGrid from '@/components/CoursesGrid';
import Construction from '@/components/Construction';

const Courses = () => {
    const [construction, setConstruction] = useState(true);

    return (
        <div className="flex flex-col items-center lg:mr-24 lg:ml-24 relative">
            {construction ? (
                <Construction />
            ) : (
                <>
                    {/* Overlay to enforce the blur and show "Under Construction" */}
                        <img src='/imgs/courses_1.png' width='200px' alt='Courses Banner' />
                        <Typography variant="h5" textGradient className='mb-4 text-lwr-orange-color-100'>
                            Available Courses
                        </Typography>
                        <CoursesGrid />
                </>
            )}
        </div>
    );
};

export default Courses;
