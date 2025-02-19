"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sessionMiddleware = (0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "default-secret",
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({ mongoUrl: process.env.MONGO_URI || "mongodb+srv://rajshriyanshu:raaaj159@idp-users.tmdi3.mongodb.net/?retryWrites=true&w=majority&appName=idp-users" }), // Stores session in MongoDB
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use `true` in production with HTTPS
    },
});
exports.default = sessionMiddleware;
