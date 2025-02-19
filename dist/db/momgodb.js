"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URI = process.env.MONGO_URI;
console.log("MONGO_URI:", MONGO_URI);
const connectMongDB = async () => {
    try {
        await mongoose_1.default.connect("mongodb+srv://rajshriyanshu:raaaj159@idp-users.tmdi3.mongodb.net/?retryWrites=true&w=majority&appName=idp-users", {});
        console.log("Connected to MongoDB Atlas");
    }
    catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit process with failure
    }
};
exports.connectMongDB = connectMongDB;
