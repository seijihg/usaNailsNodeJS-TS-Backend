import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Request, Response, NextFunction } from "express";
import { sequelize } from "./utils/database";
import userRouter from "./routes/user";
import commentRouter from "./routes/comment";
import postRouter from "./routes/post";
import authenticationRouter from "./routes/authentication";
import uploadRouter from "./routes/upload";
import contactRouter from "./routes/contact";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;

//-- CORS
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders:
      "Access-Control-Allow-Headers,Access-Control-Allow-Origin,Access-Control-Request-Method,Access-Control-Request-Headers,Origin,Cache-Control,Content-Type,X-Token,X-Refresh-Token,Authorization",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

//--

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api_v1", userRouter);
app.use("/api_v1", commentRouter);
app.use("/api_v1", postRouter);
app.use("/api_v1", authenticationRouter);
app.use("/api_v1", uploadRouter);
app.use("/api_v1", contactRouter);

sequelize
  .authenticate()
  .then(() => {
    console.log(
      `Connection has been established successfully at port: ${port}
      `
    );
    app.listen(port);
  })
  .catch(() => {
    console.error("Unable to connect to the database:");
  });
