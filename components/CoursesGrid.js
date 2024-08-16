'use client';
import React, { useState, useEffect } from 'react';
import { CourseCard } from '@/components/Hero/SearchWindow';
import { useSession } from 'next-auth/react';
import courses from '@/public/courses.json';

const CoursesGrid = ({ specificCourses, cardsPerPage = 4 }) => {
    const { data: session, update } = useSession();
    const coursesPerPage = cardsPerPage;
    const [currentPage, setCurrentPage] = useState(1);
    const [userCourses, setUserCourses] = useState([]);

    useEffect(() => {
        if (session?.user?.courses) {
            setUserCourses(session.user.courses);
        }
    }, [session]);

    // Calculate total number of pages

    let totalPages = 0;
    if (!specificCourses) {
        totalPages = Math.ceil(courses.length / coursesPerPage);
    } else {
        totalPages = Math.ceil(specificCourses.length / coursesPerPage);
    }


    // Calculate the courses to display on the current page
    const startIndex = (currentPage - 1) * coursesPerPage;
    let currentCourses = undefined;
    if (!specificCourses) {
        currentCourses = courses.slice(startIndex, startIndex + coursesPerPage);
    } else {
        currentCourses = specificCourses.slice(startIndex, startIndex + coursesPerPage);;
    }


    // Handler to go to a specific page
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handler for next and previous buttons
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Function to handle adding or removing a course
    const toggleCourse = async (courseId) => {
        let updatedCourses;
        if (userCourses) {
            if (userCourses.includes(courseId)) {
                // Remove course
                updatedCourses = userCourses.filter(id => id !== courseId);
            } else {
                // Add course
                updatedCourses = [...userCourses, courseId];
            }

            try {
                const response = await fetch('/api/user/profile', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ courses: updatedCourses }),
                });

                if (!response.ok) {
                    throw new Error('Failed to update courses');
                }

                setUserCourses(updatedCourses);
                await update();

            } catch (error) {
                console.error('Error updating courses:', error);
            }
        }
    };

    // Generate the pagination numbers with ellipses
    const getPaginationNumbers = () => {
        const pages = [];
        const maxPageNumbersToShow = 5;
        const sidePages = 2; // Number of pages to show on each side of the current page

        if (totalPages <= maxPageNumbersToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= sidePages + 1) {
                // Near the start
                for (let i = 1; i <= sidePages + 2; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - sidePages) {
                // Near the end
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - sidePages - 1; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // Somewhere in the middle
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const paginationNumbers = getPaginationNumbers();

    return (
        <div className="flex flex-col p-6 items-center">
            <div className={`grid grid-cols-${cardsPerPage || '4'} gap-6 mb-10`}>
                {currentCourses.map(course => (
                    <div key={course.id} className="relative">
                        <CourseCard
                            id={course.id}
                            title={course.title}
                            desc={course.desc}
                            price={course.price}
                            options={course.options}
                        />
                        <button
                            onClick={() => toggleCourse(course.id)}
                            className={`absolute top-2 right-2 px-4 py-2 text-white font-bold rounded-md ${userCourses.includes(course.id) ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                        >
                            {userCourses.includes(course.id) ? 'Unsave' : 'Save'}
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex column items-center gap-4">
                <button
                    className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center dark:text-white text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={prevPage}
                    disabled={currentPage === 1}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                        aria-hidden="true" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                    </svg>
                    Previous
                </button>

                <div className="flex items-center gap-2">
                    {paginationNumbers.map((page, index) => (
                        typeof page === 'number' ? (
                            <button
                                className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg ${currentPage === page ? 'bg-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' : 'text-center align-middle font-sans text-xs font-medium uppercase dark:text-white text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'}`}
                                type="button"
                                key={index}
                                onClick={() => goToPage(page)}
                            >
                                {page}
                            </button>
                        ) : (
                            <span key={index} className="text-center align-middle font-sans text-xs font-medium uppercase dark:text-white text-gray-900">
                                ...
                            </span>
                        )
                    ))}
                </div>

                <button
                    className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center dark:text-white text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={nextPage}
                    disabled={currentPage === totalPages}>
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                        aria-hidden="true" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CoursesGrid;

