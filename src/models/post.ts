import { DataTypes, Model, BuildOptions } from "sequelize";
import { sequelize } from "../utils/database";
import Comment from "./comment";

interface IPostModel extends Model {
  id_post: string;
}

// Need to declare the static model so `findOne` etc. use correct types.
type PostModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IPostModel;
};

const Post = <PostModelStatic>sequelize.define(
  "Post",
  {
    // Model attributes are defined here
    id_post: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
console.log("Post: ", Post === sequelize.models.Post); // true

sequelize.models.Post.hasMany(Comment);

export default sequelize.models.Post;
