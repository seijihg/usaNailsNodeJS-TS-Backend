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
exports.getPost = exports.getAllPosts = void 0;
const post_1 = __importDefault(require("../models/post"));
const comment_1 = __importDefault(require("../models/comment"));
const user_1 = __importDefault(require("../models/user"));
exports.getAllPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_1.default.findAll({
        include: [
            {
                model: comment_1.default,
            },
        ],
    });
    res.json(posts);
});
exports.getPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const wpId = req.params.id;
    try {
        const post = yield post_1.default.findOne({
            where: { id_post: wpId },
            include: [
                {
                    model: comment_1.default,
                    include: [
                        {
                            model: user_1.default,
                            attributes: ["id", "firstName", "lastName"],
                        },
                    ],
                },
            ],
        });
        res.json(post);
    }
    catch (err) {
        res.status(400).json(err.errors);
    }
});
