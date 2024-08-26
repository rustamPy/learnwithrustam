'use client';
import React from 'react';
import { Typography, Card, CardHeader, CardBody, Button } from "@material-tailwind/react";
import Image from "next/image";
import { useSession } from 'next-auth/react';
import placeholder from '@/assets/images/placeholder.webp';
import { CheckCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";

import coreItInter from '@/assets/images/cit_inter.jpg';
import pythonEntry from '@/assets/images/python_entry.jpg';

const IMAGEMAP = {
    'General IT - Entry': coreItInter,
    'Python Entry': pythonEntry,
};

const CourseCard = ({ id, title, desc, price, options, size }) => {
    const SIZE_MAP = {
        'sm': 'w-64',
        'md': 'w-80',
        'lg': 'w-96',
    };
    const bgimage = IMAGEMAP[title] || placeholder;
    const { data: session } = useSession();

    return (
        <Card key={id} variant="gradient" className={`mt-4 flex flex-col ${SIZE_MAP[size]} mr-4 mb-4 bg-white dark:bg-gray-700`}>
            <CardHeader floated={false} className="aspect-square">
                <Image
                    src={bgimage}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className="absolute top-0 left-0 w-full h-full"
                />
            </CardHeader>
            <CardBody className="flex flex-col flex-grow p-4">
                <div className="flex-grow">
                    <Typography variant="h6" className="mb-2 text-gray-800 dark:text-gray-300">
                        {title}
                    </Typography>
                    <Typography className="font-normal mb-4 text-gray-600 dark:text-gray-100">
                        {desc}
                    </Typography>
                </div>

                <div className="mt-auto">
                    <Typography variant="h5" className="flex items-center gap-1 mb-4 text-lwr-orange-color-100">
                        {price[0]}{price[1]}
                        <Typography as="span" variant="small" className="text-gray-800 dark:text-gray-100">
                            /{price[2]}
                        </Typography>
                    </Typography>
                    <ul className="space-y-2 mb-6">
                        {options.plus.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm">
                                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1" />
                                <Typography variant="h6" className='text-gray-800 dark:text-gray-100'>{feature}</Typography>
                            </li>
                        ))}
                        {options.minus.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-500">
                                <MinusCircleIcon className="h-4 w-4 text-red-500 mr-1" />
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
                    >
                        {session ? "View Details" : "For Authorized Users Only"}
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
};

export default CourseCard;