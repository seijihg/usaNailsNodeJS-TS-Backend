"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const post_1 = require("../controllers/post");
const router = express_1.default.Router();
router.get("/posts", [express_validator_1.check("content").escape()], post_1.getAllPosts);
exports.default = router;
