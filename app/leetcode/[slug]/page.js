import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import matter from 'gray-matter';

import Giscus from '@/components/Giscus'

const COLOR_MAP = {
    'Easy': 'green-500',
    'Medium': 'yellow-700',
    'Hard': '#f5385d'
}


async function getMarkdownContent(fileName) {
    const filePath = path.join(process.cwd(), 'public', 'leetcode', fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(html).process(content);
    const htmlContent = processedContent.toString();

    return { htmlContent, data };
}

export default async function ArticlePage({ params }) {
    const { slug } = params;
    const { htmlContent, data } = await getMarkdownContent(`${slug}.md`);

    return (
        <div className="flex flex-col items-center mb-10 font-sans pr-10 pl-10">
            <h1 className="text-5xl font-extrabold uppercase mb-6 text-center">
                {data.title || slug.replace('-', ' ')}
            </h1>
            <div className="w-full p-8 rounded-lg shadow-lg dark:bg-gray-900">
                <div className="flex items-center mb-4">
                    <span className="text-lg font-medium mr-4">Difficulty:</span>
                    <span className={`inline-block px-4 py-1 text-sm font-semibold rounded-full bg-${COLOR_MAP[data.level]}`}>
                        {data.level || 'Unknown'}
                    </span>
                </div>
                <div className="prose lg:prose-xl" dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
            <Giscus />
        </div>
    );
}

