import { remark } from 'remark';
import html from 'remark-html';
import matter from 'gray-matter';

export const COLOR_MAP = {
    'Easy': 'lwr-leetcode-easy-100',
    'Medium': 'lwr-leetcode-medium-100',
    'Hard': 'lwr-leetcode-hard-100'
};

export const fetchQuestion = async (slug) => {
    try {
        const response = await fetch(`/api/leetcode?id=${slug}&fileName=question`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const question = data.questions[0]?.question;

        if (!question) {
            throw new Error('Question not found');
        }

        const processedContent = await remark().use(html).process(question.html);
        const htmlContent = processedContent.toString();

        return {
            ...question,
            content: htmlContent
        };
    } catch (error) {
        console.error('Error fetching or processing question:', error);
    }
}

export const fetchAllQuestions = async () => {
    try {
        const response = await fetch('/api/leetcode');

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        return data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export const fetchTest = async (slug) => {
    try {
        const response = await fetch(`/api/leetcode?id=${slug}&fileName=test`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const test = data.questions[0]?.test;

        if (!test) {
            throw new Error('Test not found');
        }

        const processedContent = await remark().use(html).process(test.content);
        const htmlContent = processedContent.toString();

        return {
            ...test,
            content: htmlContent
        };
    } catch (error) {
        console.error('Error fetching or processing test:', error);
    }
}

export const fetchSolution = async (slug) => {
    try {
        const response = await fetch(`/api/leetcode?id=${slug}&fileName=solution`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const solution = data.questions[0]?.solution;

        if (!solution) {
            throw new Error('Solution not found');
        }

        const processedContent = await remark().use(html).process(solution.content);
        const htmlContent = processedContent.toString();

        return {
            ...solution,
            content: htmlContent
        };
    } catch (error) {
        console.error('Error fetching or processing solution:', error);
    }
}