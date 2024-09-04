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
        const question = dataReponse.questions.filter(q => q.slug === slug)[0]

        console.log('GO')
        console.log(question)


        const markdown = question.html;
        const { content } = matter(markdown);
        const processedContent = await remark().use(html).process(content);
        const htmlContent = processedContent.toString();

        return {
            title: question.title || slug.replace('-', ' '),
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
            questions: data.questions,
            stats: data.stats,
            topGroups: data.topGroups
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}