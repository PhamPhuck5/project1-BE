import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Group, {
        foreignKey: "owner",
      });
      this.hasMany(models.UserGroup, {
        foreignKey: "userId",
      });
      this.hasMany(models.UserCategory, {
        foreignKey: "userId",
      });
      this.hasMany(models.Event, {
        foreignKey: "creatorId",
      });
      this.hasMany(models.Task, {
        foreignKey: "userId",
      });
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phonenumber: {
        type: DataTypes.CHAR(11),
        allowNull: true,
        validate: {
          len: [10, 11],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      gender: {
        type: DataTypes.ENUM("male", "female", "other"),
        allowNull: true,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
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
