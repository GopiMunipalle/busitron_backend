import express, { Request, Response } from "express";
import connectDB from "./config/db";
const PORT = process.env.PORT || 5000;
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";

import userRoutes from "./routes/userRoutes";
import articleRoutes from "./routes/articleRoute";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads"); // Save files in the 'public/uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to avoid file name conflicts
  },
});
const upload = multer({ storage: storage });
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

app.post("/upload", upload.single("document"), (req, res) => {
  console.log("file", req.file);

  // if (req.file) {
  //   const filePath = path.join(
  //     __dirname,
  //     "public",
  //     "uploads",
  //     req.file.filename
  //   ); // Absolute path of the file

  //   // Check if the file exists using the absolute path
  //   const exists = fs.existsSync(filePath);

  //   if (!exists) {
  //     // If the file doesn't exist, you can either create it or return an error
  //     console.log("File does not exist, something went wrong with the upload.");
  //     // This part may not be necessary if Multer already uploads the file
  //     // fs.writeFileSync(filePath, '')  // Not needed unless you want to create an empty file manually
  //     res.status(400).json({ error: "file not created" });
  //     return;
  //   }

  //   // Send response with file URL
  //   res.json({
  //     message: "File uploaded successfully",
  //     fileUrl: `/uploads/${req.file.filename}`,
  //   });
  // } else {
  //   res.status(400).json({ message: "No file uploaded" });
  // }
});

// Serve the files from the 'public/uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "/public", "uploads")));

app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
