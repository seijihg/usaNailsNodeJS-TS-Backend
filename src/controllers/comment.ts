import Comment from "../models/comment";
import Post from "../models/post";
import { Request, Response, NextFunction } from "express";
import { validationResult, check } from "express-validator";

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [post, created] = await Post.findOrCreate({
      where: { id_post: req.body.id_post },
    });

    post.createComment({ content: req.body.content, UserId: 1 });
    res.json(post);
  } catch (err) {
    res.status(400).json(err.errors);
  }
};
