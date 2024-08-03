'use client';
import { useState, useEffect } from "react";

import Image from "next/image";
import coreItInter from '@/assets/images/cit_inter.jpg'
import pythonEntry from '@/assets/images/python_entry.jpg'
import placeholder from '@/assets/images/placeholder.webp'

const IMAGEMAP = {
    'General IT - Entry': coreItInter,
    'Python Entry': pythonEntry,
}


export default function CoursePage({ params }) {

    const { id } = params;
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('')
    const bgimage = IMAGEMAP[title] || placeholder;

    useEffect(() => {
        async function fetchCourse() {
            try {
                const response = await fetch(`/api/courses?id=${id}`);
                if (!response.ok) {
                    throw new Error('Course not found');
                }
                const data = await response.json();
                setTitle(data.title)
                setCourse(data);
            } catch (error) {
                setError(error.message);
            }
        }
        fetchCourse();
    }, [id]);


    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <section className="relative bg-gradient-to-r from-blue-400 to-purple-500 p-2 lg:p-8 mt-[-76px]">
            <div className="flex flex-col items-center dark:bg-black bg-white shadow-lg rounded-lg p-6 lg:mt-16 mt-24 mb-12">
                <Image
                    src={bgimage}
                    alt={course.title}
                    className="w-90 lg:w-80 mb-4 rounded-lg"
                />
                <div className="">
                    {/* Course Title */}
                    <h4 className="text-lg font-semibold mb-2 text-center">
                        <i className="fa-solid fa-monument"></i> Course Title:
                    </h4>
                    <div className="text-4xl font-bold mb-4 text-center">
                        <p>
                            <span className="text-red-500">{course.title}</span>
                        </p>
                    </div>

                    <div className="flex justify-center mb-4 space-x-2">
                        <span className="bg-blue-500 text-white py-1 px-3 rounded-full text-sm font-semibold">
                            {course.level}
                        </span>
                        <span className="bg-gray-300 text-gray-800 py-1 px-3 rounded-full text-sm font-semibold">
                            {course.duration}
                        </span>
                    </div>

                    {/* Course Overview */}
                    <h4 className="text-lg font-semibold mb-2">
                        <i className="fa-regular fa-eye text-black"></i> Course Overview:
                    </h4>
                    <p className="mb-4">{course.overview}</p>

                    <ol className="list-decimal list-inside mb-4 space-y-4">
                        {course.topics.map((topic, index) => (
                            <li key={index}>
                                <h5 className="font-semibold">{topic.title}</h5>
                                <ul className="list-inside ml-6 space-y-2">
                                    {topic.details.map((detail, i) => (
                                        <li key={i}>{detail}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ol>

                    <h4 className="text-lg font-semibold mb-2">
                        <i className="fa-solid fa-computer"></i> Course Format and Structure:
                    </h4>
                    <p className="mb-4">{course.format}</p>

                    <h4 className="text-lg font-semibold mb-2">
                        <i className="fa-solid fa-book"></i> Course Materials and Resources:
                    </h4>
                    <p className="mb-4">{course.materials}</p>

                    <h4 className="text-lg font-semibold mb-2">
                        <i className="fa-solid fa-cubes-stacked"></i> Assessment and Grading:
                    </h4>
                    <p className="mb-4">{course.assessments}</p>

                    <h4 className="text-lg font-semibold mb-2">
                        <i className="fa-solid fa-hat-wizard"></i> Enrollment Information:
                    </h4>
                    <p className="mb-4">
                        To enroll in the course, please get in touch with me through either WhatsApp, Telegram, or Email
                        (buttons are <a href="#connect" className="text-blue-500 underline">below</a>).
                    </p>

                    {/* Instructor Information */}
                    <h4 className="text-lg font-semibold mb-2">
                        <i className="fa-solid fa-person-chalkboard"></i> Instructor Information:
                    </h4>
                    <div className="text-center mb-4">
                        <p>{course.instructor}</p>
                    </div>

                    <hr className="my-4" />

                    <p className="text-center text-uppercase font-bold mb-4">
                        Interested? <br />Contact me using:
                    </p>
                    <div id="connect" className="text-center space-x-4">
                        <a
                            href={`https://api.whatsapp.com/send?phone=+48573456169&text=I'm interested in ${course.title}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-500 hover:text-green-700"
                        >
                            <i className="fa-brands fa-whatsapp text-2xl"></i>
                        </a>
                        <a
                            href={`https://t.me/CrazyNutG`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700"
                        >
                            <i className="fa-brands fa-telegram text-2xl"></i>
                        </a>
                        <a
                            href={`mailto:kerimov.rustam@live.ru?subject=Course%20Info&body=I would like to ask questions about ${course.title}:`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-800 hover:text-gray-600"
                        >
                            <i className="fa-solid fa-envelope text-2xl"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
