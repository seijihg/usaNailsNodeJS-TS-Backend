"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const database_1 = require("./utils/database");
const user_1 = __importDefault(require("./routes/user"));
const comment_1 = __importDefault(require("./routes/comment"));
const post_1 = __importDefault(require("./routes/post"));
const authentication_1 = __importDefault(require("./routes/authentication"));
const upload_1 = __importDefault(require("./routes/upload"));
const app = express_1.default();
const port = process.env.PORT || 8080;
//-- CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
//--
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api_v1", user_1.default);
app.use("/api_v1", comment_1.default);
app.use("/api_v1", post_1.default);
app.use("/api_v1", authentication_1.default);
app.use("/api_v1", upload_1.default);
database_1.sequelize
    .authenticate()
    .then(() => {
    console.log(`Connection has been established successfully at port: ${port}
      `);
    app.listen(port);
})
    .catch(() => {
    console.error("Unable to connect to the database:");
});
