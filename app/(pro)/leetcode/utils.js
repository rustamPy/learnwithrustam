import { remark } from 'remark';
import html from 'remark-html';
import matter from 'gray-matter';


export const COLOR_MAP = {
    'Easy': 'lwr-leetcode-easy-100',
    'Medium': 'lwr-leetcode-medium-100',
    'Hard': 'lwr-leetcode-hard-100'
};


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
            topics: question.topics,
            groups: question.groups,
            hint: question.hint,
            companies: question.companies,
            slug: question.slug,
            level: question.level || 'Unknown',
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
            testFunction: test.testFunction || undefined,
            types: test.types || undefined,
            solution: test.solution || undefined,
            content: htmlContent
        };
    } catch (error) {
        console.error('Error fetching or processing markdown:', error);
    }
}
