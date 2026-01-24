import db from "../../models/index.js";

export const checkAdmin = async (userId, groupId) => {
  const record = await db.UserGroup.findOne({
    where: { userId, groupId, isAdmin: true },
  });

  return !!record;
};
export async function checkAdminByCategory(userId, categoryId) {
  const category = await db.Category.findOne({
    where: { id: categoryId },
  });
  return await checkAdmin(userId, category.groupId);
}
export const checkMember = async (userId, groupId) => {
  const record = await db.UserGroup.findOne({
    where: { userId, groupId },
  });

  return !!record;
};

export const checkOwner = async (userId, groupId) => {
  const group = await db.Group.findOne({
    where: { id: groupId },
  });

  if (!group) throw new Error("Group not found.");

  return group.owner === userId;
};
export async function canConnect(userId, categoryId) {
  const category = await db.Category.findOne({
    where: { id: categoryId },
  });
  return await checkMember(userId, category.groupId);
}

export const checkTaskOwner = async (userId, taskId) => {
  const task = await db.Task.findByPk(taskId);

  if (!task) throw new Error("Task not found.");

  return task.userId === userId;
};
