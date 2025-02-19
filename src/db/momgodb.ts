import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;
console.log("MONGO_URI:", MONGO_URI);

export const connectMongDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rajshriyanshu:raaaj159@idp-users.tmdi3.mongodb.net/?retryWrites=true&w=majority&appName=idp-users",
      {} as mongoose.ConnectOptions
    );

    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit process with failure
  }
};
