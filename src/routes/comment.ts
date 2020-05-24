import express from "express";
import { check } from "express-validator";
import { createComment } from "../controllers/comment";
import isLoggedIn from "../middleware/isLoggedIn";

const router = express.Router();

router.post("/comment", isLoggedIn, [check("content").escape()], createComment);

export default router;
