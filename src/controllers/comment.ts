import Post from "../models/post";
import { Request, Response, NextFunction } from "express";

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Search DB and see if post already exists. Create one if does not.
    // "created" The boolean indicating whether this instance was just created
    const [post, created] = await Post.findOrCreate({
      where: { id_post: req.body.id_post },
    });

    // Create comment after creating the post.
    post.createComment({ content: req.body.content, userId: req.userId });
    const comments = await post.getComments();
    res.json(comments);
  } catch (err) {
    res.status(400).json(err.errors);
  }
};
