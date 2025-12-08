import db from "../../models/index.js";
import { canConnect } from "./roleService.js";

const UserCategory = db.UserCategory;

export async function checkFollowedCategory(userId, categoryId) {
  const exist = await UserCategory.findOne({
    where: { userId, categoryId },
  });
  return !!exist;
}

export async function followCategory(userId, categoryId) {
  const exist = await UserCategory.findOne({
    where: { userId, categoryId },
  });

  if (exist) return exist;
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
