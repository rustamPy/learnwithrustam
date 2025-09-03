'use client';
import React from 'react';
import { Card, CardBody, Typography } from '@material-tailwind/react';

const ArticleCard = ({ article, index, totalCount, onCategoryClick }) => {
    const parseMarkdown = (markdown) => {
        let html = markdown
            .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">$1</h1>')
            .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mb-3 mt-6 text-gray-800 dark:text-gray-200">$1</h2>')
            .replace(/^### (.*$)/gim, '<h3 class="text-xl font-medium mb-2 mt-4 text-gray-700 dark:text-gray-300">$1</h3>')
            .replace(/\*\*(.*)\*\*/gim, '<strong class="font-semibold text-lwr-orange-color-100">$1</strong>')
            .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')
            .replace(/`([^`]+)`/gim, '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">$1</code>')
            .replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm">$2</code></pre>')
            .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-lwr-orange-color-100 pl-4 italic text-gray-600 dark:text-gray-400 my-4">$1</blockquote>')
            .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
            .replace(/\n\n/gim, '</p><p class="mb-4 text-gray-700 dark:text-gray-300">');

        html = '<p class="mb-4 text-gray-700 dark:text-gray-300">' + html + '</p>';
        html = html.replace(/(<li[^>]*>.*<\/li>)/gim, '<ul class="list-disc ml-6 mb-4 text-gray-700 dark:text-gray-300">$1</ul>');

        return html;
    };

    return (
        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-lwr-orange-color-100">
            <CardBody>
                <div className="flex justify-between items-start mb-4">
                    <Typography variant="small" className="text-gray-500 dark:text-gray-400">
                        Article {totalCount - index} of {totalCount} • {new Date(article.date).toLocaleDateString()}
                    </Typography>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onCategoryClick(article.category)}
                            className="px-3 py-1 bg-lwr-blue-color-20 text-lwr-blue-color-600 rounded-full text-xs hover:bg-lwr-blue-color-500 hover:text-white transition-colors"
                        >
                            {article.category.replace('-', ' ')}
                        </button>
                        <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                            {article.year}
                        </span>
                    </div>
                </div>
                <div
                    className="prose prose-lg max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{
                        __html: parseMarkdown(article.markdown)
                    }}
                />
            </CardBody>
        </Card>
    );
};

export default ArticleCard;