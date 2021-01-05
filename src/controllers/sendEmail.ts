import { Request, Response, NextFunction } from "express";
import { transporter } from "../utils/emailTransporter";

export const contactEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let info = await transporter.sendMail(
      {
        from: '"USA Nails - Berkhamsted" <no-reply@usa-nails.co.uk>', // sender address
        to: "contact@usa-nails.co.uk", // list of receivers
        subject: `Contact form USA Nails - Sender is ${req.body.name}`, // Subject line
        text: `From ${req.body.name} and the email: ${req.body.email}. Message: ${req.body.content}`,
      },
      (err, info) => {
        if (err) {
          res.status(404).json(err);
          return;
        }
        res.json(info);
      }
    );
  } catch (err) {
    res.status(404).json(err);
  }
};
