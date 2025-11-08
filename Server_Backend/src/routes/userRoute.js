import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import {
  getMyFriends,
  getRecommendedUsers,
  sendFriendRequest,
} from "../controllers/userController.js";

const router = express.Router();

// applying auth middleware to all routes at once instead of apllying separately for all
router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);
router.post("/friend-request/:id", sendFriendRequest);

export default router;
