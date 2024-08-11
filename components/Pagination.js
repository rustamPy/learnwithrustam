'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import courses from '@/public/courses.json';

const Pagination = ({ }) => {


    // Generate the pagination numbers with ellipses
    const getPaginationNumbers = () => {

        const coursesPerPage = 4; // Number of courses per page
        const [currentPage, setCurrentPage] = useState(1);

        // Calculate total number of pages

        // Calculate total number of pages
        const totalPages = specificCourses
            ? Math.ceil(specificCourses.length / coursesPerPage)
            : Math.ceil(courses.length / coursesPerPage);



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
        <div className="flex justify-center items-center gap-4 mt-4">
            <button
                className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center dark:text-white text-gray-900 uppercase transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50"
                type="button"
                onClick={prevPage}
                disabled={currentPage === 1}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                </svg>
                Previous
            </button>

            <div className="flex items-center gap-2">
                {paginationNumbers.map((page, index) => (
                    typeof page === 'number' ? (
                        <button
                            className={`relative h-10 w-10 text-center font-sans text-xs font-medium uppercase rounded-lg transition-all ${currentPage === page ? 'bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20' : 'text-gray-900 dark:text-white hover:bg-gray-900/10 active:bg-gray-900/20'}`}
                            type="button"
                            key={index}
                            onClick={() => goToPage(page)}
                        >
                            {page}
                        </button>
                    ) : (
                        <span key={index} className="text-center font-sans text-xs font-medium uppercase dark:text-white text-gray-900">
                            ...
                        </span>
                    )
                ))}
            </div>

            <button
                className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center dark:text-white text-gray-900 uppercase transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50"
                type="button"
                onClick={nextPage}
                disabled={currentPage === totalPages}
            >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                </svg>
            </button>
        </div>
    )
}