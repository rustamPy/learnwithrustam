'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Typography } from "@material-tailwind/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

import SearchBar from '@/components/FunctionalComponents/SearchBar';
import FilterSortBar from '@/components/FunctionalComponents/FilterSortBar';
import Pagination from '@/components/FunctionalComponents/Pagination';

const Table = ({ questions }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [questionsPerPage, setQuestionsPerPage] = useState(8);

    const TABLE_HEAD = ["ID", "Title", "Difficulty"];

    const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const sortedQuestions = [...questions]
        .filter(question =>
            (question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                question.id.toString().toLowerCase().includes(searchQuery.toLowerCase())) &&
            (category === 'All' || question.level === category)
        )
        .sort((a, b) => {
            if (sortConfig.key) {
                let aValue = a[sortConfig.key.toLowerCase()];
                let bValue = b[sortConfig.key.toLowerCase()];

                // Handle cases where aValue or bValue might be undefined
                if (aValue === undefined) aValue = '';
                if (bValue === undefined) bValue = '';

                if (sortConfig.key.toLowerCase() === "difficulty") {
                    const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
                    aValue = difficultyOrder[a.level.toLowerCase()] || 0;
                    bValue = difficultyOrder[b.level.toLowerCase()] || 0;
                }

                // Sort based on direction
                if (aValue < bValue) {
                    return sortConfig.direction === "asc" ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === "asc" ? 1 : -1;
                }
            }
            return 0;
        });

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

    const totalPages = Math.ceil(sortedQuestions.length / questionsPerPage);
    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const currentQuestions = sortedQuestions.slice(startIndex, endIndex);

    const COLOR_MAP = {
        'Easy': 'green-500',
        'Medium': 'yellow-700',
        'Hard': '#f5385d'
    };
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

                <SearchBar onSearch={handleSearch} placeholder={"Search using question's title or number"} />
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
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="text-left px-4 py-2 text-sm cursor-pointer"
                                    onClick={() => handleSort(head)}
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center justify-between gap-2 font-medium"
                                    >
                                        {head}
                                        <ChevronUpDownIcon
                                            strokeWidth={2}
                                            className="h-4 w-4 opacity-70"
                                        />
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentQuestions.map(({ slug, id, title, level }) => (
                            <tr
                                key={slug}
                                className={`transition-colors bg-${COLOR_MAP[level]} dark:bg-gray-800`}
                            >
                                <td className="px-4 py-2 text-sm">
                                    <Link href={`/leetcode/${slug}`} passHref>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal hover:underline"
                                        >
                                            {id}
                                        </Typography>
                                    </Link>
                                </td>
                                <td className="px-4 py-2 text-sm">
                                    <Link href={`/leetcode/${slug}`} passHref>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal hover:underline"
                                        >
                                            {title}
                                        </Typography>
                                    </Link>
                                </td>
                                <td className="px-4 py-2 text-sm">{level}
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

export default Table;