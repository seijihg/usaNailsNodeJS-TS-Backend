import User from "../models/user";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import Comment from "../models/comment";
import jwt from "jsonwebtoken";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await User.findAll({ include: Comment });
  res.json(users);
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findOne({
    where: { id: req.params.id },
  }).catch((err: Error) => res.status(400).json({ error: err.message }));

  if (user === null) {
    const error = new Error("User does not exist");
    res.status(400).json({ error: error.message });
  }
  res.json(user);
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findOne({
    where: { id: req.userId },
  }).catch((err: Error) => res.status(400).json({ error: err.message }));

  if (user === null) {
    const error = new Error("User does not exist");
    res.status(400).json({ error: error.message });
  }

  delete user.dataValues.password;
  res.json(user);
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const user = await User.create({ email: req.body.email, password: hash });
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.json({ user: user, token: token });
  } catch (err) {
    const errors: string[] = [];
    err.errors.forEach((elem: any) => errors.push(elem.message));
    res.status(400).send({ errors: errors });
  }
};
