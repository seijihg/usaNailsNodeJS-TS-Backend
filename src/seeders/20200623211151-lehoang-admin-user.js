"use strict";
require("dotenv").config();
const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(process.env.SEED_ADMIN_PASS, salt);

console.log(hash);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        email: "seiji@o2.pl",
        password: hash,
        title: "mr",
        firstName: "Le H",
        lastName: "Ngo",
        dob: null,
        avatar: null,
        confirmed: true,
        admin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
