'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Table({ questions }) {
    const [sortedQuestions, setSortedQuestions] = useState(questions);
    const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'ascending' });

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        const sorted = [...questions].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        setSortedQuestions(sorted);
        setSortConfig({ key, direction });
    };

    const getRowColor = (level) => {
        switch (level.toLowerCase()) {
            case 'easy':
                return 'bg-green-100'; // green
            case 'medium':
                return 'bg-yellow-100'; // gold
            case 'hard':
                return 'bg-red-100'; // red
            default:
                return 'bg-gray-100'; // default light gray
        }
    };

    return (
        <table className="w-4/5 border-collapse mt-5 rounded-lg overflow-hidden shadow-md">
            <thead>
                <tr className="bg-gray-100">
                    <th
                        onClick={() => handleSort('title')}
                        className="text-left px-4 py-2 border-b-2 border-gray-200 cursor-pointer text-sm"
                    >
                        Title {sortConfig.key === 'title' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                    </th>
                    <th
                        onClick={() => handleSort('level')}
                        className="text-left px-4 py-2 border-b-2 border-gray-200 cursor-pointer text-sm"
                    >
                        Difficulty {sortConfig.key === 'level' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                    </th>
                </tr>
            </thead>
            <tbody>
                {sortedQuestions.map(({ slug, title, level }) => (
                    <tr key={slug} className={getRowColor(level)}>
                        <td className="px-4 py-2 border-b border-gray-200 text-sm">
                            <Link href={`/leetcode/${slug}`} className="text-gray-700 no-underline">
                                {title}
                            </Link>
                        </td>
                        <td className="px-4 py-2 border-b border-gray-200 text-sm">
                            {level}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
