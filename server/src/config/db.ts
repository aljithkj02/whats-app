import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URL || 'mongo_url');
    console.log('MongoDB connected Successfully');
}