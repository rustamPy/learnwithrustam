import React from "react";

import { Typography } from '@material-tailwind/react';
import { FaPython, FaJs } from "react-icons/fa";
import { SiCplusplus } from "react-icons/si";

import Image from "next/image";
import Intro from "@/assets/images/_intro.png"

const Introduction = () => {
    return (
        <section className="rounded-xl mt-10">
            <div className="items-center text-center">
                <Typography
                    variant="h1"
                    className="mb-2 py-6 text-4xl lg:text-6xl font-extrabold tracking-tight leading-none text-lwr-gray-color-500 md:text-5xl dark:text-white"
                >
                    <span className="text-lwr-orange-color-100">Join.</span> Connect. Learn.
                </Typography>
                <Typography
                    variant="small"
                    className="mb-4 tracking-tight font-bold text-lwr-gray-color-500 dark:text-white"
                >
                    Online Programming Classes
                </Typography>
                <Image src={Intro} width={900} height={900} className="mx-auto" />
            </div>


            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                <a href="#" className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
                    <span className="text-xs bg-lwr-blue-color-500 rounded-full text-white px-4 py-1.5 mr-3">New</span> <span className="text-sm font-medium">The course just came! See what's new</span>
                    <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                </a>

                <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                    Our website provides comprehensive online IT classes designed for learners of all levels, from beginners to advanced professionals.
                    With a wide range of topics, including data structures, programmming, algorithms and data science,
                    our classes offer flexible learning tailored to your schedule and goals.
                </p>
                <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                        Learn more
                        <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </a>
                    <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        <svg className="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                        Watch video
                    </a>
                </div>
                <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
                    <span className="font-semibold text-gray-400 uppercase">Classes are in</span>
                    <div className="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
                        <a href="#" className="text-2xl mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
                            <Typography variant="h1" className="inline-flex items-center space-x-2">
                                <FaPython />
                                <span className="text-2xl">Python</span>
                            </Typography>
                        </a>
                        <a href="#" className="text-2xl mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
                            <Typography variant="h1" className="inline-flex items-center space-x-2">
                                <FaJs />
                                <span className="text-2xl">JavaScript</span>
                            </Typography>
                        </a>
                        <a href="#" className="text-2xl mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
                            <Typography variant="h1" className="inline-flex items-center space-x-2">
                                <SiCplusplus />
                                <span className="text-2xl">C++</span>
                            </Typography>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Introduction;