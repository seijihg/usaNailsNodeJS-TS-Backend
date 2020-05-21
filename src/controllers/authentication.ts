import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    const isPassCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    console.log(process.env.JWT_SECRET);

    if (user === null) {
      const err = new Error("User does not exist.");
      throw err;
    }
    if (isPassCorrect) {
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );
      res.json({ user: user, token: token });
    } else {
      const err = new Error("Wrong password.");
      throw err;
    }
  } catch (err) {
    res.status(400).json({ errors: err.message });
  }
};
