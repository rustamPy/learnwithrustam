'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import videoConfig from '@/lib/videoConfig.json';
import SearchBar from '@/components/VideoComponents/SearchBar';
import FilterSortBar from '@/components/VideoComponents/FilterSortBar';
import VideoGrid from '@/components/VideoComponents/VideoGrid';
import Pagination from '@/components/VideoComponents/Pagination';
import { CiBoxList, CiGrid41 } from "react-icons/ci";
import { Chip } from "@material-tailwind/react";

export default function Videos() {
    const params = useParams();
    const galleryConfig = videoConfig.galleries.find(g => g.slug === params.slug) || videoConfig.galleries[0];

    const [videos, setVideos] = useState(galleryConfig.videos);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [videosPerPage, setVideosPerPage] = useState(8);
    const [isGridView, setIsGridView] = useState(true);

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const handleCategoryFilter = (category) => {
        setCategory(category);
        setCurrentPage(1);
    };

    const handleSortOrder = (order) => {
        setSortOrder(order);
    };

    const handleDateChange = (date) => {
        // Implement date filtering logic here
        console.log("Date changed:", date);
    };

    const handleViewToggle = () => {
        setIsGridView(!isGridView);
    };

    const handleVideosPerPageChange = (e) => {
        setVideosPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const filteredVideos = videos
        .filter((video) =>
            video.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (category === 'All' || video.category === category)
        )
        .sort((a, b) =>
            sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
        );

    const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
    const startIndex = (currentPage - 1) * videosPerPage;
    const endIndex = startIndex + videosPerPage;
    const currentVideos = filteredVideos.slice(startIndex, endIndex);

    console.log(galleryConfig)

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto py-8 px-4">

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row justify-between mb-8">
                        <div className="flex flex-col mb-4 md:mb-0">
                            <div className="flex items-center space-x-3 mb-2">
                                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{galleryConfig.title}</h1>
                                <div className="flex items-center space-x-2">
                                    {galleryConfig.badges.map(badge => (
                                        <Chip variant="ghost" value={badge.value} size="sm" color={badge.color} className="rounded-full dark:text-gray-300" >
                                            {badge.value}
                                        </Chip>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 max-w-xl">{galleryConfig.description}</p>
                        </div>
                        <div className="flex items-start space-x-3">

                            <select
                                value={videosPerPage}
                                onChange={handleVideosPerPageChange}
                                className="px-3 py-1.5 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            >
                                <option value="8">8 per page</option>
                                <option value="16">16 per page</option>
                                <option value="24">24 per page</option>
                            </select>
                            <button
                                onClick={handleViewToggle}
                                className="text p-2 rounded-md transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
                                aria-label={isGridView ? "Switch to list view" : "Switch to grid view"}
                            >
                                {isGridView ? <CiBoxList /> : <CiGrid41 />}
                            </button>
                        </div>
                    </div>
                    <SearchBar onSearch={handleSearch} />
                    <FilterSortBar
                        onCategoryChange={handleCategoryFilter}
                        onSortOrderChange={handleSortOrder}
                        selectedCategory={category}
                        sortOrder={sortOrder}
                        onDateChange={handleDateChange}
                        categories={galleryConfig.categories}
                    />
                </div>
                <VideoGrid videos={currentVideos} isGridView={isGridView} />
                <div className="mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    );
}
