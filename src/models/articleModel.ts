import mongoose, { Schema } from "mongoose";
import { IUser } from "./userModel";

interface IArticle {
  title: string;
  content: string;
  author: IUser;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema: Schema = new Schema(
  {
    title: { type: String },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Article = mongoose.model<IArticle>("Article", ArticleSchema);

export default Article;
