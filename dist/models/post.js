"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../utils/database");
const comment_1 = __importDefault(require("./comment"));
const Post = database_1.sequelize.define("post", {
    // Model attributes are defined here
    id_post: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
// Other model options go here
});
// `sequelize.define` also returns the model
console.log("Post: ", Post === database_1.sequelize.models.post); // true
database_1.sequelize.models.post.hasMany(comment_1.default);
database_1.sequelize.models.comment.belongsTo(Post);
exports.default = database_1.sequelize.models.post;
