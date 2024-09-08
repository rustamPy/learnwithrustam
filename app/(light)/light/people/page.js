'use client';
import Image from 'next/image';
import TeymurFront from './teymur/teymur.jpg';
import SalmanFront from './salman/salman.jpg';
import { Typography } from '@material-tailwind/react';

const people = [

    {
        name: "Salman Abdullayev",
        role: "iOS Developer",
        imageSrc: SalmanFront,
        profileUrl: "/light/people/salman"
    },
    {
        name: "Teymur Abdullayev",
        role: "Chess Player",
        imageSrc: TeymurFront,
        profileUrl: "/light/people/teymur"
    },
];

const PeopleListPanel = () => {
    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg mt-8 mb-8">
            <Typography className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
                Gentlemen's
                <span className="px-2 py-1 relative inline-block">
                    <svg className="stroke-current bottom-0 absolute text-blue-300 -translate-x-1 -translate-y-1" viewBox="0 0 410 18" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 6.4c16.8 16.8 380.8-11.2 397.6 5.602" strokeWidth="12" fill="none" fillRule="evenodd" strokeLinecap="round"></path>
                    </svg>
                    <span className="relative">Quarterly</span>
                </span>
            </Typography>
            <div className="space-y-4">
                {people.map((person, index) => (
                    <a
                        key={index}
                        href={person.profileUrl}
                        className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 ease-in-out"
                    >
                        <div className="relative w-16 h-16 flex-shrink-0">
                            <Image
                                src={person.imageSrc}
                                alt={person.name}
                                width={0}
                                height={0}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full"
                            />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-xl font-semibold text-gray-800">{person.name}</h3>
                            <p className="text-gray-600">{person.role}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default PeopleListPanel;
