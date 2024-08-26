'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { Typography, Select, Option } from "@material-tailwind/react";
import coursesData from '@/public/courses.json';

import FilterSortBar from '@/components/FunctionalComponents/FilterSortBar';
import Pagination from '@/components/FunctionalComponents/Pagination';
import SearchBar from '@/components/FunctionalComponents/SearchBar';
import CourseCard from '@/components/CourseCard'

const ITEMS_PER_PAGE = 4;

const SearchWindow = () => {
    const [filteredCourses, setFilteredCourses] = useState(coursesData);
    const [currentPage, setCurrentPage] = useState(1);
    const [questionsPerPage, setQuestionsPerPage] = useState(ITEMS_PER_PAGE);
    const [category, setCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedTopics, setSelectedTopics] = useState([]);

    const filterAndSortCourses = useCallback((query) => {
        let filtered = coursesData;

        if (category !== 'All') {
            filtered = filtered.filter(course => course.level?.toLowerCase() === category.toLowerCase());
        }

        console.log(query)
        if (query) {
            const lowercasedQuery = query.toLowerCase();
            filtered = filtered.filter(course =>
                course.title.toLowerCase().includes(lowercasedQuery) ||
                course.desc.toLowerCase().includes(lowercasedQuery)
            );
        }

        if (selectedTopics.length > 0) {
            filtered = filtered.filter(course =>
                selectedTopics.every(topic => course?.topics?.includes(topic))
            );
        }

        filtered.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        });

        setFilteredCourses(filtered);
    }, [category, selectedTopics, sortOrder]);

    useEffect(() => {
        filterAndSortCourses();
    }, [selectedTopics, filterAndSortCourses]);

    const handleQuestionsPerPageChange = (value) => {
        setQuestionsPerPage(Number(value));
        setCurrentPage(1);
    };

    const handleCategoryFilter = (category) => {
        setCategory(category);
        filterAndSortCourses();
    };

    const handleSortOrder = (order) => {
        setSortOrder(order);
        filterAndSortCourses();
    };

    const handleTopicChange = (topic) => {
        setSelectedTopics(prevTopics =>
            prevTopics.includes(topic) ? prevTopics.filter(t => t !== topic) : [...prevTopics, topic]
        );
    };

    const totalPages = Math.ceil(filteredCourses.length / questionsPerPage);
    const currentQuestions = filteredCourses.slice((currentPage - 1) * questionsPerPage, currentPage * questionsPerPage);

    const allTopics = [...new Set(filteredCourses.flatMap(c => c.topics))];

    return (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-6 scroll-mt-[450px] sm:scroll-mt-32 mb-16" id="courses">

            <div className="flex flex-col md:flex-row justify-between mb-8">
                <Typography className="mt-4 text-4xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-5xl lg:text-6xl">
                    Our
                    <span className="px-2 py-1 relative inline-block">
                        <svg className="stroke-current bottom-0 absolute text-blue-300 -translate-x-2" viewBox="0 0 410 18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 6.4c16.8 16.8 380.8-11.2 397.6 5.602" strokeWidth="12" fill="none" fillRule="evenodd" strokeLinecap="round"></path>
                        </svg>
                        <span className="relative">Courses</span>
                    </span>
                </Typography>
                <div className="flex items-start space-x-3 mt-4 sm:mt-0">
                    <Select
                        value={`${questionsPerPage}`}
                        onChange={(value) => handleQuestionsPerPageChange(value)}
                        color="blue"
                        className="text-xs bg-gray-200 dark:bg-gray-900 dark:text-gray-200"
                        labelProps={{ className: "text-gray-700 dark:text-gray-200" }}
                        label='Courses per page'
                    >
                        <Option value="4" className='mb-1'>4 per page</Option>
                        <Option value="8" className='mb-1'>8 per page</Option>
                        <Option value="16" className='mb-1'>16 per page</Option>
                    </Select>
                </div>
            </div>

            <SearchBar onSearch={filterAndSortCourses} placeholder="Search using course's title or description" />

            <FilterSortBar
                onCategoryChange={handleCategoryFilter}
                onSortOrderChange={handleSortOrder}
                onTopicChange={handleTopicChange}
                selectedCategory={category}
                sortOrder={sortOrder}
                selectedTopics={selectedTopics}
                categories={['All', 'Beginner', 'Intermediate', 'Advanced']}
                label='Level'
                showSortOrder={true}
                showTopicFilter={true}
                allTopics={allTopics}
                itemsCount={filteredCourses.length}
            />

            {currentQuestions.length === 0 ? (
                <Typography className="text-center mt-10" color="gray">No courses found</Typography>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {currentQuestions.map(course => (
                        <CourseCard key={course.id} {...course} />
                    ))}
                </div>
            )}

            <div className="mt-8">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};



export default SearchWindow;