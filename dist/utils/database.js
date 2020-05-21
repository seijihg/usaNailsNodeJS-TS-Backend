"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
// 'database', 'username', 'password'
exports.sequelize = new sequelize_1.Sequelize("usanails", process.env.DB_USER, process.env.DB_PASS, {
    host: "localhost",
    dialect: "postgres",
});
