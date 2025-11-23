
import express from "express";
import {
  createShortLink,
  getLinks,
  getLinkStats,
  deleteShortLink,
  redirectCode,
} from "../controllers/linkController.js";

const router = express.Router();

router.post("/api/links", createShortLink);
router.get("/api/links", getLinks);
router.get("/api/links/:code", getLinkStats);
router.delete("/api/links/:code", deleteShortLink);
router.get("/:code", redirectCode);

export default router;
