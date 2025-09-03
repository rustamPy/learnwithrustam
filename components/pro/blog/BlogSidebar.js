'use client';
import React from 'react';
import { Typography } from '@material-tailwind/react';

const BlogSidebar = ({ currentFilter, onFilterChange, articleStats }) => {
    const categories = [
        { key: 'all', label: 'All Articles', count: articleStats?.total || 0 },
        { key: 'web-development', label: 'Web Development', count: articleStats?.categories?.['web-development'] || 0 },
        { key: 'education-tech', label: 'Education Tech', count: articleStats?.categories?.['education-tech'] || 0 },
        { key: 'programming', label: 'Programming', count: articleStats?.categories?.programming || 0 },
        { key: 'design', label: 'Design', count: articleStats?.categories?.design || 0 },
        { key: 'tutorials', label: 'Tutorials', count: articleStats?.categories?.tutorials || 0 }
    ];

    const years = ['2024', '2023', '2022'];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-6">
            {/* Categories */}
            <Typography variant="h5" className="mb-6 text-lwr-orange-color-100">
                📚 Categories
            </Typography>
            
            <div className="space-y-2 mb-8">
                {categories.map((category) => (
                    <button
                        key={category.key}
                        onClick={() => onFilterChange(category.key)}
                        className={`w-full flex justify-between items-center text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                            currentFilter === category.key
                                ? 'bg-lwr-orange-color-100 text-white shadow-md transform scale-105'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:translate-x-1'
                        }`}
                    >
                        <span className="font-medium">{category.label}</span>
                        {category.count > 0 && (
                            <span className={`text-xs px-2 py-1 rounded-full ${
                                currentFilter === category.key 
                                    ? 'bg-white/20 text-white' 
                                    : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                            }`}>
                                {category.count}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Archives */}
            <Typography variant="h6" className="mb-4 text-gray-700 dark:text-gray-300">
                📅 Archives
            </Typography>
            <div className="space-y-2">
                {years.map((year) => (
                    <button
                        key={year}
                        onClick={() => onFilterChange(year)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                            currentFilter === year
                                ? 'bg-lwr-blue-color-500 text-white shadow-md'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:translate-x-1'
                        }`}
                    >
                        {year}
                    </button>
                ))}
            </div>

            {/* Stats */}
            {articleStats && (
                <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Typography variant="small" className="text-gray-600 dark:text-gray-400 mb-2">
                        📊 Blog Stats
                    </Typography>
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                            <span>Total Articles:</span>
                            <span className="font-semibold text-lwr-orange-color-100">{articleStats.total}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>This Year:</span>
                            <span className="font-semibold text-lwr-blue-color-600">{articleStats.thisYear}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogSidebar;