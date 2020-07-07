import { DataTypes, Model, BuildOptions } from "sequelize";
import { sequelize } from "../utils/database";

interface ICommentModel extends Model {
  content: string;
  like: number;
}

// Need to declare the static model so `findOne` etc. use correct types.
type CommentModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ICommentModel;
};

const Comment = <CommentModelStatic>sequelize.define(
  "comment",
  {
    // Model attributes are defined here
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
console.log("Comment: ", Comment === sequelize.models.comment); // true

export default sequelize.models.comment;
