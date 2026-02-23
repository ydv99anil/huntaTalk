import express from "express";
import { login, logout, onboard, signup } from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/onboarding", protectRoute, onboard);

// chech if user is logged in
// router.get("/me", protectRoute, (res, res) => {
//     res.status(200).json({success: true, user: requestAnimationFrame.user});
// });

export default router;
