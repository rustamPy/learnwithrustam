import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getQuestions() {
    const directoryPath = path.join(process.cwd(), 'public', 'leetcode');
    const subdirectories = fs.readdirSync(directoryPath, { withFileTypes: true });

    return subdirectories.map((dir) => {
        if (dir.isDirectory()) {
            const subdirPath = path.join(directoryPath, dir.name);
            const filenames = fs.readdirSync(subdirPath);

            let questionData = {};
            let tests = [];

            filenames.forEach((filename) => {
                const filePath = path.join(subdirPath, filename);

                if (filename.startsWith('question')) {
                    const fileContents = fs.readFileSync(filePath, 'utf8');
                    const { data } = matter(fileContents);

                    questionData = {
                        slug: dir.name,
                        topics: data.topics || [],
                        title: data.title || filename.replace('.md', '').replace('-', ' '),
                        level: data.level || 'Unknown',
                        groups: data.groups || [],
                        html: fileContents,
                    };
                } else if (filename.startsWith('test')) {
                    const fileContents = fs.readFileSync(filePath, 'utf8');
                    const { data } = matter(fileContents);

                    tests = {
                        slug: dir.name,
                        params: data.params,
                        content: fileContents
                    }
                }
            });

            return {
                question: questionData,
                tests,
            };
        }
    });
}