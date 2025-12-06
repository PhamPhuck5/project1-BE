import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Category extends Model {
    static associate(models) {
      this.belongsTo(models.Group, {
        foreignKey: "groupId",
      });
      this.hasMany(models.UserCategory, {
        foreignKey: "categoryId",
      });
      this.hasMany(models.Event, {
        foreignKey: "categoryId",
      });
    }
  }

  Category.init(
    {
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      createDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "categories",
    }
  );

  return Category;
};
