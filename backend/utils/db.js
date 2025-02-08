import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error('MONGO_URI is not defined');
        }
        await mongoose.connect(uri);
        console.log('Database connected successfully');
    } catch (e) {
        console.log('Error in database connection');
        console.log(e);
    }
};

// ✅ Use `export default` instead of `module.exports`
export default connectDB;
