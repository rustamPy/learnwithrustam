import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Table from './Table';


export const QuestionsPage = async () => {
    const questions = getQuestions();

    const sortedQuestions = questions.sort((a, b) => a.title.localeCompare(b.title));

    return (
        <div className="p-10 flex flex-col items-center">
            <h1 className="text-5xl font-extrabold mb-6 uppercase rainbow-text">LeetCode Questions</h1>
            <img src='https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTRvanZzbGw4bWxlcWcwNnZtc3BlcnhkM3RhMzMzMTlxZ2NmaDFwNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bGgsc5mWoryfgKBx1u/giphy.gif' />
            <Table questions={sortedQuestions} />
        </div>
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
            title: data.title || filename.replace('.md', '').replace('-', ' '),
            level: data.level || 'Unknown',
        };
    });
}
