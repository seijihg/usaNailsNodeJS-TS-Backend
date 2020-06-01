import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Request, Response, NextFunction } from "express";
import { sequelize } from "./utils/database";
import userRouter from "./routes/user";
import commentRouter from "./routes/comment";
import postRouter from "./routes/post";
import authenticationRouter from "./routes/authentication";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//-- CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
//--

app.use("/api_v1", userRouter);
app.use("/api_v1", commentRouter);
app.use("/api_v1", postRouter);
app.use("/api_v1", authenticationRouter);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    sequelize
      .sync({ force: false })
      .then((res) => {
        app.listen(port);
      })
      .catch(console.log);
  })
  .catch(() => {
    console.error("Unable to connect to the database:");
  });
