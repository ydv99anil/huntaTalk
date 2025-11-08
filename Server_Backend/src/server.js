import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";

import mongoose from "mongoose";
import User from "./models/User.js";

import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";

import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Start server and connect DB
app.listen(PORT, async () => {
  console.log("Server is running on Port:", PORT);

  try {
    // Connect to MongoDB
    const db = await connectDB();
    console.log("MongoDB Connected");

    // (Optional but safe) Clean up old invalid indexes
    const collections = await mongoose.connection.db.listCollections().toArray();
    const hasUsersCollection = collections.some((col) => col.name === "users");

    if (hasUsersCollection) {
      const indexes = await mongoose.connection.db
        .collection("users")
        .listIndexes()
        .toArray();

      const oldEmailIndex = indexes.find((idx) => idx.name === "Email_1");
      if (oldEmailIndex) {
        await mongoose.connection.db.collection("users").dropIndex("Email_1");
        console.log("Dropped old Email_1 index");
      }

      // Remove invalid Email:null documents (if any)
      const deleteResult = await mongoose.connection.db
        .collection("users")
        .deleteMany({ Email: { $exists: true } });
      if (deleteResult.deletedCount > 0) {
        console.log(`Deleted ${deleteResult.deletedCount} invalid Email docs`);
      }
    }

    // ✅ Sync indexes according to updated schema
    await User.syncIndexes();
  } catch (err) {
    console.error("MongoDB Connection or Sync Error:", err);
  }
});