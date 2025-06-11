import { Router } from "express";
import { auth } from "../middleware/authMiddleware";
import {
  createProperty,
  getProperties,
  updateProperty,
  deleteProperty,
  advancedSearch,
} from "../controllers/propertyController";

const router = Router();

router.post("/", auth, createProperty); // Create property
router.get("/", getProperties); // Basic get all with caching
router.get("/search", advancedSearch); // Advanced filters
router.put("/:id", auth, updateProperty); // Update property by ID (only by creator)
router.delete("/:id", auth, deleteProperty); // Delete property by ID (only by creator)

export default router;
