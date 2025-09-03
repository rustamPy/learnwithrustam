'use client';
import React, { useState } from 'react';
import { Card, CardBody, Typography, Button } from '@material-tailwind/react';

const ArticleEditor = ({ onPublish }) => {
    const [markdownInput, setMarkdownInput] = useState('');
    const [isPreview, setIsPreview] = useState(false);

    const handlePublish = () => {
        if (!markdownInput.trim()) {
            alert('Please enter some content for your article.');
            return;
        }
        onPublish(markdownInput);
        setMarkdownInput('');
        setIsPreview(false);
    };

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
            .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
            .replace(/\n\n/gim, '</p><p class="mb-4 text-gray-700 dark:text-gray-300">');

        html = '<p class="mb-4 text-gray-700 dark:text-gray-300">' + html + '</p>';
        html = html.replace(/(<li.*<\/li>)/gim, '<ul class="list-disc ml-6 mb-4">$1</ul>');

        return html;
    };

    return (
        <Card className="mb-8 shadow-lg">
            <CardBody>
                <div className="flex justify-between items-center mb-4">
                    <Typography variant="h5" className="text-lwr-orange-color-100 flex items-center gap-2">
                        ✍️ Share Your Knowledge
                    </Typography>
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant={!isPreview ? "filled" : "outlined"}
                            onClick={() => setIsPreview(false)}
                            className="bg-gray-500 text-white"
                        >
                            Write
                        </Button>
                        <Button
                            size="sm"
                            variant={isPreview ? "filled" : "outlined"}
                            onClick={() => setIsPreview(true)}
                            className="bg-lwr-blue-color-500 text-white"
                            disabled={!markdownInput.trim()}
                        >
                            Preview
                        </Button>
                    </div>
                </div>

                {!isPreview ? (
                    <textarea
                        value={markdownInput}
                        onChange={(e) => setMarkdownInput(e.target.value)}
                        className="w-full h-48 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-vertical bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
                        placeholder="Write your article in Markdown...

Example:
# My Development Journey

Published on *March 15, 2024* | Category: **Programming**

## Introduction

Share your experiences and insights with the LWR community...

> Code is poetry written for machines but read by humans.

### Key Points
- Always write clean, readable code
- Test your applications thoroughly
- Keep learning new technologies

```javascript
const wisdom = 'Never stop learning';
console.log(wisdom);
```

## Conclusion

Remember, every expert was once a beginner. Keep coding! 🚀"
                    />
                ) : (
                    <div className="min-h-48 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <div
                            className="prose prose-lg max-w-none dark:prose-invert"
                            dangerouslySetInnerHTML={{
                                __html: parseMarkdown(markdownInput)
                            }}
                        />
                    </div>
                )}

                <div className="flex gap-3 mt-4">
                    <Button
                        onClick={handlePublish}
                        className="bg-lwr-orange-color-100 hover:bg-lwr-orange-color-200 flex items-center gap-2"
                    >
                        🚀 Publish Article
                    </Button>
                    <Button
                        onClick={() => {
                            setMarkdownInput('');
                            setIsPreview(false);
                        }}
                        variant="outlined"
                        className="border-gray-300 text-gray-600 hover:bg-gray-50"
                    >
                        Clear
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
};

export default ArticleEditor;