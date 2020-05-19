import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import Comment from "./comment";

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
  },
  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
console.log("User: ", User === sequelize.models.User); // true

sequelize.models.User.hasMany(Comment);

export default sequelize.models.User;
