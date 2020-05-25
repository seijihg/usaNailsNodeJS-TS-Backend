"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const database_1 = require("./utils/database");
const user_1 = __importDefault(require("./routes/user"));
const comment_1 = __importDefault(require("./routes/comment"));
const post_1 = __importDefault(require("./routes/post"));
const authentication_1 = __importDefault(require("./routes/authentication"));
dotenv_1.default.config();
const app = express_1.default();
const port = 8080;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//-- CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
//--
app.use("/api_v1", user_1.default);
app.use("/api_v1", comment_1.default);
app.use("/api_v1", post_1.default);
app.use("/api_v1", authentication_1.default);
database_1.sequelize
    .authenticate()
    .then(() => {
    console.log("Connection has been established successfully.");
    database_1.sequelize
        .sync({ force: false })
        .then((res) => {
        app.listen(port);
    })
        .catch(console.log);
})
    .catch(() => {
    console.error("Unable to connect to the database:");
});
