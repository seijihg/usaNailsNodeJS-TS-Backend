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
exports.loginUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
exports.loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ where: { email: req.body.email } });
        const isPassCorrect = yield bcryptjs_1.default.compare(req.body.password, user.password);
        if (user === null) {
            const err = new Error("User does not exist.");
            throw err;
        }
        if (isPassCorrect) {
            const token = jsonwebtoken_1.default.sign({
                userId: user.id,
                email: user.email,
            }, process.env.JWT_SECRET, { expiresIn: "7d" });
            res.json({ user: user, token: token });
        }
        else {
            const err = new Error("Wrong password.");
            throw err;
        }
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
