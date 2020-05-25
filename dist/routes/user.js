"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const express_validator_1 = require("express-validator");
const isLoggedIn_1 = __importDefault(require("../middleware/isLoggedIn"));
const router = express_1.default.Router();
router.get("/users", user_1.getUsers);
router.get("/user/:id", isLoggedIn_1.default, user_1.getUser);
router.post("/user", [
    // username must be an email
    express_validator_1.check("email")
        .normalizeEmail({ gmail_convert_googlemaildotcom: true })
        .trim()
        .isEmail()
        .withMessage("Please input an email"),
    // password must be at least 5 chars long and contains a special character
    express_validator_1.check("password")
        .isLength({ min: 5 })
        .withMessage("Must be at least 5 chars long")
        .matches(/(?=.*[!@#$%^&*])(?=.*\d)/)
        .withMessage("Must contain a number and at least one special character"),
], user_1.createUser);
exports.default = router;
