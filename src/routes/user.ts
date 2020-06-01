import express from "express";
import { getUsers, createUser, getUser, getMe } from "../controllers/user";
import { check } from "express-validator";
import isLoggedIn from "../middleware/isLoggedIn";

const router = express.Router();

router.get("/users", getUsers);
router.get("/user/get-me/", isLoggedIn, getMe);
router.get("/user/:id", isLoggedIn, getUser);

router.post(
  "/signup",
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
