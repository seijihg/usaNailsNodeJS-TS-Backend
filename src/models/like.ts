import { DataTypes, Model, BuildOptions } from "sequelize";
import { sequelize } from "../utils/database";
import Comment from "./comment";
import Post from "./post";

interface ILikeModel extends Model {}

// Need to declare the static model so `findOne` etc. use correct types.
type LikeModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ILikeModel;
};

const Like = <LikeModelStatic>sequelize.define(
  "Like",
  {
    // Model attributes are defined here
  },
  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
console.log("Post: ", Like === sequelize.models.Like); // true

sequelize.models.Like.belongsTo(Comment);
sequelize.models.Like.belongsTo(Post);

export default sequelize.models.Like;
