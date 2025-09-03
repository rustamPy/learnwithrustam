'use client';
import React, { useState, useEffect } from 'react';

const SimpleBlogPage = () => {
    const [articles, setArticles] = useState([]);
    const [markdownInput, setMarkdownInput] = useState('');
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [currentFilter, setCurrentFilter] = useState('all');

    // Sample articles
    const sampleArticles = [
        {
            markdown: `# My First Blog Post

Published on *March 10, 2024* | Category: **General**

This is a simple blog post, written in plain markdown.

- Old style
- No fancy CSS
- Just words and thoughts.`,
            category: 'general',
            year: '2024',
            date: '2024-03-10',
            author: 'Blogger',
            readTime: '2 min read'
        }
    ];

    useEffect(() => {
        setArticles(sampleArticles);
        setFilteredArticles(sampleArticles);
    }, []);

    const parseMarkdown = (markdown) => {
        let html = markdown
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/`([^`]+)`/gim, '<code>$1</code>')
            .replace(/^- (.*$)/gim, '<li>$1</li>')
            .replace(/\n\n/gim, '</p><p>');

        return '<p>' + html + '</p>';
    };

    const addArticle = () => {
        if (!markdownInput.trim()) return;
        const article = {
            markdown: markdownInput,
            category: 'general',
            year: new Date().getFullYear().toString(),
            date: new Date().toISOString().split('T')[0],
            author: 'Anonymous',
            readTime: Math.ceil(markdownInput.split(' ').length / 200) + ' min read'
        };
        const newArticles = [article, ...articles];
        setArticles(newArticles);
        setFilteredArticles(newArticles);
        setMarkdownInput('');
    };

    return (
        <div className="container">
            <h1>My Simple Blog</h1>
            <p>Welcome to my old-style blog. Just words, plain and simple.</p>

            <h2>Write a Post</h2>
            <textarea
                value={markdownInput}
                onChange={(e) => setMarkdownInput(e.target.value)}
                placeholder="Write something..."
            />
            <br />
            <button onClick={addArticle}>Publish</button>

            <h2>Posts</h2>
            {filteredArticles.map((article, index) => (
                <div key={index} className="post">
                    <div className="meta">
                        <small>{article.date} | {article.author} | {article.readTime}</small>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: parseMarkdown(article.markdown) }} />
                </div>
            ))}

            <style jsx>{`
                .container {
                    max-width: 700px;
                    margin: 0 auto;
                    padding: 20px;
                    font-family: Georgia, "Times New Roman", serif;
                    background: white;
                    color: black;
                }
                textarea {
                    width: 100%;
                    height: 120px;
                    margin: 10px 0;
                    font-family: inherit;
                    font-size: 14px;
                }
                button {
                    padding: 6px 12px;
                    margin-bottom: 20px;
                    cursor: pointer;
                }
                .post {
                    border-top: 1px solid #ccc;
                    padding-top: 15px;
                    margin-top: 15px;
                }
                .meta {
                    font-size: 12px;
                    color: gray;
                    margin-bottom: 10px;
                }
                h1, h2, h3 {
                    margin-top: 20px;
                }
                code {
                    background: #eee;
                    padding: 2px 4px;
                }
            `}</style>
        </div>
    );
};

export default SimpleBlogPage;
