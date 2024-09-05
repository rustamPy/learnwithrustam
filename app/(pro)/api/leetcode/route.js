import { getQuestions } from '@/lib/questions';

export async function GET(request) {
    try {

        const questions = await getQuestions();
        const groupMap = {};
        questions.forEach(({ question }) => {


            if (!question.groups) {
                return;
            }

            (question.groups || []).forEach(group => {
                if (!groupMap[group]) {
                    groupMap[group] = [];
                }
                if (!groupMap[group].includes(question)) {
                    groupMap[group].push(question);
                }
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


        return new Response(
            JSON.stringify({ questions, topGroups, stats }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Failed to load data' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

function calculateCountByDifficulties(questions) {
    const difficultyLevels = { Easy: 0, Medium: 0, Hard: 0 };
    questions.forEach(q => {
        difficultyLevels[q.level] += 1;
    });
    return difficultyLevels;
}

function calculateAverageDifficulty(questions) {
    const difficultyLevels = { Easy: 3, Medium: 6, Hard: 9 };
    const totalDifficulty = questions.reduce((sum, q) => sum + (difficultyLevels[q.level] || 0), 0);
    return (totalDifficulty / questions.length).toFixed(1);
}
