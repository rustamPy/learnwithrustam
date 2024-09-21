'use client';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Typography, Select, Option, Switch } from "@material-tailwind/react";
import coursesData from '@/public/courses.json';
import { useSession } from 'next-auth/react';
import { Grid, List } from 'lucide-react';

import FilterSortBar from '@/components/pro/FunctionalComponents/FilterSortBar';
import Pagination from '@/components/pro/FunctionalComponents/Pagination';
import SearchBar from '@/components/pro/FunctionalComponents/SearchBar';
import CourseCard, { ListCardView } from '@/components/pro/CourseCard'


const SearchWindow = ({ specificCourses = null, isProfilePage = false, containerClass = "" }) => {
    const { data: session, update } = useSession();
    const [filteredCourses, setFilteredCourses] = useState(specificCourses || coursesData);
    const [displayedCourses, setDisplayedCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [coursesPerPage, setCoursesPerPage] = useState(isProfilePage ? 2 : 4);
    const [category, setCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState('asc');
    const [allTopics, setAllTopics] = useState([...new Set(filteredCourses.flatMap(c => c.topics))])
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [userCourses, setUserCourses] = useState([]);
    const [isListView, setIsListView] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const observer = useRef();
    const lastCourseElementRef = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && displayedCourses.length < filteredCourses.length) {
                setCurrentPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [isLoading, displayedCourses.length, filteredCourses.length]);

    useEffect(() => {
        if (session?.user?.courses) {
            setUserCourses(session.user.courses);
        }
    }, [session]);

    const filterAndSortCourses = useCallback((query) => {
        let filtered = specificCourses || coursesData;

        if (category !== 'All') {
            filtered = filtered.filter(course => course.level?.toLowerCase() === category.toLowerCase());
        }

        if (query) {
            const lowercasedQuery = query.toLowerCase();
            filtered = filtered.filter(course =>
                course.title.toLowerCase().includes(lowercasedQuery) ||
                course.desc.toLowerCase().includes(lowercasedQuery)
            );
        }

        if (selectedTopics.length > 0) {
            filtered = filtered.filter(course =>
                selectedTopics.some(topic => course?.topics?.includes(topic))
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
        setCurrentPage(1);
        setDisplayedCourses(filtered.slice(0, isListView ? 10 : coursesPerPage));
    }, [category, selectedTopics, sortOrder, specificCourses, isListView, coursesPerPage]);

    useEffect(() => {
        filterAndSortCourses();
    }, [selectedTopics, filterAndSortCourses]);

    useEffect(() => {
        if (isListView) {
            setIsLoading(true);
            const newCourses = filteredCourses.slice(0, currentPage * 10);
            setDisplayedCourses(newCourses);
            setIsLoading(false);
        } else {
            setDisplayedCourses(filteredCourses.slice(0, currentPage * coursesPerPage));
        }
    }, [currentPage, filteredCourses, isListView, coursesPerPage]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * (isListView ? 10 : coursesPerPage);
        const endIndex = startIndex + (isListView ? 10 : coursesPerPage);
        setDisplayedCourses(filteredCourses.slice(startIndex, endIndex));
    }, [currentPage, filteredCourses, isListView, coursesPerPage]);

    const handleCoursesPerPageChange = (value) => {
        setCoursesPerPage(Number(value));
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

    const handleResetTopics = () => {
        setSelectedTopics([]);
    }

    const toggleCourse = async (courseId) => {
        if (!session) {
            alert("Please sign in to save courses.");
            return;
        }

        let updatedCourses;
        if (userCourses.includes(courseId)) {
            updatedCourses = userCourses.filter(id => id !== courseId);
        } else {
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
    };

    const toggleView = () => {
        setIsListView(!isListView);
        setSelectedCourse(null);
        setCurrentPage(1);
        setDisplayedCourses(filteredCourses.slice(0, isListView ? coursesPerPage : 10));
    };

    const handleCourseSelect = (course) => {
        setSelectedCourse(course);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const totalPages = Math.ceil(filteredCourses.length / (isListView ? 10 : coursesPerPage));


    const gridClass = isProfilePage
        ? "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
        : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4";

    return (
        <div className={`bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-6 ${containerClass} mb-16 mt-16 w-full max-w-7xl mx-auto`}>
            <div className="flex justify-between items-center mb-8">
                <Typography className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
                    {isProfilePage ? "Selected" : "Our"} Courses
                </Typography>
                <div className="flex items-center space-x-4">
                    <Switch
                        label={isListView ? <List className="h-5 w-5" /> : <Grid className="h-5 w-5" />}
                        onChange={toggleView}
                        checked={isListView}
                    />
                    {!isProfilePage && !isListView && (
                        <Select
                            value={`${coursesPerPage}`}
                            onChange={(value) => handleCoursesPerPageChange(value)}
                            color="blue"
                            className="text-xs bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
                            label='Courses per page'
                        >
                            <Option value="4">4 per page</Option>
                            <Option value="8">8 per page</Option>
                            <Option value="16">16 per page</Option>
                        </Select>
                    )}
                </div>
            </div>

            <SearchBar onSearch={filterAndSortCourses} placeholder="Search using course's title or description" />

            <FilterSortBar
                onCategoryChange={handleCategoryFilter}
                onSortOrderChange={handleSortOrder}
                onTopicChange={handleTopicChange}
                onTopicReset={handleResetTopics}
                selectedCategory={category}
                sortOrder={sortOrder}
                categories={['All', 'Beginner', 'Medium', 'Hard']}
                label='Level'
                showSortOrder={!isProfilePage}
                showTopicFilter={!isProfilePage}
                allTopics={allTopics}
                selectedTopics={selectedTopics}
                itemsCount={filteredCourses.length}
            />

            {displayedCourses.length === 0 ? (
                <Typography className="text-center mt-10 text-gray-700 dark:text-gray-300">No courses found</Typography>
            ) : (
                <div className={isListView ? "flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mt-8" : gridClass}>
                    {isListView ? (
                        <>
                            <div className="w-full lg:w-1/3 overflow-y-auto max-h-[600px] pr-4">
                                {displayedCourses.map((course, index) => (
                                    <div
                                        key={course.id}
                                        ref={index === displayedCourses.length - 1 ? lastCourseElementRef : null}
                                        className={`p-4 mb-4 rounded-lg cursor-pointer ${selectedCourse?.id === course.id
                                            ? 'bg-blue-100 dark:bg-blue-900'
                                            : 'bg-white dark:bg-gray-700'
                                            }`}
                                        onClick={() => handleCourseSelect(course)}
                                    >
                                        <Typography className="font-bold text-gray-900 dark:text-gray-100">
                                            {course.title}
                                        </Typography>
                                        <Typography className="text-sm text-gray-600 dark:text-gray-400">
                                            {course.desc.substring(0, 100)}...
                                        </Typography>
                                    </div>
                                ))}
                                {isLoading && <p>Loading more courses...</p>}
                            </div>
                            <div className="w-full lg:w-2/3 pl-0 lg:pl-4 mt-4 lg:mt-0 overflow-y-auto max-h-[600px]">
                                {selectedCourse ? (
                                    <ListCardView
                                        {...selectedCourse}
                                        onToggleSave={toggleCourse}
                                        isSaved={userCourses.includes(selectedCourse.id)}
                                        isProfilePage={isProfilePage}
                                    />
                                ) : (
                                    <Typography className="text-center text-gray-700 dark:text-gray-300">
                                        Select a course to view details
                                    </Typography>
                                )}
                            </div>
                        </>
                    ) : (
                        displayedCourses.map(course => (
                            <CourseCard
                                key={course.id}
                                {...course}
                                onToggleSave={toggleCourse}
                                isSaved={userCourses.includes(course.id)}
                                isProfilePage={isProfilePage}
                            />
                        ))
                    )}
                </div>
            )}

            {!isListView && (
                <div className="mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
};

export default SearchWindow;