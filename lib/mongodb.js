import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // MongoDB connection string from environment variables
const options = { ssl: true }

let client;
let clientPromise;

if (!uri) {
    throw new Error('Please add your MongoDB URI to .env.local');
}

client = new MongoClient(uri, options);
clientPromise = client.connect();


export default clientPromise;
