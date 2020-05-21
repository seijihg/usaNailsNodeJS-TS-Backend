import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface IUser {
  userId: string;
  email: string;
  iat: string;
  exp: string;
}

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error("Not Authenticated.");
    res.status(401).json({ error: error.message });
    return;
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as IUser;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  if (!decodedToken) {
    const error = new Error("Not Authenticated.");
    res.status(401).json({ error: error.message });
    return;
  }
  req.userId = decodedToken.userId;
  console.log(decodedToken);
  next();
};

export default isLoggedIn;
