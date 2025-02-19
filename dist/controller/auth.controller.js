"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.signIn = exports.signUp = void 0;
const mongo_schema_1 = require("../db/mongo-schema");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUp = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }
    const existingUser = await mongo_schema_1.User.findOne({ email });
    if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
    }
    const salt = await bcryptjs_1.default.genSalt(10);
    const hashedPassword = await bcryptjs_1.default.hash(password, salt);
    const newUser = new mongo_schema_1.User({ name, email, password: hashedPassword });
    await newUser.save();
    const token = jsonwebtoken_1.default.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ message: "User registered successfully", token, user: newUser });
};
exports.signUp = signUp;
const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await mongo_schema_1.User.findOne({ email });
    if (!user) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ message: "Login successful", token, user });
};
exports.signIn = signIn;
const me = async (req, res) => {
    const userId = req.user?.id;
    const user = await mongo_schema_1.User.findById(userId);
    res.status(200).json({ user });
};
exports.me = me;
