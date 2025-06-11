import { Router } from "express";
import { auth } from "../middleware/authMiddleware";
import {
  addFavourite,
  getFavourites,
  removeFavourite,
} from "../controllers/favouriteController";

const router = Router();

router.post("/:id", auth, addFavourite); // Add property to favorites
router.get("/", auth, getFavourites);    // Get list of favorites
router.delete("/:id", auth, removeFavourite); // Remove property from favorites

export default router;
