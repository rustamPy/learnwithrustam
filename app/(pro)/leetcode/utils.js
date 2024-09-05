import { remark } from 'remark';
import html from 'remark-html';
import matter from 'gray-matter';

export const fetchEachQuestionMD = async (slug) => {

    try {
        const response = await fetch('/api/leetcode');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const dataReponse = await response.json();

        const question = dataReponse.questions.map(o => o.question).filter(o => o.slug === `${slug}`)[0]

        const markdown = question.html;
        const { content } = matter(markdown);
        const processedContent = await remark().use(html).process(content);
        const htmlContent = processedContent.toString();

        return {
            title: question.title,
            level: question.level || 'Unknown',
            tests: question.tests || 'Unknown',
            content: htmlContent
        };
    } catch (error) {
        console.error('Error fetching or processing markdown:', error);
    }
}

export const fetchAllQuestions = async () => {
    try {
        const response = await fetch('/api/leetcode');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        return {
            questions: data.questions.map(o => o.question),
            stats: data.stats,
            topGroups: data.topGroups
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export const fetchEachTest = async (slug) => {

    try {
        const response = await fetch('/api/leetcode');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const dataReponse = await response.json();

        const test = dataReponse.questions.map(o => o.tests).filter(o => o.slug === `${slug}`)[0]
        const markdown = test.content;
        const { content } = matter(markdown);
        const processedContent = await remark().use(html).process(content);
        const htmlContent = processedContent.toString();

        return {
            params: test.params || 'NA',
            content: htmlContent
        };
    } catch (error) {
        console.error('Error fetching or processing markdown:', error);
    }
}
