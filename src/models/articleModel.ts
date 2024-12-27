import mongoose, { Schema } from "mongoose";
import { IUser } from "./userModel";

type Status = "draft" | "published";

interface IArticle {
  title: string;
  content: string;
  author: IUser;
  status: Status;
  favorites: boolean;
  history: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema: Schema = new Schema<IArticle>(
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
    favorites: {
      type: Boolean,
      default: false,
    },
    history: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Article = mongoose.model<IArticle>("Article", ArticleSchema);

export default Article;
