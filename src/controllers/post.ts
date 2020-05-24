import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import Post from "../models/post";
import Comment from "../models/comment";
import User from "../models/user";

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

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const wpId = req.params.id;

  try {
    const post = await Post.findOne({
      where: { id_post: wpId },
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "firstName", "lastName"],
            },
          ],
        },
      ],
    });

    res.json(post);
  } catch (err) {
    res.status(400).json(err.errors);
  }
};
