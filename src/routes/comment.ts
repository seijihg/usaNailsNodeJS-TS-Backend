import express from "express";
import { check } from "express-validator";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../controllers/comment";
import isLoggedIn from "../middleware/isLoggedIn";

const router = express.Router();

router.post("/comment", isLoggedIn, [check("content").escape()], createComment);
router.put("/comment/:id", isLoggedIn, updateComment);
router.delete("/comment/:id", isLoggedIn, deleteComment);

export default router;
