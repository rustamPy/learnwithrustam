'use client';
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Head from 'next/head';
import SignInWindow from "@/components/SignInWindow";
import { Typography, Button, Accordion, AccordionHeader, AccordionBody, Chip, Spinner } from "@material-tailwind/react";
import { motion } from "framer-motion";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { twilight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const pythonAdvancedCode = `
def advanced_sort(data):
    return sorted(data, key=lambda x: (-x['priority'], x['name']))

data = [
    {'name': 'Task1', 'priority': 3},
    {'name': 'Task2', 'priority': 1},
    {'name': 'Task3', 'priority': 2},
]
sorted_data = advanced_sort(data)
print(sorted_data)
`;


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


function HeroSection({ course }) {
    const [isHovered, setIsHovered] = useState(false);
    const bgImage = IMAGEMAP[course.title] || '/imgs/placeholder.jpg';
    const [mainTitle, subTitle] = course.title.split(' - ');

    const scrollToDetails = useCallback(() => {
        const detailsSection = document.getElementById('course-details');
        if (detailsSection) {
            const targetPosition = detailsSection.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: targetPosition - 100,
                behavior: 'smooth'
            });
        }
    }, []);

    return (
        <div className="relative h-screen bg-cover bg-center dark:bg-gray-900" style={{ backgroundImage: `url(${bgImage.src})` }}>
            <div className="absolute inset-0 bg-white dark:bg-black bg-opacity-85 dark:bg-opacity-80 flex items-center justify-center">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Typography className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                            {mainTitle}
                            <span className="px-2 py-1 relative inline-block">
                                <svg className="stroke-current bottom-0 absolute text-blue-300 -translate-x-2" viewBox="0 0 410 18" xmlns="http://www.w3.org/2000/svg">
                                    <motion.path
                                        d="M6 6.4c16.8 16.8 380.8-11.2 397.6 5.602"
                                        strokeWidth="12"
                                        fill="none"
                                        fillRule="evenodd"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                    />
                                </svg>
                                <motion.span
                                    className="relative"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    animate={{
                                        scale: isHovered ? 1.1 : 1,
                                        color: isHovered ? "#f49446ff" : "currentColor"
                                    }}
                                >
                                    {subTitle}
                                </motion.span>
                            </span>
                        </Typography>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Typography className="mt-6 font-bold text-xl text-gray-800 dark:text-gray-200">
                            Master {course.title} with our comprehensive course
                        </Typography>
                    </motion.div>
                    <motion.div
                        className="mt-8"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Button size="lg" ripple="light" className="mr-4 bg-lwr-general-blue-light-theme-color-1 dark:bg-lwr-general-gray-dark-theme-color-1 text-gray-200 dark:text-gray-800" onClick={() => alert('TEST')}>
                            Register
                        </Button>
                        <Button color="blue" size="lg" ripple="light" variant="outlined" className="dark:border-lwr-general-gray-dark-theme-color-1 text-gray-800 dark:text-gray-200" onClick={scrollToDetails}>
                            Preview Course
                        </Button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function Sidebar({ course }) {
    return (
        <div className="lg:w-1/3 top-24">
            <Image src={IMAGEMAP[course.title] || '/imgs/placeholder.jpg'} alt={course.title} width={300} height={200} className="rounded-lg mb-4" />
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <Typography variant="h6" color="blue" className="mb-2">Course Details</Typography>
                <CourseDetail label="Level" value={course.level} valueClass="bg-blue-100 text-blue-800 dark:bg-blue-500 dark:text-white" />
                <CourseDetail label="Duration" value={course.duration} valueClass="bg-green-100 text-green-800 dark:bg-green-500 dark:text-white" />
                <p><strong>Instructor:</strong> {course.instructor}</p>
            </div>
        </div>
    );
}

function CourseDetail({ label, value, valueClass }) {
    return (
        <div className="flex justify-between mb-2">
            <span className="font-bold">{label}:</span>
            <Chip value={value} className={`rounded-full ${valueClass}`} />
        </div>
    );
}

function CourseContent({ course }) {
    return (
        <div className="lg:w-2/3">
            <Section title="Course Overview">
                <p className="text-gray-700 dark:text-gray-300">{course.overview}</p>
                {course.title === 'Python - Advanced' && (
                    <div className="mt-4">
                        <Typography variant="h6" color="blue" className="mb-2">Sample Code</Typography>
                        <SyntaxHighlighter language="python" style={twilight} >
                            {pythonAdvancedCode}
                        </SyntaxHighlighter>
                    </div>
                )}
            </Section>
            <Section title="Course Contents">
                <Accordion>
                    {course.contents.map((content, index) => (
                        <AccordionItem key={index} title={content.title} details={content.details} />
                    ))}
                </Accordion>
            </Section>
            <Section title="Course Format and Structure">
                <p className="text-gray-700 dark:text-gray-300">{course.format}</p>
            </Section>
            <Section title="Course Materials and Resources">
                <p className="text-gray-700 dark:text-gray-300">{course.materials}</p>
            </Section>
            <Section title="Assessment and Grading">
                <p className="text-gray-700 dark:text-gray-300">{course.assessments}</p>
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

function FloatingEnrollButton() {
    return (
        <Button color="blue" className="fixed bottom-20 right-4 z-10" onClick={() => alert('Enrollment process initiated!')}>
            Enroll Now
        </Button>
    );
}

function RelatedCourses() {
    return (
        <section className="bg-gray-100 dark:bg-gray-800 py-12">
            <div className="container mx-auto">
                <Typography variant="h4" color="blue" className="mb-8 text-center">Related Courses</Typography>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <RelatedCourse title="Related Course 1" />
                    <RelatedCourse title="Related Course 2" />
                    <RelatedCourse title="Related Course 3" />
                </div>
            </div>
        </section>
    );
}

function RelatedCourse({ title }) {
    return (
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            {title}
        </div>
    );
}

function FAQSection() {
    const faqs = [
        { question: "How long do I have access to the course?", answer: "You have lifetime access to the course materials." },
        { question: "Is there a money-back guarantee?", answer: "Yes, we offer a 30-day money-back guarantee." },
        { question: "How do I get help if I'm stuck?", answer: "We provide support through our community forum and weekly Q&A sessions." },
    ];

    return (
        <section className="py-12">
            <div className="container mx-auto">
                <Typography variant="h4" color="blue" className="mb-8 text-center">Frequently Asked Questions</Typography>
                <Accordion>
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} title={faq.question} details={[faq.answer]} />
                    ))}
                </Accordion>
            </div>
        </section>
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
    const [scrollProgress, setScrollProgress] = useState(0);

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

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            setScrollProgress(scrollPercent);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [fetchCourse]);

    if (error) return <ErrorDisplay error={error} />;
    if (!course) return <LoadingDisplay />;

    return (
        <>
            <Head>
                <title>{course.title} | Course Details</title>
                <meta name="description" content={course.overview} />
            </Head>
            {!session ? (
                <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
                    <div
                        className="fixed top-0 left-0 w-full h-2 bg-lwr-general-blue-light-theme-color-1 dark:bg-lwr-orange-color-200 z-50"
                        style={{ width: `${scrollProgress}%` }}
                    />
                    <HeroSection course={course} />
                    <main className="container mx-auto mt-24 px-4 py-8" id="course-details">
                        <div className="flex flex-col lg:flex-row gap-8">
                            <Sidebar course={course} />
                            <CourseContent course={course} />
                        </div>
                    </main>
                    <FloatingEnrollButton />
                    <RelatedCourses />
                    <FAQSection />
                </div>
            ) : (
                <SignInWindow message={"The course details are not available for non-authorized users, please, sign-in first!"}
                    image_path={'/imgs/login_2.png'}
                    width={"150px"} />)}
        </>
    );
}


export default CoursePage;