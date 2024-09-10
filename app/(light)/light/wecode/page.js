'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const SimplePage = () => {
    const [questions, setQuestions] = useState([]);
    const [stats, setStats] = useState({});
    const [topGroups, setTopGroups] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [questionsPerPage] = useState(10);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/wecode');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setQuestions(data.questions.map(o => o.question));
                setStats(data.stats);
                setTopGroups(data.topGroups);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const filteredQuestions = questions.filter((question) => {
        return (
            (question?.title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
                question?.slug?.toString()?.toLowerCase().includes(searchQuery?.toLowerCase())) &&
            (category === 'All' || question.level === category)

        )
    });

    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="mx-auto px-4 py-8" >
            <span className='bg-green-200'></span>
            <span className='bg-yellow-900'></span>
            <span className='bg-red-200'></span>

            <h1 className="text-xl mb-6">WeCode Questions</h1>

            <div className="mb-4">
                <h2 className="mb-2 font-semibold">Stats</h2>
                <p className='ml-2'>Total Questions: {stats.totalQuestions}</p>
                <p className='ml-2'>Average Difficulty: {stats.averageDifficulty}</p>
                <p className='ml-2'>Unique Topics: {stats.uniqueTopics}</p>
            </div>

            <div className="mb-4">
                <h2 className="mb-2 font-semibold">Top 3 Groups</h2>
                {topGroups.map((group, index) => (
                    <div key={`${group.name}_${index}`} className="mb-2">
                        <h4 className='ml-2 italic'>{group.name} ({group.count} questions)</h4>
                        <ul className='ml-4'>
                            {group.questions.slice(0, 3).map((q, i) => (
                                <li key={`${group.name}_question_${i}`}>{q.title}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search questions..."
                    className="w-full p-2 border border-gray-300"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <select
                    className="w-full p-2 border border-gray-300"
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="All">All Difficulties</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </div>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">ID</th>
                        <th className="border border-gray-300 p-2">Title</th>
                        <th className="border border-gray-300 p-2">Difficulty</th>
                    </tr>
                </thead>
                <tbody>
                    {currentQuestions.map((question, index) => (
                        <tr key={question.slug}>
                            <td className="border border-gray-300 p-2">{question.slug}</td>
                            <td className="border border-gray-300 p-2">
                                <div className='flex flex-row items-center'>
                                    <Link href={`/light/wecode/${question.slug}`}>{question.title}</Link>
                                    <div className={`ml-2 w-2 h-2 bg-${question.level.toLowerCase() === 'easy' ? 'green-200' : question.level.toLowerCase() === 'medium' ? 'yellow-900' : 'red-200'} rounded-full`}></div>
                                    {question.topics.slice(0, 5).map((topic, i) => (
                                        <div key={`${question.slug}_topic_${i}`} className='text-[8px] rounded-lg bg-gray-100 p-1 ml-2'>
                                            {topic}
                                        </div>
                                    ))}
                                    {question.topics.length > 5 && (
                                        <span key={`${question.slug}_more`} className='text-[8px] rounded-lg bg-gray-100 p-1 ml-2'>
                                            + {question.topics.length - 5}
                                        </span>
                                    )}
                                </div>
                            </td>
                            <td className="border border-gray-300 p-2">{question.level}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4">
                {Array.from({ length: Math.ceil(filteredQuestions.length / questionsPerPage) }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        className="mr-2 px-3 py-1 border border-gray-300"
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SimplePage;
