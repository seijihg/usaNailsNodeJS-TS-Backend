import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import Post from "../models/post";
import Comment from "../models/comment";

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const posts = await Post.findAll({
    include: [
      {
        model: Comment,
      },
    ],
  });

  res.json(posts);
};
