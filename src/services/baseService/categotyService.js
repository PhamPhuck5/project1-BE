import db from "../../models/index.js";
import { checkAdmin } from "./roleService.js";

const Category = db.Category;

export const findCategoryByGroupAndName = async (groupId, name) => {
  return await Category.findOne({
    where: { groupId, name },
  });
};
export const findCategoryByGroup = async (groupId) => {
  return await Category.findAll({
    where: { groupId },
  });
};
export async function createCategory({ userId, groupId, name, description }) {
  if (!(await checkAdmin(userId, groupId))) {
    throw new Error("don not have permission");
  }
  return await Category.create({
    groupId,
    name,
    description,
    createDate: new Date(),
  });
}

export async function deleteCategory(userId, groupId, name) {
  if (!(await checkAdmin(userId, groupId))) {
    throw new Error("don not have permission");
  }
  const categoryId = (await findCategoryByGroupAndName(groupId, name)).id;

  await db.UserCategory.destroy({
    where: { categoryId: categoryId },
  });
  return await Category.destroy({
    where: { id: categoryId },
  });
}

export async function deleteCategoryById(categoryId, transaction) {
  await db.UserCategory.destroy({
    where: { categoryId: categoryId },
    transaction: transaction,
  });
  return await Category.destroy({
    where: { id: categoryId },
    transaction: transaction,
  });
}

export async function onDeleteGroup(groupId, options = {}) {
  const listCategory = await findCategoryByGroup(groupId, options);

  for (const category of listCategory) {
    await deleteCategoryById(category.id, options.transaction);
  }

  return true;
}

export async function updateDescription(userId, groupId, name, newDescription) {
  if (!(await checkAdmin(userId, groupId))) {
    throw new Error("don not have permission");
  }
  return await Category.update(
    { description: newDescription },
    { where: { groupId, name } }
  );
}
