"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../controllers/authentication");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router.post("/login", [
    // username must be an email
    express_validator_1.check("email")
        .normalizeEmail({ gmail_convert_googlemaildotcom: true })
        .trim()
        .isEmail()
        .withMessage("Please input an email"),
], authentication_1.loginUser);
router.post("/lost-password", authentication_1.lostPassword);
exports.default = router;
