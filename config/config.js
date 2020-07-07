const fs = require("fs");

module.exports = {
  development: {
    username: "lhngo",
    password: "usanails",
    database: "usanails_development",
    host: "localhost",
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
};
