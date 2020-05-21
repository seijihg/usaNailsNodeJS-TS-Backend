"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../utils/database");
const comment_1 = __importDefault(require("./comment"));
const User = database_1.sequelize.define("User", {
    // Model attributes are defined here
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
    },
    dob: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
// Other model options go here
});
// `sequelize.define` also returns the model
console.log("User: ", User === database_1.sequelize.models.User); // true
database_1.sequelize.models.User.hasMany(comment_1.default);
exports.default = database_1.sequelize.models.User;
