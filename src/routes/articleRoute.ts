import { Router } from "express";
import {
  addToFavorites,
  addToHistory,
  createArticle,
  createDraft,
  getArticles,
  publishArticle,
} from "../controllers/articleController";
const router = Router();

router.post("/", createArticle);
router.put("/publish", publishArticle);
router.get("/:id", getArticles);
router.post("/draft", createDraft);

router.get("/favorites/:id", addToFavorites);
router.get("/history/:id", addToHistory);

export default router;
