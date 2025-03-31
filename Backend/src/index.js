import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to the database before starting the server
connectDB();

// ✅ CORS Configuration (Allow Frontend to Access API)
const corsOptions = {
    origin: "http://localhost:5173", // Allow frontend requests
    credentials: true,  // Allow cookies & authentication headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRoutes);

// ✅ Handle Preflight CORS Requests
app.options("*", cors(corsOptions));

// ✅ Global Error Handler (for catching server-side errors)
app.use((err, req, res, next) => {
    console.error("🚨 Server Error:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
