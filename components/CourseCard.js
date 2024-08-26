'use client';
import React from 'react';
import { Typography, Card, CardHeader, CardBody, Button } from "@material-tailwind/react";
import Image from "next/image";
import { useSession } from 'next-auth/react';
import placeholder from '@/assets/images/placeholder.webp';
import { CheckCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";

import coreItEntry from '@/assets/images/courseThumbnails/cit_base.jpg';
import coreItInter from '@/assets/images/courseThumbnails/cit_inter.jpg';
import pythonEntry from '@/assets/images/courseThumbnails/python_entry.jpg';
import pythonInter from '@/assets/images/courseThumbnails/python_inter.jpg';
import pythonAdvanced from '@/assets/images/courseThumbnails/python_advanced.jpg';


const IMAGEMAP = {
    'Core IT - Entry': coreItEntry,
    'Core IT - Intermediate': coreItInter,
    'Python - Entry': pythonEntry,
    'Python - Intermediate': pythonInter,
    'Python - Advanced': pythonAdvanced
};

const COLOR_MAP = {
    'beginner': "bg-lwr-leetcode-easy-100",
    'medium': "bg-lwr-leetcode-medium-100",
    'hard': "bg-lwr-leetcode-hard-100",
}

const CourseCard = ({ id, title, desc, price, options, level = '' }) => {
    const bgimage = IMAGEMAP[title] || placeholder;
    const { data: session } = useSession();

    return (
        <Card
            key={id}
            variant="gradient"
            className="mt-4 flex flex-col mr-4 mb-4 bg-white dark:bg-gray-700 relative overflow-hidden w-full max-w-sm transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-1 shadow-lg hover:shadow-xl"
        >
            <div className={`absolute top-6 -right-14 ${COLOR_MAP[level]} text-white px-16 py-1 rotate-45 z-10 shadow-md`}>
                <Typography variant="small" className="font-semibold text-xs whitespace-nowrap">
                    {level.toLocaleUpperCase()}
                </Typography>
            </div>
            <CardHeader floated={false} className="aspect-square">
                <Image
                    src={bgimage}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className="absolute top-0 left-0 w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-105"
                />
                <div className="absolute inset-0 bg-black opacity-10 hover:opacity-0 transition-opacity duration-300"></div>
            </CardHeader>
            <CardBody className="flex flex-col flex-grow p-4 bg-gradient-to-b from-white to-gray-100 dark:from-gray-700 dark:to-gray-800">
                <div className="flex-grow">
                    <Typography variant="h6" className="mb-2 text-gray-800 dark:text-gray-300 text-lg sm:text-xl">
                        {title}
                    </Typography>
                    <Typography className="font-normal mb-4 text-gray-600 dark:text-gray-100 text-sm sm:text-base">
                        {desc}
                    </Typography>
                </div>

                <div className="mt-auto">
                    <Typography variant="h5" className="flex items-center gap-1 mb-4 text-lwr-orange-color-100 text-xl sm:text-2xl">
                        {price[0]}{price[1]}
                        <Typography as="span" variant="small" className="text-gray-800 dark:text-gray-100 text-sm sm:text-base">
                            /{price[2]}
                        </Typography>
                    </Typography>
                    <ul className="space-y-2 mb-6">
                        {options.plus.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm sm:text-base">
                                <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-1" />
                                <Typography variant="h6" className='text-gray-800 dark:text-gray-100'>{feature}</Typography>
                            </li>
                        ))}
                        {options.minus.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm sm:text-base text-gray-500">
                                <MinusCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mr-1" />
                                <Typography variant="h6" className='text-gray-800 dark:text-gray-100'>{feature}</Typography>
                            </li>
                        ))}
                    </ul>
                    <Button
                        color="blue"
                        fullWidth
                        disabled={!session}
                        onClick={() => {
                            if (session) {
                                window.location.href = `/course/${id}`;
                            }
                        }}
                        className="text-sm sm:text-base py-2 sm:py-3 transform transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-md"
                    >
                        {session ? "View Details" : "For Authorized Users Only"}
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
};

export default CourseCard;