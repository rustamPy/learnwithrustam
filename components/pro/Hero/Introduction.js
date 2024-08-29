import React from 'react';
import { Typography, Button } from '@material-tailwind/react';
import { FaPython, FaJs } from "react-icons/fa";
import { SiCplusplus } from "react-icons/si";
import Image from "next/image";
import Intro from "@/assets/images/_intro.png";

const Introduction = () => {
    return (
        <section className="rounded-xl mt-10 mb-20">
            <div className="items-center text-center">
                <Typography variant="h1" className="mb-2 py-6 text-4xl lg:text-6xl font-extrabold tracking-tight leading-none text-lwr-gray-color-500 md:text-5xl dark:text-white">
                    <span className="text-lwr-orange-color-100">Join.</span> Connect. Learn.
                </Typography>
                <Typography variant="small" className="mb-4 tracking-tight font-bold text-lwr-gray-color-500 dark:text-white">
                    Online Programming Classes
                </Typography>
                <Image src={Intro} width={900} height={900} className="mx-auto" alt="Introduction" priority />
            </div>

            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                <NewCourseAlert />
                <Description />
                <CTAButtons />
                <ProgrammingLanguages />
            </div>
        </section>
    );
};

const NewCourseAlert = () => (
    <a href="#" className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
        <span className="text-xs bg-lwr-blue-color-500 rounded-full text-white px-4 py-1.5 mr-3">New</span>
        <span className="text-sm font-medium">The course just came! See what's new</span>
        <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
        </svg>
    </a>
);

const Description = () => (
    <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-lwr-general-blue-light-theme-color-1 dark:text-lwr-general-gray-dark-theme-color-1">
        Our website provides comprehensive online IT classes designed for learners of all levels, from beginners to advanced professionals.
        With a wide range of topics, including data structures, programming, algorithms, and data science,
        the classes offer flexible learning tailored to your schedule and goals.
    </p>
);

const CTAButtons = () => (
    <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
        <Button color="blue" ripple="light" className="flex items-center justify-center">
            Learn more
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </Button>
        <Button color="gray" ripple="light" className="flex items-center justify-center">
            <svg className="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
            Watch video
        </Button>
    </div>
);

const ProgrammingLanguages = () => (
    <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
        <span className="font-semibold text-gray-400 uppercase">Classes are in</span>
        <div className="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
            {[
                { icon: FaPython, name: "Python" },
                { icon: FaJs, name: "JavaScript" },
                { icon: SiCplusplus, name: "C++" }
            ].map((lang, index) => (
                <a key={index} href="#" className="text-2xl mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
                    <Typography variant="h1" className="inline-flex items-center space-x-2">
                        <lang.icon />
                        <span className="text-2xl">{lang.name}</span>
                    </Typography>
                </a>
            ))}
        </div>
    </div>
);

export default Introduction;