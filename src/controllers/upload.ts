import { Request, Response, NextFunction } from "express";
import { Fields } from "formidable";
import cloudinary from "cloudinary";
const formidable = require("formidable");

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const uploadAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  const form = formidable({ multiples: false });

  form.parse(req, (err: Error, fields: Fields, files: any) => {
    if (err) {
      next(err);
      return;
    }
    const fileName = fields?.name as string;
    const filePath = files[""].path;

    cloudinary.v2.uploader.destroy(fileName, (error: any, result: any) => {
      console.log(error, result);

      if (error) {
        res.status(408).json(error);
        return;
      }

      cloudinary.v2.uploader.upload(filePath, (error: any, result: any) => {
        console.log(error, result);
        if (error) {
          res.status(408).json(error);
          return;
        }
        res.json(result);
      });
    });
  });
};
