import db from "../../models/index.js";
import { canConnect } from "./roleService.js";

const UserCategory = db.UserCategory;

export async function followCategory(userId, categoryId) {
  // Kiểm tra xem đã follow chưa
  const exist = await UserCategory.findOne({
    where: { userId, categoryId },
  });

  if (exist) return exist; // đã follow rồi thì trả về luôn
  if (!(await canConnect(userId, categoryId))) {
    throw new Error("don not have permission");
  }
  return await UserCategory.create({
    userId,
    categoryId,
  });
}

export async function unfollowCategory(userId, categoryId) {
  return await UserCategory.destroy({
    where: { userId, categoryId },
  });
}
export async function onDeleteCategory(userId, categoryId) {
  return await UserCategory.destroy({
    where: { categoryId },
  });
}

export async function getFollowedCategories(userId) {
  return await UserCategory.findAll({
    where: { userId },
  });
}

export async function getUsersFollowing(categoryId) {
  return await UserCategory.findAll({
    where: { categoryId },
  });
}
