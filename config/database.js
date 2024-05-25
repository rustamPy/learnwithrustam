import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', false);
    if (connected) {
        console.log('already connected')
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
        connected = true;
    } catch (error) {
        console.error(error)
    }
}

export default connectDB;