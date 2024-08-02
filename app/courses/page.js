'use client';
import React, { useState } from 'react';
import { CourseCard } from '@/components/Hero/SearchWindow'
import { useSession } from 'next-auth/react';
import courses from '@/public/courses.json'; // Assuming the JSON is in the same directory

const CoursesGrid = () => {
    const { data: session } = useSession();
    const coursesPerPage = 4; // Number of courses per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate total number of pages
    const totalPages = Math.ceil(courses.length / coursesPerPage);

    // Calculate the courses to display on the current page
    const startIndex = (currentPage - 1) * coursesPerPage;
    const currentCourses = courses.slice(startIndex, startIndex + coursesPerPage);

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

    return (
        <div style={{ flexDirection: "column" }} className="p-6 flex items-center lg:mr-24 lg:ml-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
                {currentCourses.map(course => (
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

                <div className="flex items-center gap-2"></div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg ${currentPage === index + 1 ? 'bg-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' : 'text-center align-middle font-sans text-xs font-medium uppercase dark:text-white text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'}`}
                        type="button"
                        key={index}
                        onClick={() => goToPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}

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
