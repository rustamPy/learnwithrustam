
import { QuizModel } from '@/models/QuizModel';
import connectDB from '@/config/database';

export const GET = async () => {
    try {
        await connectDB();
        const data = await QuizModel.find({}).lean(); // Fetch all documents and convert to plain objects
        return Response.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}