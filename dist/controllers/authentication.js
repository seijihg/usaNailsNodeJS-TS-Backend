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
exports.lostPassword = exports.loginUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const emailTransporter_1 = require("../utils/emailTransporter");
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
exports.lostPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({
        where: { email: req.body.email },
    }).catch((err) => res.status(400).json({ error: err.message }));
    const token = jsonwebtoken_1.default.sign({
        userId: user.id,
        email: user.email,
    }, process.env.JWT_SECRET, { expiresIn: "1h" });
    let info = yield emailTransporter_1.transporter
        .sendMail({
        from: '"USA Nails - Berkhamsted" <no-reply@usa-nails.co.uk>',
        to: user.email,
        subject: "Welcome to USA Nails - Berkhamsted est 2007",
        text: `We heard that you lost your USA Nails password. Sorry about that!

    But don’t worry! You can use the following link to reset your password:
    
    If you don’t use this link within 1 hours, it will expire. To get a new password reset link, visit https://github.com/password_reset
    
    Thanks,
    The USA Nails Team`,
        html: "<p>HTML version of the message</p>",
    })
        .catch((error) => {
        console.log(error);
        res.status(400).json("Something wrong during sending email");
        console.log(process.env.EMAIL_USER);
        return;
    });
    console.log("Message sent: %s", info.messageId);
    res.json("Message sent: %s");
});
