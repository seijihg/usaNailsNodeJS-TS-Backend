"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../utils/database");
const Comment = database_1.sequelize.define("Comment", {
    // Model attributes are defined here
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
// Other model options go here
});
// `sequelize.define` also returns the model
console.log("Comment: ", Comment === database_1.sequelize.models.Comment); // true
exports.default = database_1.sequelize.models.Comment;
