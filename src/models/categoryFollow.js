import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class UserCategory extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
      this.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });
    }
  }

  UserCategory.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "UserCategory",
      tableName: "user_categories",
    }
  );

  return UserCategory;
};
