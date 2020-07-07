import { Request, Response, NextFunction } from "express";
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
  const slug = req.params.slug;

  try {
    const post = await Post.findOne({
      where: { id_post: slug },
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "firstName", "lastName", "email"],
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
