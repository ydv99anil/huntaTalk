import express from "express";
// import dotenv from "dotenv";

// dotenv.config();
// Instead we can write:
import "dotenv/config";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoute.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());

// not a good method
// app.get("/api/auth/signup", (req, res) => {
//   res.send("Signup Route");
// });

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Server is running on this Port:", PORT);
  connectDB();
});
