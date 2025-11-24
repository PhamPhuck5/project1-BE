// models/user.js
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Group extends Model {
    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );

  return User;
};
