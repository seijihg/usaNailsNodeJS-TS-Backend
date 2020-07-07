import express from "express";
import { uploadAvatar } from "../controllers/upload";
import isLoggedIn from "../middleware/isLoggedIn";

const router = express.Router();

router.post("/upload/avatar", isLoggedIn, uploadAvatar);

export default router;
