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
exports.updateUser = exports.createUser = exports.getMe = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const comment_1 = __importDefault(require("../models/comment"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const emailTransporter_1 = require("../utils/emailTransporter");
const emailTemplates_1 = require("../utils/emailTemplates");
exports.getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll({ include: comment_1.default }).catch((err) => res.status(400).json({ error: err.message }));
    res.json(users);
});
exports.getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({
        where: { id: req.params.id },
    }).catch((err) => res.status(400).json({ error: err.message }));
    if (user === null) {
        const error = new Error("User does not exist");
        res.status(400).json({ error: error.message });
    }
    res.json(user);
});
exports.getMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({
        where: { id: req.userId },
    }).catch((err) => res.status(400).json({ error: err.message }));
    if (user === null) {
        const error = new Error("User does not exist");
        res.status(400).json({ error: error.message });
    }
    delete user.dataValues.password;
    res.json(user);
});
exports.createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hash = bcryptjs_1.default.hashSync(req.body.password, salt);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const user = yield user_1.default.create({ email: req.body.email, password: hash });
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            email: user.email,
        }, process.env.JWT_SECRET, { expiresIn: "7d" });
        let info = yield emailTransporter_1.transporter.sendMail({
            from: '"USA Nails - Berkhamsted" <no-reply@usa-nails.co.uk>',
            to: user.email,
            subject: "Welcome to USA Nails - Berkhamsted est 2007",
            text: `Welcome to USA Nails Berkhamsted est 2007. You are now our member and will be first to know about our latest styles,
      exclusive offers, and much more.`,
            html: emailTemplates_1.userRegisteredEmail,
        });
        console.log("Message sent: %s", info.messageId);
        res.json({ user: user, token: token });
    }
    catch (err) {
        const errors = [];
        err.errors.forEach((elem) => errors.push(elem.message));
        res.status(400).send({ errors: errors });
    }
});
exports.updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findByPk(req.params.id);
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.title = req.body.title.value;
    user.dob = req.body.dob;
    user.save();
    res.json("hit");
});
