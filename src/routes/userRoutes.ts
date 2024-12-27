import { createUser, login } from "../controllers/userController";
import { Router } from "express";
const route = Router();

route.post("/register", createUser);
route.post("/login", login);

export default route;
