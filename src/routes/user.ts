import express from "express";
import { getUsers, createUser } from "../controllers/user";
import { check } from "express-validator";

const router = express.Router();

router.get("/users", getUsers);
router.post(
  "/user",
  [
    // username must be an email
    check("email")
      .normalizeEmail({ gmail_convert_googlemaildotcom: true })
      .trim()
      .isEmail()
      .withMessage("Please input an email"),
    // password must be at least 5 chars long and contains a special character
    check("password")
      .isLength({ min: 5 })
      .withMessage("Must be at least 5 chars long")
      .matches(/(?=.*[!@#$%^&*])(?=.*\d)/)
      .withMessage("Must contain a number and at least one special character"),
  ],
  createUser
);

export default router;
