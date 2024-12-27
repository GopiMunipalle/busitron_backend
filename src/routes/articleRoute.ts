import { Router } from "express";
import {
  createDraft,
  getArticles,
  publishArticle,
} from "../controllers/articleController";
const router = Router();

router.post("/create", createDraft);
router.put("/publish", publishArticle);
router.get("/:id", getArticles);

export default router;
