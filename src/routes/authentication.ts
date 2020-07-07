import express from "express";
import { loginUser } from "../controllers/authentication";
import { check } from "express-validator";

const router = express.Router();

router.post(
  "/login",
  [
    // username must be an email
    check("email")
      .normalizeEmail({ gmail_convert_googlemaildotcom: true })
      .trim()
      .isEmail()
      .withMessage("Please input an email"),
  ],
  loginUser
);

export default router;
