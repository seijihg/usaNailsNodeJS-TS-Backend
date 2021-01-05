import { Request, Response, NextFunction } from "express";
import { transporter } from "../utils/emailTransporter";

export const contactEmail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const user = await User.findOne({
  //   where: { id: req.params.id },
  // }).catch((err: Error) => res.status(400).json({ error: err.message }));

  // if (user === null) {
  //   const error = new Error("User does not exist");
  //   res.status(400).json({ error: error.message });
  // }

  transporter.sendMail(
    {
      from: '"USA Nails - Berkhamsted" <no-reply@usa-nails.co.uk>', // sender address
      to: "contact@usa-nails.co.uk", // list of receivers
      subject: `Contact form USA Nails - Sender is ${req.body.name}`, // Subject line
      text: `From ${req.body.name} and the email: ${req.body.email}. Message: ${req.body.content}`,
    },
    (err, info) => {
      console.log(err);
      console.log(info);
    }
  );

  res.json("Mail sent.");
};
