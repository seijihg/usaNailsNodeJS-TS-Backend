"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("users", "avatar", {
      type: Sequelize.DataTypes.STRING,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("users", "avatar");
  },
};
