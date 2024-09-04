import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getQuestions() {
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
            tests: data.tests || {},
            html: fileContents
        };
    });
}