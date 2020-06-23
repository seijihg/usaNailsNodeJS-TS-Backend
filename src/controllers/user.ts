import User from "../models/user";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import Comment from "../models/comment";
import jwt from "jsonwebtoken";
import { transporter } from "../utils/emailTransporter";

const emailContent = `<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans&display=swap");

@font-face {
  font-family: "Alice";
  font-style: normal;
  font-display: swap;
  src: url(https://usa-nails.co.uk/assets/fonts/Alice-Regular.ttf);
}
@font-face {
  font-family: "Font-Awesome";
  font-style: normal;
  font-display: swap;
  src: url(https://usa-nails.co.uk/assets/fonts/fontawesome-webfont.woff);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 16px;
  line-height: 1.5;
  font-family: "Open Sans", sans-serif;
}

p {
  font-size: 0.85em;
  color: #9b9b9b;
}

h1,
h2,
h3,
h4 {
  font-family: Alice;
  font-weight: 200;
  letter-spacing: 0.1em;
  color: #99525d;
}
h1 {
  font-size: 1.2em;
}
h2 {
  font-size: 1em;
}
h3 {
  font-size: 0.8em;
}
h4 {
  font-size: 0.7em;
}
.outer {
  padding: 2rem;
  border: solid 1px #f2a69a;
}
.main-body {
  background: #fafafa;
  margin: auto;
  width: 600px;
  padding: 1rem;
  margin-top: 5rem;
}
.logo-wrap {
  text-align: center;
  margin-bottom: 2rem;
}
.logo {
  width: 250px;
  margin-bottom: 2rem;
}
</style>

<div class="main-body">
<div class="outer">
  <div class="logo-wrap">
    <a href="https://www.usa-nails.co.uk" target="_blank">
      <img
        class="logo"
        src="https://usa-nails.co.uk/assets/img/usanails_logo_ver2.png"
        alt="usa_nails_logo"
      />
    </a>
    <h2>Welcome to the</h2>
    <h1>World of Beauty</h1>
    <h1>at USA Nails Berkhamsted est. 2007</h1>
  </div>
  <p>
    You are now our member and will be first to know about our latest styles,
    exclusive offers, and much more.
  </p>
</div>
</div>
`;

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await User.findAll({ include: Comment }).catch((err: any) =>
    res.status(400).json({ error: err.message })
  );

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

    let info = await transporter.sendMail({
      from: '"USA Nails - Berkhamsted" <no-reply@usa-nails.co.uk>', // sender address
      to: user.email, // list of receivers
      subject: "Welcome to USA Nails - Berkhamsted est 2007", // Subject line
      text: `Welcome to USA Nails Berkhamsted est 2007. You are now our member and will be first to know about our latest styles,
      exclusive offers, and much more.`,
      html: emailContent, // html body
    });
    console.log("Message sent: %s", info.messageId);

    res.json({ user: user, token: token });
  } catch (err) {
    const errors: string[] = [];
    err.errors.forEach((elem: any) => errors.push(elem.message));
    res.status(400).send({ errors: errors });
  }
};
