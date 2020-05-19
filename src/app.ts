import express from "express";
import { sequelize } from "./utils/database";

import userRouter from "./routes/user";
import commentRouter from "./routes/comment";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(userRouter);
app.use(commentRouter);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    sequelize
      .sync({ force: true })
      .then((res) => {
        app.listen(port);
      })
      .catch(console.log);
  })
  .catch(() => {
    console.error("Unable to connect to the database:");
  });
