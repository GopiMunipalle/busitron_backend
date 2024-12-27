import Article from "../models/articleModel";
import User from "../models/userModel";
import { Request, Response } from "express";

export async function createArticle(req: Request, res: Response) {
  try {
    const { title, content, author } = req.body;
    if (!title || !content || !author) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = await User.findById(author);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const article = await Article.create({ title, content, author });
    res.status(201).json({ data: article });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function createDraft(req: Request, res: Response) {
  const { title, content } = req.body;
  try {
    const article = await Article.create({ title, content, status: "draft" });
    res.status(200).json(article);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function publishArticle(req: Request, res: Response) {
  const { id, title, content } = req.body;
  try {
    const article = await Article.findByIdAndUpdate(id, {
      title,
      content,
      status: "published",
    });
    res.status(200).json({ message: "Article published" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getArticles(req: Request, res: Response) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(400).json({ error: "User not found" });
      return;
    }
    const articles = await Article.find({ author: user._id });
    res.status(200).json(articles);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}
