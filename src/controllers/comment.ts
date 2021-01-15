import Post from "../models/post";
import Comment from "../models/comment";
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

export const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const comment = await Comment.findByPk(req.params.id);
  if (!comment) {
    res.status(400).json({ error: "Something is wrong try again later." });
    return;
  }

  // Check if an user can edit the comment.
  if (comment.userId !== req.userId) {
    res.status(400).json({ error: "You can't edit this comment." });
    return;
  }
  comment.content = req.body.content;
  comment.save().catch((error: any) => console.log(error.message));
  res.json(comment);
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const comment = await Comment.findByPk(req.params.id);
  if (comment.userId !== req.userId) {
    res.status(400).json({ error: "You can't delete this comment." });
    return;
  }

  await Comment.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.json({ message: "Succesfully deleted." });
};
