import { DataTypes, Model, BuildOptions } from "sequelize";
import { sequelize } from "../utils/database";
import Comment from "./comment";

interface IUserModel extends Model {
  email: string;
  password: string;
  title: string;
  firstName: string;
  lastName: string;
  dob: Date;
  admin: boolean;
}

// Need to declare the static model so `findOne` etc. use correct types.
type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IUserModel;
};

const User = <UserModelStatic>sequelize.define(
  "user",
  {
    // Model attributes are defined here
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    avatar: {
      type: DataTypes.STRING,
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
    },
    dob: {
      type: DataTypes.DATE,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
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
console.log("User: ", User === sequelize.models.user); // true

sequelize.models.user.hasMany(Comment);
sequelize.models.comment.belongsTo(User);

export default sequelize.models.user;
