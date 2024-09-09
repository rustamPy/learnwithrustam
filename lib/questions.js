export async function getQuestions(id = null, fileName = null) {
    const url = new URL('/api/leetcode', process.env.NEXT_PUBLIC_BASE_URL);
    if (id) url.searchParams.append('id', id);
    if (fileName) url.searchParams.append('fileName', fileName);

    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error('Failed to fetch questions');
    }
    return response.json();
}