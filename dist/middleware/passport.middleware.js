"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const mongo_schema_1 = require("../db/mongo-schema");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
passport_1.default.use(new passport_local_1.Strategy({ usernameField: "email", passwordField: "password" }, async (email, password, done) => {
    console.log("🔹 Passport: Authenticating user...");
    try {
        const user = await mongo_schema_1.User.findOne({ email });
        if (!user) {
            console.log("❌ User not found");
            return done(null, false, { message: "User not found" });
        }
        const isPasswordMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            console.log("❌ Incorrect password");
            return done(null, false, { message: "Incorrect password" });
        }
        console.log("✅ Authentication successful:", user.email);
        return done(null, user);
    }
    catch (error) {
        console.log("❌ Authentication error:", error);
        return done(error);
    }
}));
passport_1.default.serializeUser((user, done) => {
    console.log("🔹 Serializing user:", user.email);
    done(null, user._id.toString());
});
passport_1.default.deserializeUser(async (id, done) => {
    console.log("🔹 Deserializing user...");
    try {
        const user = await mongo_schema_1.User.findById(id);
        if (!user) {
            console.log("❌ User not found in database");
            return done(null, false);
        }
        console.log("✅ User found:", user.email);
        done(null, user);
    }
    catch (error) {
        console.log("❌ Deserialization error:", error);
        done(error, null);
    }
});
exports.default = passport_1.default;
