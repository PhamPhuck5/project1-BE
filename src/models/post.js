// models/user.js
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Post extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "senderId",
      });
      this.belongsTo(models.Event, {
        foreignKey: "eventId",
      });
    }
  }

  Post.init(
    {
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      key: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "posts",
    }
  );

  return Post;
};
