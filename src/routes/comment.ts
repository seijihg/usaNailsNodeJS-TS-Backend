import express from "express";
import { getUsers, createUser } from "../controllers/user";
import { check } from "express-validator";

const router = express.Router();

router.post(
  "/comment",
  [
    // username must be an email
    check("content")
      .normalizeEmail({ gmail_convert_googlemaildotcom: true })
      .trim()
      .isEmail()
      .withMessage("Please input an email"),
  ],
  createUser
);

export default router;
