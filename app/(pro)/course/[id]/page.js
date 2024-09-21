'use client';
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Head from 'next/head';
import SignInWindow from "@/components/pro/SignInWindow";
import { Typography, Button, Accordion, AccordionHeader, AccordionBody, Chip, Spinner } from "@material-tailwind/react";

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
    'Python - Advanced': pythonAdvanced,
};

function CourseContent({ course }) {
    return (
        <div className="lg:w-2/3">
            <Section title="Course Overview">
                <p className="text-gray-700 dark:text-gray-300">{course.overview}</p>
            </Section>
            <Section title="Course Contents">
                <Accordion>
                    {course.contents.map((content, index) => (
                        <AccordionItem key={index} title={content.title} details={content.details} />
                    ))}
                </Accordion>
            </Section>
        </div>
    );
}

function Section({ title, children }) {
    return (
        <section className="mb-8">
            <Typography variant="h4" color="blue" className="mb-4">{title}</Typography>
            {children}
        </section>
    );
}

function AccordionItem({ title, details }) {
    const [open, setOpen] = useState(false);
    return (
        <Accordion open={open} className="mb-2">
            <AccordionHeader onClick={() => setOpen(!open)} className="py-4">
                {title}
            </AccordionHeader>
            <AccordionBody>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                    {details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                    ))}
                </ul>
            </AccordionBody>
        </Accordion>
    );
}

function ErrorDisplay({ error }) {
    return (
        <div className="flex flex-col text-center items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <img src="/imgs/not_found_1.png" alt="not_found_1" width={200} />
            <Typography variant="h1" color="red" textGradient={true}>
                {error}
            </Typography>
        </div>
    );
}

function LoadingDisplay() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <Spinner color="amber" className="h-16 w-16 text-blue-500" />
        </div>
    );
}

const CoursePage = ({ params }) => {
    const { data: session } = useSession();
    const { id } = params;
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);

    const fetchCourse = useCallback(async () => {
        try {
            const response = await fetch(`/api/courses?id=${id}`);
            if (!response.ok) {
                throw new Error(`Course/${id} not found`);
            }
            const data = await response.json();
            setCourse(data);
        } catch (error) {
            setError(error.message);
        }
    }, [id]);

    useEffect(() => {
        fetchCourse();
    }, [fetchCourse]);

    if (error) return <ErrorDisplay error={error} />;
    if (!course) return <LoadingDisplay />;

    return (
        <>
            <Head>
                <title>{course.title} | Course Details</title>
                <meta name="description" content={course.overview} />
            </Head>
            {params.status && session ? (
                <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white p-6">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-1/3">
                            <Image
                                src={IMAGEMAP[course.title] || '/imgs/placeholder.jpg'}
                                alt={course.title}
                                width={300}
                                height={200}
                                className="rounded-lg mb-4"
                            />
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                                <Typography variant="h6" color="blue" className="mb-2">Course Details</Typography>
                                <p><strong>Level:</strong> {course.level}</p>
                                <p><strong>Duration:</strong> {course.duration}</p>
                                <p><strong>Instructor:</strong> {course.instructor}</p>
                            </div>
                        </div>
                        <CourseContent course={course} />
                    </div>
                </div>
            ) : (
                    <SignInWindow
                        message={"The course details are not available for non-authorized users, please, sign-in first!"}
                    image_path={'/imgs/login_2.png'}
                    width={"150px"}
                />
            )}
        </>
    );
}

export default CoursePage;