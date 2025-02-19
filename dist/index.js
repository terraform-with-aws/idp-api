"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const momgodb_1 = require("./db/momgodb");
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const environment_route_1 = __importDefault(require("./route/environment.route"));
const auth_route_1 = __importDefault(require("./route/auth.route"));
const passport_1 = __importDefault(require("passport"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, momgodb_1.connectMongDB)();
const server = app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(passport_1.default.initialize());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true, limit: '16kb' }));
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.json({ sessionId: req.isAuthenticated() });
});
app.checkout("/health", (req, res) => {
    res.send("OK").end();
});
app.use("/auth", auth_route_1.default);
app.use("/environment", environment_route_1.default);
function signalHandler(signal) {
    console.log(`${signal} received. Shutting down.`);
    server.close(() => {
        console.log("Express server closed. Exiting.");
        process.exit(0);
    });
}
process.on("SIGTERM", () => signalHandler("SIGTERM"));
process.on("SIGINT", () => signalHandler("SIGINT"));
process.on("warning", (e) => console.error(e.stack));
