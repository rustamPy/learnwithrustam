import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

export async function getMarkdownContent(fileName) {
    const filePath = path.join(process.cwd(), 'public', 'leetcode', fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    const processedContent = await remark().use(html).process(fileContents);

    return processedContent.toString();
}