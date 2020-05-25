"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const comment_1 = require("../controllers/comment");
const isLoggedIn_1 = __importDefault(require("../middleware/isLoggedIn"));
const router = express_1.default.Router();
router.post("/comment", isLoggedIn_1.default, [express_validator_1.check("content").escape()], comment_1.createComment);
exports.default = router;
