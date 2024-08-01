'use client';
import React, { useState } from 'react';


import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";

import Image, { StaticImageData } from "next/image";
import coreItInter from '@/assets/images/cit_inter.jpg'
import pythonEntry from '@/assets/images/python_entry.jpg'
import placeholder from '@/assets/images/placeholder.webp'


import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { MinusCircleIcon } from "@heroicons/react/24/outline";


import coursesData from '@/public/courses.json'

import { useSession } from 'next-auth/react';


const IMAGEMAP = {
    'General IT - Entry': coreItInter,
    'Python Entry': pythonEntry,
}

const SearchWindow = () => {
    const [filteredCourses, setFilteredCourses] = useState([]);

    const handleSearch = ({ query, courseType }) => {
        let filtered = coursesData;

        if (courseType !== 'all') {
            filtered = filtered.filter(course => course.level === courseType);
        }

        if (query) {
            const lowercasedQuery = query.toLowerCase();
            filtered = filtered.filter(course =>
                course.title.toLowerCase().includes(lowercasedQuery) ||
                course.desc.toLowerCase().includes(lowercasedQuery)
            );
        }

        if (!query && courseType === 'all') {
            setFilteredCourses([]);
        } else {
            setFilteredCourses(filtered);
        }
    };

    return (
        <section className="bg-lwr-dark-blue dark:bg-black py-20 mb-4 mt-10 br-10 rounded-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
                        Find Your Perfect Course
                    </h1>
                    <p className="my-4 text-xl text-white">
                        Discover the perfect course that suits your needs.
                    </p>
                </div>
                <SearchFunc onSearch={handleSearch} />
                <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mt-10">
                    {filteredCourses.map(course => (
                        <CourseCard
                            key={course.id}
                            id={course.id}
                            title={course.title}
                            desc={course.desc}
                            price={course.price}
                            options={course.options}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}


const SearchFunc = ({ onSearch }) => {
    const [courseType, setCourseType] = useState('all');
    const [query, setQuery] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch({ query, courseType });
    };

    return (
        <>
            <form
                className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center"
                onSubmit={handleSubmit}
            >
                <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
                    <label htmlFor="course" className="sr-only">Location</label>
                    <input
                        type="text"
                        id="course"
                        placeholder="Type here"
                        className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
                        value={query}
                        onChange={e => setQuery(e.target.value)}

                    />
                </div>
                <div className="w-full md:w-2/5 md:pl-2">
                    <label htmlFor="course-type" className="sr-only">Course Type</label>
                    <select
                        id="course-type"
                        className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
                        value={courseType}
                        onChange={(e) => setCourseType(e.target.value)}
                    >

                        <option value="all">All</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-lwr-orange-100 hover:bg-lwr-orange-200 md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white focus:outline-none focus:ring focus:ring-blue-500"
                >
                    Search
                </button>
            </form>
        </>
    )
}

const CourseCard = async ({ id, title, desc, price, options }) => {
    const bgimage = IMAGEMAP[title] || placeholder;
    const { data: session } = useSession();
    return (
        <Card key={id} variant="gradient" color="white">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="!m-0 inset-0 h-full w-full p-6"
            >
                <div className="absolute inset-0 m-0 h-full w-full"></div>
                <div className="relative">
                    <Image src={bgimage} style={{ borderRadius: 10 }} className="mb-3" alt='non' />
                    <Typography
                        variant="h6"
                        color="blue-gray"
                        className="capitalize font-bold mb-1"
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="small"
                        className="font-normal !text-gray-500"
                    >
                        {desc}
                    </Typography>
                    <Typography
                        variant="h3"
                        color="blue-gray"
                        className="!mt-4 flex gap-1 !text-4xl"
                    >
                        {price[0]}
                        {price[1]}
                        <Typography
                            as="span"
                            color="blue-gray"
                            className="-translate-y-0.5 self-end opacity-70 text-lg font-bold"
                        >
                            /{price[2]}
                        </Typography>
                    </Typography>
                </div>
            </CardHeader>
            <CardBody className="pt-0">
                <ul className="flex flex-col gap-3 mb-6">

                    {options.plus.map((g, kp) => (
                        <li
                            key={kp}
                            className="flex items-center gap-3 text-gray-700">
                            <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />
                            <Typography
                                variant="small"
                                className="font-normal text-inherit"
                            >
                                {g}
                            </Typography>
                        </li>
                    ))}

                    {options.minus.map((m, km) => (
                        <li
                            key={km}
                            className="flex items-center gap-3 text-gray-700">

                            <MinusCircleIcon
                                strokeWidth={2.5}
                                className="h-5 w-5 text-blue-gray-900"
                            />
                            <Typography
                                variant="small"
                                className="font-normal text-inherit"
                            >
                                {m}
                            </Typography>
                        </li>
                    ))}
                </ul>
                {session ?
                    <a href={`/course/${id}`}>

                        <Button fullWidth variant="gradient" color="gray">
                            Details
                        </Button> </a>
                    :

                    <Button fullWidth variant="gradient" color="gray" disabled>
                        For Authorized Users Only
                    </Button>
                }
            </CardBody>
        </Card>

    );
}

export default SearchWindow;