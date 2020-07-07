import { Request, Response, NextFunction } from "express";
import { Fields } from "formidable";
import cloudinary from "cloudinary";
const formidable = require("formidable");
import User from "../models/user";

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
  const form = formidable({ multiples: false });

  form.parse(req, (err: Error, fields: Fields, files: any) => {
    if (err) {
      next(err);
      return;
    }
    const fileName = `usanails/avatar/${fields?.name}` as string;
    const filePath = files.file.path;
    console.log(fileName);

    cloudinary.v2.uploader.destroy(fileName, (error: any, result: any) => {
      if (error) {
        res.status(408).json(error);
        return;
      }
      cloudinary.v2.uploader.upload(
        filePath,
        { folder: "usanails/avatar" },
        async (error: any, result: any) => {
          const user = await User.findByPk(fields.userId);

          if (error || user === null) {
            res.status(408).json("Error uploading or user not found");
            return;
          }
          user.avatar = result.url;
          user.save();
          res.json(user);
        }
      );
    });
  });
};
