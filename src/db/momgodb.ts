import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const MONGO_URI = process.env.MONGO_URI as string;

export const connectMongDB = async () => {
  try {
    await mongoose.connect(
      MONGO_URI,
      {} as mongoose.ConnectOptions
    );

    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit process with failure
  }
};
