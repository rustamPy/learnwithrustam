import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
    try {
        const client = await clientPromise;

        const db = client.db('quiz'); // Replace with your database name
        const collection = db.collection('questions'); // Replace with your collection name

        const data = await collection.find({}).toArray();

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error fetching data' });
    }
}