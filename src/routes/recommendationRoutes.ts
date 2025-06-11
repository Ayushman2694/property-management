import { Router } from "express";
import { auth } from "../middleware/authMiddleware";
import {
  recommendProperty,
  getRecommendations,
} from "../controllers/recommendationController";

const router = Router();

router.post("/:id", auth, recommendProperty);   // Recommend property to another user by email
router.get("/", auth, getRecommendations);      // Get all properties recommended to logged-in user

export default router;
