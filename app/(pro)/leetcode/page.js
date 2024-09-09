'use client';
import Page from './LeetCodePage'
import { Suspense, useState, useEffect } from 'react';
import { fetchAllQuestions } from './utils'

const QuestionsPage = () => {
    const [questions, setQuestions] = useState([]);
    const [stats, setStats] = useState({});
    const [topGroups, setTopGroups] = useState([])


    useEffect(() => {

        const getData = async () => {
            try {
                const data = await fetchAllQuestions()
                setQuestions(data.questions.map(q => q.question))
                setStats(data.stats)
                setTopGroups(data.topGroups)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getData();

    }, []);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Page questions={questions} topGroups={topGroups} stats={stats} />
        </Suspense>
    );
}



export default QuestionsPage;