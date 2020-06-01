import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    dob: {
      type: DataTypes.DATE,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
console.log("User: ", User === sequelize.models.User); // true

export default sequelize.models.User;
