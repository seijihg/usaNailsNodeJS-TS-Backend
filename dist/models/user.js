"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../utils/database");
const User = database_1.sequelize.define("user", {
    id: {
        type: sequelize_1.default.INTEGER,
    },
});
