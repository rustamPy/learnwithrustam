import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import matter from 'gray-matter';


async function getMarkdownContent(fileName) {
    const filePath = path.join(process.cwd(), 'public', 'leetcode', fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    const { data, content } = matter(fileContents); // Extract front matter

    const processedContent = await remark().use(html).process(content);
    const htmlContent = processedContent.toString();

    return { htmlContent, data };
}

export default async function ArticlePage({ params }) {
    const { slug } = params;
    const { htmlContent, data } = await getMarkdownContent(`${slug}.md`);

    return (
        <div className="flex flex-col items-center p-8 bg-gray-100 font-sans">
            <h1 className="text-5xl font-extrabold uppercase mb-6 text-center text-gray-900">
                {data.title || slug.replace('-', ' ')}
            </h1>
            <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                    <span className="text-lg font-medium mr-4">Difficulty:</span>
                    <span className={`inline-block px-4 py-1 text-sm font-semibold text-white rounded-full ${getBadgeClasses(data.level)}`}>
                        {data.level || 'Unknown'}
                    </span>
                </div>
                <div className="prose lg:prose-xl" dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
        </div>
    );
}

// Function to return different badge classes based on difficulty level
function getBadgeClasses(level) {
    switch (level?.toLowerCase()) {
        case 'easy':
            return 'bg-green-500';
        case 'medium':
            return 'bg-yellow-500';
        case 'hard':
            return 'bg-red-500';
        default:
            return 'bg-gray-500';
    }
}
