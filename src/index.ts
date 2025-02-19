import express from "express";
import cors from "cors";
import { connectMongDB } from "./db/momgodb";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import environmentRouter from "./route/environment.route";
import authRouter from "./route/auth.route";
import passport from 'passport'

dotenv.config(); 

const app = express();

connectMongDB(); 

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({extended: true, limit: '16kb'}))

app.use(cookieParser())

app.get("/", (req, res) => {
  res.json({sessionId: req.isAuthenticated()})
});

app.get("/health", (req, res) => {
  res.send("OK").end();
});

app.use("/auth", authRouter);
app.use("/environment", environmentRouter);


const server = app.listen(8000, () => {
  console.log("Server is running on port 8000");
});


function signalHandler(signal: string) {
  console.log(`${signal} received. Shutting down.`);
  server.close(() => {
    console.log("Express server closed. Exiting.");
    process.exit(0);
  });
}

process.on("SIGTERM", () => signalHandler("SIGTERM"));
process.on("SIGINT", () => signalHandler("SIGINT"));

process.on("warning", (e) => console.error(e.stack));
