'use client';
import React from 'react';
import { Typography, Card, CardHeader, CardBody, Button } from "@material-tailwind/react";
import Image from "next/image";
import { useSession } from 'next-auth/react';

import placeholder from '@/assets/images/placeholder.webp';
import coreItEntry from '@/assets/images/courseThumbnails/cit_base.jpg';
import coreItInter from '@/assets/images/courseThumbnails/cit_inter.jpg';
import pythonEntry from '@/assets/images/courseThumbnails/python_entry.jpg';
import pythonInter from '@/assets/images/courseThumbnails/python_inter.jpg';
import pythonAdvanced from '@/assets/images/courseThumbnails/python_advanced.jpg';
import { CheckCircleIcon, MinusCircleIcon, BookmarkIcon } from "@heroicons/react/24/solid";



const IMAGEMAP = {
    'Core IT - Entry': coreItEntry,
    'Core IT - Intermediate': coreItInter,
    'Python - Entry': pythonEntry,
    'Python - Intermediate': pythonInter,
    'Python - Advanced': pythonAdvanced
};

const COLOR_MAP = {
    'beginner': "bg-lwr-wecode-easy-100",
    'medium': "bg-lwr-wecode-medium-100",
    'hard': "bg-lwr-wecode-hard-100",
}

const CourseCard = ({ id, title, desc, price, options, level = '', onToggleSave, isSaved }) => {
    const bgimage = IMAGEMAP[title] || placeholder;
    const { data: session } = useSession();

    return (
        <Card
            key={id}
            className="mt-4 flex flex-col mr-4 mb-4 bg-white dark:bg-gray-700 relative overflow-hidden w-full h-[540px] transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-1 shadow-lg hover:shadow-xl"
        >
            <div className={`absolute top-6 -right-14 ${COLOR_MAP[level]} text-white px-16 py-1 rotate-45 z-10 shadow-md`}>
                <Typography variant="small" className="font-semibold text-xs whitespace-nowrap">
                    {level.toLocaleUpperCase()}
                </Typography>
            </div>
            <CardHeader floated={false} className="h-48 relative">
                <Image
                    src={bgimage}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 ease-in-out transform hover:scale-105"
                />
                <div className="absolute inset-0 bg-black opacity-10 hover:opacity-0 transition-opacity duration-300"></div>
                <Button
                    color={isSaved ? "red" : "green"}
                    size="sm"
                    className="absolute top-2 left-2 p-2 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-110"
                    onClick={() => onToggleSave(id)}
                >
                    <BookmarkIcon className="h-5 w-5" />
                </Button>
            </CardHeader>
            <CardBody className="flex flex-col flex-grow p-4 bg-gradient-to-b from-white to-gray-100 dark:from-gray-700 dark:to-gray-800">
                <div className="flex-grow">
                    <Typography variant="h6" className="mb-2 text-gray-800 dark:text-gray-300 text-lg">
                        {title}
                    </Typography>
                    <Typography className="font-normal mb-4 text-gray-600 dark:text-gray-100 text-sm line-clamp-3">
                        {desc}
                    </Typography>
                </div>

                <div className="mt-auto">
                    <Typography variant="h5" className="flex items-center gap-1 mb-4 text-lwr-orange-color-100 text-xl">
                        {price[0]}{price[1]}
                        <Typography as="span" variant="small" className="text-gray-800 dark:text-gray-100 text-sm">
                            /{price[2]}
                        </Typography>
                    </Typography>
                    <ul className="space-y-2 mb-6">
                        {options.plus.slice(0, 2).map((feature, index) => (
                            <li key={index} className="flex items-center text-sm">
                                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1" />
                                <Typography variant="small" className='text-gray-800 dark:text-gray-100'>{feature}</Typography>
                            </li>
                        ))}
                        {options.minus.slice(0, 1).map((feature, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-500">
                                <MinusCircleIcon className="h-4 w-4 text-red-500 mr-1" />
                                <Typography variant="small" className='text-gray-800 dark:text-gray-100'>{feature}</Typography>
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
                        className="text-sm py-2 transform transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-md"
                    >
                        {session ? "View Details" : "For Authorized Users Only"}
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
};

export const ListCardView = ({
    id,
    title,
    desc,
    price,
    options,
    level = '',
    onToggleSave,
    isSaved,
    category,
    duration,
    format,
    instructor,
    materials,
    assessments,
    overview
}) => {
    const bgimage = IMAGEMAP[title] || placeholder;
    const { data: session } = useSession();

    return (
        <Card className="mt-4 flex flex-col w-full max-w-3xl">
            <div className={`absolute top-6 -right-14 ${COLOR_MAP[level]} text-white px-16 py-1 rotate-45 z-10 shadow-md`}>
                <Typography variant="small" className="font-semibold text-xs whitespace-nowrap">
                    {level.toLocaleUpperCase()}
                </Typography>
            </div>
            <CardHeader floated={false} className="h-64 relative">
                <Image
                    src={bgimage}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 ease-in-out transform hover:scale-105"
                />
                <div className="absolute inset-0 bg-black opacity-10 hover:opacity-0 transition-opacity duration-300"></div>
                <Button
                    color={isSaved ? "red" : "green"}
                    size="sm"
                    className="absolute top-2 left-2 p-2 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-110"
                    onClick={() => onToggleSave(id)}
                >
                    <BookmarkIcon className="h-5 w-5" />
                </Button>
            </CardHeader>
            <CardBody className="flex flex-col flex-grow p-6 bg-gradient-to-b from-white to-gray-100 dark:from-gray-700 dark:to-gray-800">
                <Typography variant="h5" className="mb-2 text-gray-800 dark:text-gray-300">
                    {title}
                </Typography>
                <Typography className="font-normal mb-4 text-gray-600 dark:text-gray-100 text-sm">
                    {overview || desc}
                </Typography>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <Typography variant="h6" className="text-gray-800 dark:text-gray-300">Category</Typography>
                        <Typography className="text-gray-600 dark:text-gray-100">{category}</Typography>
                    </div>
                    <div>
                        <Typography variant="h6" className="text-gray-800 dark:text-gray-300">Duration</Typography>
                        <Typography className="text-gray-600 dark:text-gray-100">{duration[0]} {duration[1]}</Typography>
                    </div>
                    <div>
                        <Typography variant="h6" className="text-gray-800 dark:text-gray-300">Instructor</Typography>
                        <Typography className="text-gray-600 dark:text-gray-100">{instructor}</Typography>
                    </div>
                    <div>
                        <Typography variant="h6" className="text-gray-800 dark:text-gray-300">Price</Typography>
                        <Typography className="text-lwr-orange-color-100">
                            {price[0]}{price[1]}/{price[2]}
                        </Typography>
                    </div>
                </div>

                <Typography variant="h6" className="mb-2 text-gray-800 dark:text-gray-300">Format</Typography>
                <Typography className="font-normal mb-4 text-gray-600 dark:text-gray-100 text-sm">
                    {format}
                </Typography>

                <Typography variant="h6" className="mb-2 text-gray-800 dark:text-gray-300">Materials</Typography>
                <Typography className="font-normal mb-4 text-gray-600 dark:text-gray-100 text-sm">
                    {materials}
                </Typography>

                <Typography variant="h6" className="mb-2 text-gray-800 dark:text-gray-300">Assessments</Typography>
                <Typography className="font-normal mb-4 text-gray-600 dark:text-gray-100 text-sm">
                    {assessments}
                </Typography>

                <Typography variant="h6" className="mb-2 text-gray-800 dark:text-gray-300">Course Features</Typography>
                <ul className="space-y-2 mb-6">
                    {options.plus.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                            <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1" />
                            <Typography variant="small" className='text-gray-800 dark:text-gray-100'>{feature}</Typography>
                        </li>
                    ))}
                    {options.minus.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-500">
                            <MinusCircleIcon className="h-4 w-4 text-red-500 mr-1" />
                            <Typography variant="small" className='text-gray-800 dark:text-gray-100'>{feature}</Typography>
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
                    className="text-sm py-2 transform transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-md"
                >
                    {session ? "View Details" : "For Authorized Users Only"}
                </Button>
            </CardBody>
        </Card>
    )
}

export default CourseCard;