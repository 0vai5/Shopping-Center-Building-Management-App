import mongoose, {connect} from 'mongoose';


export const connectDB = async () => {
    try {
        const URI = process.env.MONGO_URI;
        if(!URI) {
            console.error('MONGO_URI is not defined in environment variables');
            return;
        }
        const connection = await connect(URI!);

        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); 
    }
}