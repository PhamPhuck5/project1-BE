// models/user.js
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Task extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }

  Task.init(
    {
      name: {
        type: DataTypes.STRING(100), // max 100 char
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }, //user_id
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      week: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,
      }, //for index, don't send to user
      connect: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Task",
      tableName: "tasks",
    }
  );

  return Task;
};
