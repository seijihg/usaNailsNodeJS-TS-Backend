"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../utils/database");
const comment_1 = __importDefault(require("./comment"));
const post_1 = __importDefault(require("./post"));
const Like = database_1.sequelize.define("Like", {
// Model attributes are defined here
}, {
// Other model options go here
});
// `sequelize.define` also returns the model
console.log("Post: ", Like === database_1.sequelize.models.Like); // true
database_1.sequelize.models.Like.belongsTo(comment_1.default);
database_1.sequelize.models.Like.belongsTo(post_1.default);
exports.default = database_1.sequelize.models.Like;
