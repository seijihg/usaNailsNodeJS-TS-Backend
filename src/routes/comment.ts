import express from "express";
import { check } from "express-validator";
import { createComment } from "../controllers/comment";

const router = express.Router();

router.post("/comment", [check("content").escape()], createComment);

export default router;
