import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const Uri = process.env.DB_URI;
        const conn = await mongoose.connect(Uri);
        console.log(`MongoDB connected to ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

mongoose.connection.on("disconnect", () => console.warn("MongoDB disconnected"));

export default connectDB;