"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComment = void 0;
const post_1 = __importDefault(require("../models/post"));
exports.createComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Search DB and see if post already exists. Create one if does not.
        // "created" The boolean indicating whether this instance was just created
        const [post, created] = yield post_1.default.findOrCreate({
            where: { id_post: req.body.id_post },
        });
        // Create comment after creating the post.
        post.createComment({ content: req.body.content, userId: req.userId });
        const comments = yield post.getComments();
        res.json(comments);
    }
    catch (err) {
        res.status(400).json(err.errors);
    }
});
