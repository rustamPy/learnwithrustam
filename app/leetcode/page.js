import { Suspense } from 'react';
import Table from './Table';
import Title from '@/components/Title';
import GroupCard from './GroupCard';
import LeetCodeStats from './LeetCodeStats';
import { getQuestions } from '@/lib/questions';

async function QuestionsContent() {
    const questions = await getQuestions();

    const groupMap = {};
    questions.forEach((question) => {
        (question.groups || []).forEach((group) => {
            if (!groupMap[group]) {
                groupMap[group] = [];
            }
            groupMap[group].push(question);
        });
    });

    const groupedArray = Object.keys(groupMap).map((group) => ({
        name: group,
        questions: groupMap[group],
        count: groupMap[group].length,
    }));

    const topGroups = groupedArray
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);

    const totalQuestions = questions.length;
    const countByDifficulties = calculateCountByDifficulties(questions);
    const averageDifficulty = calculateAverageDifficulty(questions);
    const topicsSet = new Set(questions.flatMap(q => q.topics));

    const stats = {
        totalQuestions,
        averageDifficulty,
        countByDifficulties,
        uniqueTopics: topicsSet.size,
    };

    return (
        <>
            <LeetCodeStats stats={stats} />
            <GroupCard groups={topGroups} />
            <Table questions={questions} />
        </>
    );
}

const calculateCountByDifficulties = (questions) => {
    const difficultyLevels = { Easy: 0, Medium: 0, Hard: 0 };
    questions.map(q => {
        difficultyLevels[q.level] += 1;
    })
    return difficultyLevels;
}

const calculateAverageDifficulty = (questions) => {
    const difficultyLevels = { Easy: 3, Medium: 6, Hard: 9 };
    const totalDifficulty = questions.reduce((sum, q) => sum + (difficultyLevels[q.level] || 0), 0);
    return (totalDifficulty / questions.length).toFixed(1);
};

export default function QuestionsPage() {
    return (
        <Title value={'LeetCode Questions'}>
            <div className="container mx-auto px-4 py-8">
                <Suspense fallback={<div>Loading...</div>}>
                    <QuestionsContent />
                </Suspense>
            </div>
        </Title>
    );
}