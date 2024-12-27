import express, { Request, Response } from "express";
import connectDB from "./config/db";
const PORT = process.env.PORT || 5000;
import cors from "cors";

import userRoutes from "./routes/userRoutes";
import articleRoutes from "./routes/articleRoute";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/api/users", userRoutes);
app.use("/api/", articleRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
