// models/user.js
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Event extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "creatorId",
      });
      this.belongsTo(models.category, {
        foreignKey: "categoryId",
      });
    }
  }

  Event.init(
    {
      name: {
        type: DataTypes.STRING(100), // max 100 char
        allowNull: false,
      },
      creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      length: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Event",
      tableName: "events",
    }
  );

  return Event;
};
