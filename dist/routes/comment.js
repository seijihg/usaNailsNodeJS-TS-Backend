"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const comment_1 = require("../controllers/comment");
const router = express_1.default.Router();
router.post("/comment", [express_validator_1.check("content").escape()], comment_1.createComment);
exports.default = router;
