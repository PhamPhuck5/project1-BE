// models/user.js
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class UserGroup extends Model {
    static associate(models) {
      // define association here
    }
  }

  UserGroup.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserGroup",
      tableName: "user_groups",
    }
  );

  return UserGroup;
};
