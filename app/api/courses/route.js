import fs from 'fs';
import path from 'path';

// Read JSON file
const filePath = path.join(process.cwd(), 'public/courses.json');
const coursesData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// API route handler
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'), 10);

    const course = coursesData.find((course) => course.id === id);

    if (!course) {
        return new Response(JSON.stringify({ error: 'Course not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(course), { status: 200 });
}
