'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Typography, Select, Option } from "@material-tailwind/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import SearchBar from '@/components/FunctionalComponents/SearchBar';
import FilterSortBar from '@/components/FunctionalComponents/FilterSortBar';
import Pagination from '@/components/FunctionalComponents/Pagination';


const COLOR_MAP = {
    'Easy': 'lwr-leetcode-easy-100',
    'Medium': 'lwr-leetcode-medium-100',
    'Hard': 'lwr-leetcode-hard-100'
};


const TableHead = ({ columns, onSort }) => (
    <thead>
        <tr className="bg-gray-100 dark:bg-gray-900">
            {columns.map((head) => (
                <th
                    key={head}
                    className="text-left px-4 py-2 text-sm cursor-pointer"
                    onClick={() => onSort(head)}
                >
                    <Typography
                        variant="small"
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
);

const TableBody = ({ questions, colorMap }) => {

    return (
    <tbody>
            {questions.map(({ slug, title, level }) => (
            <tr
                key={slug}
                    className={`bg-${colorMap[level]} text-gray-900`}
            >
                <td className="px-4 py-2 text-sm">
                    <Link href={`/leetcode/${slug}`} passHref>
                        <Typography
                            variant="small"
                                className={`font-normal hover:underline font-semibold`}
                        >
                                {slug}
                        </Typography>
                    </Link>
                </td>
                <td className="px-4 py-2 text-sm">
                    <Link href={`/leetcode/${slug}`} passHref>
                        <Typography
                            variant="small"
                            className="font-normal hover:underline font-semibold"
                        >
                            {title}
                        </Typography>
                    </Link>
                </td>
                <td className="px-4 py-2 text-sm">{level}</td>
            </tr>
        ))}
    </tbody>
    )
};

const NoQuestions = () => (
    <div className="flex flex-col items-center justify-center">
        <Typography className="text-base font-semibold">No questions available</Typography>
    </div>
);

const Table = ({ questions }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [questionsPerPage, setQuestionsPerPage] = useState(8);
    const [selectedTopics, setSelectedTopics] = useState([]);

    const allTopics = [...new Set(questions.flatMap(q => q.topics))];

    const handleTopicChange = (topic) => {
        setSelectedTopics(prev =>
            prev.includes(topic)
                ? prev.filter(t => t !== topic)
                : [...prev, topic]
        );
        setCurrentPage(1);
    };

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
                question.slug.toString().toLowerCase().includes(searchQuery.toLowerCase())) &&
            (category === 'All' || question.level === category) &&
            (selectedTopics.length === 0 || selectedTopics.some(topic => question.topics.includes(topic)))
        )
        .sort((a, b) => {
            if (sortConfig.key) {
                let aValue = a[sortConfig.key.toLowerCase()];
                let bValue = b[sortConfig.key.toLowerCase()];

                if (aValue === undefined) aValue = '';
                if (bValue === undefined) bValue = '';

                if (sortConfig.key.toLowerCase() === "difficulty") {
                    const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
                    aValue = difficultyOrder[a.level.toLowerCase()] || 0;
                    bValue = difficultyOrder[b.level.toLowerCase()] || 0;
                }

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

    const handleQuestionsPerPageChange = (value) => {
        setQuestionsPerPage(Number(value));
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(sortedQuestions.length / questionsPerPage);
    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const currentQuestions = sortedQuestions.slice(startIndex, endIndex);


    return (
        <div className="container mx-auto py-8 px-4">
            <span className='bg-lwr-leetcode-easy-100'></span>
            <span className='bg-lwr-leetcode-medium-100'></span>
            <span className='bg-lwr-leetcode-hard-100'></span>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                <div className="flex flex-col md:flex-row justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Tasks</h1>
                    <div className="flex items-start space-x-3 mt-4 sm:mt-0">
                        <Select
                            value={`${questionsPerPage}`}
                            onChange={value => handleQuestionsPerPageChange(value)}
                            color="blue"
                            className="text-xs bg-gray-200 dark:bg-gray-900 dark:text-gray-200"
                            labelProps={{
                                className: "text-gray-700 dark:text-gray-200"
                            }}
                            label='Tasks per page'
                        >
                            <Option value="8" className='mb-1'>8 per page</Option>
                            <Option value="16" className='mb-1'>16 per page</Option>
                        </Select>
                    </div>
                </div>

                <SearchBar onSearch={handleSearch} placeholder={"Search using question's title or number"} />
                <FilterSortBar
                    onCategoryChange={handleCategoryFilter}
                    onSortOrderChange={handleSortOrder}
                    onTopicChange={handleTopicChange}
                    selectedCategory={category}
                    sortOrder={sortOrder}
                    selectedTopics={selectedTopics}
                    categories={['All', 'Easy', 'Medium', 'Hard']}
                    label={'Level'}
                    showSortOrder={false}
                    showTopicFilter={true}
                    allTopics={allTopics}
                />

                {currentQuestions.length === 0 ? (
                    <NoQuestions />
                ) : (
                        <table className="w-full border-collapse mt-5 rounded-lg overflow-hidden shadow-md">
                            <TableHead columns={TABLE_HEAD} onSort={handleSort} sortConfig={sortConfig} />
                            <TableBody questions={currentQuestions} colorMap={COLOR_MAP} />
                        </table>
                )}

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
