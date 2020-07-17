import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user";
import { transporter } from "../utils/emailTransporter";
import { validationResult } from "express-validator";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log("hit");
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user === null) {
      const err = new Error("User does not exist.");
      throw err;
    }

    const isPassCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isPassCorrect) {
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );
      res.json({ user: user, token: token });
    } else {
      const err = new Error("Wrong password.");
      throw err;
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findOne({
    where: { email: req.body.email },
  });

  if (!user) {
    res.json({ error: "User doest not exist" });
    return;
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_PASSWORD_RECOVERY as string,
    { expiresIn: "1h" }
  );

  let info = await transporter
    .sendMail({
      from: '"USA Nails - Berkhamsted" <no-reply@usa-nails.co.uk>', // sender address
      to: user.email, // list of receivers
      subject: "Welcome to USA Nails - Berkhamsted est 2007", // Subject line
      text: `We heard that you lost your USA Nails password. Sorry about that! \n \n But don’t worry! You can use the following link to reset your password: \n \n https://usa-nails.co.uk/reset/${token} \n \nIf you don’t use this link within 1 hours, it will expire. To get a new password reset link, visit https://usa-nails.co.uk/ \n \n Thanks, \n The USA Nails Team`,
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json("Something wrong during sending email");
      console.log(process.env.EMAIL_USER);
      return;
    });

  console.log("Message sent: %s", info.messageId);

  res.json(`Message sent at ${new Date()}`);
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  const resetToken = req.body.token;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  let decodedToken;

  try {
    decodedToken = jwt.verify(
      resetToken,
      process.env.JWT_PASSWORD_RECOVERY as string
    ) as { userId: string; email: string; iat: string; exp: string };
  } catch (error) {
    res.status(500).json({ error: "Link has expired." });
    return;
  }

  if (!decodedToken) {
    const error = new Error("Not Authenticated.");
    res.status(401).json({ error: error.message });
    return;
  }

  const user = await User.findByPk(decodedToken.userId);
  user.password = hash;
  user.save();
  res.json("Password updated");
};
