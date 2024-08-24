'use client';

import { useState } from 'react';
import Link from 'next/link';

import SearchBar from '@/components/FunctionalComponents/SearchBar';
import FilterSortBar from '@/components/FunctionalComponents/FilterSortBar';
import Pagination from '@/components/FunctionalComponents/Pagination';

export default function Table({ questions }) {
    const [sortedQuestions, setSortedQuestions] = useState(questions);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [questionsPerPage, setQuestionsPerPage] = useState(8);



    const COLOR_MAP = {
        'Easy': 'green-500',
        'Medium': 'yellow-700',
        'Hard': '#f5385d'
    }

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

    const handleQuestionsPerPageChange = (e) => {
        setQuestionsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const filteredQuestions = sortedQuestions
        .filter((question) =>
            question.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (category === 'All' || question.level === category)
        )
        .sort((a, b) =>
            sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
        );

    const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const currentQuestions = filteredQuestions.slice(startIndex, endIndex);

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                <div className="flex flex-col md:flex-row justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">LeetCode Questions</h1>
                    <div className="flex items-start space-x-3">
                        <select
                            value={questionsPerPage}
                            onChange={handleQuestionsPerPageChange}
                            className="px-3 py-1.5 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        >
                            <option value="8">8 per page</option>
                            <option value="16">16 per page</option>
                        </select>
                    </div>
                </div>

                <SearchBar onSearch={handleSearch} />
                <FilterSortBar
                    onCategoryChange={handleCategoryFilter}
                    onSortOrderChange={handleSortOrder}
                    selectedCategory={category}
                    sortOrder={sortOrder}
                    categories={['All', 'Easy', 'Medium', 'Hard']}
                    label={'Level:'}
                />

                <table className="w-full border-collapse mt-5 rounded-lg overflow-hidden shadow-md">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-900">
                            <th className="text-left px-4 py-2 text-sm"> Title </th>
                            <th className="text-left px-4 py-2 text-sm"> Difficulty </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentQuestions.map(({ slug, title, level }) => (
                            <tr key={slug} className={`bg-${COLOR_MAP[level]}`}>
                                <td className="px-4 py-2 border-gray-200 text-sm">
                                    <Link href={`/leetcode/${slug}`} className="text-gray-700 no-underline">
                                        {title}
                                    </Link>
                                </td>
                                <td className="px-4 py-2 border-gray-200 text-sm">
                                    {level}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

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
