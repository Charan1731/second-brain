import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

console.log("Connecting to MongoDB...");
if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI is not defined in .env file");
}

const connectToDB = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Connected to MongoDB");
        
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default connectToDB