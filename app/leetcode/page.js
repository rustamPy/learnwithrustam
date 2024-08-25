import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Table from './Table';
import Title from '@/components/Title';
import GroupCard from './GroupCard';
import LeetCodeStats from './LeetCodeStats';

const QuestionsPage = async () => {
    const questions = getQuestions();

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
    const averageDifficulty = calculateAverageDifficulty(questions);
    const topicsSet = new Set(questions.flatMap(q => q.topics));

    const stats = {
        totalQuestions,
        averageDifficulty,
        uniqueTopics: topicsSet.size,
    };

    return (
        <Title value={'LeetCode Questions'}>
            <LeetCodeStats stats={stats} />
            <GroupCard groups={topGroups} />
            <Table questions={questions} />
        </Title>
    );
}

const getQuestions = () => {
    const directoryPath = path.join(process.cwd(), 'public', 'leetcode');
    const filenames = fs.readdirSync(directoryPath);

    return filenames.map((filename) => {
        const filePath = path.join(directoryPath, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');

        const { data } = matter(fileContents);

        return {
            slug: filename.replace('.md', ''),
            topics: data.topics || [],
            title: data.title || filename.replace('.md', '').replace('-', ' '),
            level: data.level || 'Unknown',
            groups: data.groups || [],
        };
    });
}

const calculateAverageDifficulty = (questions) => {
    const difficultyLevels = { Easy: 1, Medium: 2, Hard: 3 };
    const totalDifficulty = questions.reduce((sum, q) => sum + (difficultyLevels[q.level] || 0), 0);
    return (totalDifficulty / questions.length).toFixed(1);
};

export default QuestionsPage;
