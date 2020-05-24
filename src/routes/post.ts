import express from "express";
import { getAllPosts, getPost } from "../controllers/post";

const router = express.Router();

router.get("/posts", getAllPosts);
router.get("/post/:id", getPost);

export default router;
