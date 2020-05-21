import express from "express";
import { check } from "express-validator";
import { getAllPosts } from "../controllers/post";

const router = express.Router();

router.get("/posts", [check("content").escape()], getAllPosts);

export default router;
