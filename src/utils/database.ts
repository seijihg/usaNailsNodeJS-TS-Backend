import { Sequelize } from "sequelize";

// 'database', 'username', 'password'

export const sequelize = new Sequelize(
  "usanails",
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: "localhost",
    dialect: "postgres",
  }
);
