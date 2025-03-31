import express, { Application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dbConnect from "./config/dbConnect";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import applicationRoutes from "./routes/applications";

dotenv.config(); // ✅ Load environment variables
console.log("🔹 Loaded ENV variables:", process.env.CONNECTION_STRING ? "✅ Yes" : "❌ No");


dbConnect(); // ✅ Connect to MongoDB

const app: Application = express();

// ✅ Middleware
app.use(express.json()); 
app.use("/api/application", applicationRoutes);
// ✅ Mount Routes
app.use("/api/auth", authRoutes); // Make sure the route is accessible
app.use("/api/users", userRoutes); // Make sure the route is accessible

// ✅ Start server
const PORT: number = Number(process.env.PORT) || 7002;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
