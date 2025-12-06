import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class UserGroup extends Model {
    static associate(models) {
      this.belongsTo(models.Group, {
        foreignKey: "groupId",
      });
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }

  UserGroup.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("REQUESTED", "MEMBER"),
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
