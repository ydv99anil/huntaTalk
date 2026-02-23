import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import {
  acceptFriendRequest,
  getFriendRequests,
  getOutgoingFriendReqs,
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
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendReqs)


export default router;
