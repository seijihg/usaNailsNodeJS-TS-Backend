"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./utils/database");
const app = express_1.default();
const port = 8080;
database_1.sequelize
    .authenticate()
    .then(() => {
    console.log("Connection has been established successfully.");
    database_1.sequelize
        .sync({ force: true })
        .then(() => {
        app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
    })
        .catch(console.log);
})
    .catch(() => {
    console.error("Unable to connect to the database:");
});
