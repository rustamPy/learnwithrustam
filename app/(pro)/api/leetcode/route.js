import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';


async function fetchQuestionsFromFS(id = null, fileName = null) {
    const directoryPath = path.join(process.cwd(), 'public', 'leetcode');
    const subdirectories = fs.readdirSync(directoryPath, { withFileTypes: true });

    let result = [];

    for (const dir of subdirectories) {
        if (dir.isDirectory() && (!id || dir.name === id)) {
            const subdirPath = path.join(directoryPath, dir.name);
            const filenames = fs.readdirSync(subdirPath);

            let questionData = {};

            for (const filename of filenames) {
                if (!fileName || filename.startsWith(fileName)) {
                    const filePath = path.join(subdirPath, filename);
                    const fileContents = fs.readFileSync(filePath, 'utf8');
                    const { data, content } = matter(fileContents);

                    if (filename.startsWith('question')) {
                        questionData.question = {
                            slug: dir.name,
                            topics: data.topics || [],
                            title: data.title || filename.replace('.md', '').replace('-', ' '),
                            level: data.level || 'Unknown',
                            groups: data.groups || [],
                            companies: data.companies || [],
                            hint: data.hint || '',
                            html: content,
                        };
                    } else if (filename.startsWith('test')) {
                        questionData.test = {
                            slug: dir.name,
                            params: data.params,
                            testFunction: data.testFunction,
                            solution: data.solution,
                            types: data.types,
                            content: content
                        };
                    } else if (filename.startsWith('solution')) {
                        questionData.solution = {
                            slug: dir.name,
                            timeComplexity: data.tcx,
                            memoryComplexity: data.mcx,
                            algorithm: data.algorithm,
                            content: content
                        };
                    }
                }
            }

            if (Object.keys(questionData).length > 0) {
                result.push(questionData);
            }
        }
    }

    return result;
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const fileName = searchParams.get('fileName');

    try {
        const questions = await fetchQuestionsFromFS(id, fileName);

        if (id || fileName) {
            return NextResponse.json({ questions });
        }

        const { topGroups, stats } = calculateStats(questions);
        return NextResponse.json({ questions, topGroups, stats });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
    }
}


function calculateStats(questions) {
    const groupMap = {};
    questions.forEach(({ question }) => {
        if (!question || !question.groups) return;

        question.groups.forEach(group => {
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
    const topicsSet = new Set(questions.flatMap(q => q.question.topics));

    return {
        topGroups,
        stats: {
            totalQuestions,
            averageDifficulty,
            countByDifficulties,
            uniqueTopics: topicsSet.size,
        }
    };
}

function calculateCountByDifficulties(questions) {
    const difficultyLevels = { Easy: 0, Medium: 0, Hard: 0 };
    questions.forEach(q => {
        if (q.question && q.question.level) {
            difficultyLevels[q.question.level] += 1;
        }
    });
    return difficultyLevels;
}

function calculateAverageDifficulty(questions) {
    const difficultyLevels = { Easy: 3, Medium: 6, Hard: 9 };
    const totalDifficulty = questions.reduce((sum, q) => {
        if (q.question && q.question.level) {
            return sum + (difficultyLevels[q.question.level] || 0);
        }
        return sum;
    }, 0);
    return (totalDifficulty / questions.length).toFixed(1);
}