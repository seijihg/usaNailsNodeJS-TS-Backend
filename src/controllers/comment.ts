import Comment from "../models/comment";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const comment = await Comment.create({ content: req.body.content });
    res.json(comment);
  } catch (err) {
    res.status(400).json(err.errors);
  }
};
