"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_1 = require("../controllers/upload");
const isLoggedIn_1 = __importDefault(require("../middleware/isLoggedIn"));
const router = express_1.default.Router();
router.post("/upload/avatar", isLoggedIn_1.default, upload_1.uploadAvatar);
exports.default = router;
