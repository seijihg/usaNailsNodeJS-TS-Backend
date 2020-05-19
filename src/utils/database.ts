import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("usanails", "lehoang", "usanails", {
  host: "localhost",
  dialect: "postgres",
});
