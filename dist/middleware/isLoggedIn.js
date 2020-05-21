"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isLoggedIn = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        const error = new Error("Not Authenticated.");
        res.status(401).json({ error: error.message });
        return;
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
    if (!decodedToken) {
        const error = new Error("Not Authenticated.");
        res.status(401).json({ error: error.message });
        return;
    }
    req.userId = decodedToken.userId;
    next();
};
exports.default = isLoggedIn;
