'use client';
import { useState, useEffect } from 'react';
import Giscus from '@/components/Giscus';
import { Spinner } from '@material-tailwind/react'

import { fetchEachQuestionMD } from '../utils'


const COLOR_MAP = {
    'Easy': 'green-500',
    'Medium': 'yellow-700',
    'Hard': '#f5385d'
}

function LoadingDisplay() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <Spinner color="amber" className="h-16 w-16 text-blue-500" />
        </div>
    );
}


export default function ArticlePage({ params }) {
    const { slug } = params;
    const [articleData, setArticleData] = useState(null);

    useEffect(() => {

        const getQuestion = async () => {
            try {
                setArticleData(await fetchEachQuestionMD(slug));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getQuestion();
    }, [slug]);

    if (!articleData) return <LoadingDisplay />
    const { title, level, content } = articleData;

    return (
        <div className="flex flex-col items-center mb-10 font-sans px-10 mt-8">
            <h1 className="text-5xl font-extrabold uppercase mb-6 text-center">
                {title}
            </h1>
            <div className="w-full p-8 rounded-lg shadow-lg dark:bg-gray-900">
                <div className="flex items-center mb-4">
                    <span className="text-lg font-medium mr-4">Difficulty:</span>
                    <span className={`inline-block px-4 py-1 text-sm font-semibold rounded-full bg-${COLOR_MAP[level]}`}>
                        {level}
                    </span>
                </div>
                <div className="prose lg:prose-xl" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
            <Giscus />
        </div>
    );
}