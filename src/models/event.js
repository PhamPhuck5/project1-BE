// models/user.js
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Event extends Model {
    static associate(models) {
      // define association here
    }
  }

  Event.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      creator: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }, //index
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("GROUP_FIXED", "GROUP_EVENT", "PERSIONAL"),
        allowNull: false,
      },
      group: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
