import express from "express";
// import dotenv from "dotenv";

// dotenv.config();
// Instead we can write:
import "dotenv/config";

import authRoutes from "./routes/authRoute.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// not a good method
// app.get("/api/auth/signup", (req, res) => {
//   res.send("Signup Route");
// });

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Server is running on this Port:", PORT);
  connectDB();
});
