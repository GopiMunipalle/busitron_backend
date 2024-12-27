import User from "../models/userModel";
import { Request, Response } from "express";

export async function createUser(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({ error: "User already exist" });
      return;
    }
    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ error: "User not found" });
      return;
    }
    if (user.password !== password) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
