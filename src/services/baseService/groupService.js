import db from "../../models/index.js";
import { onDeleteGroup } from "./categotyService.js";
import { checkOwner } from "./roleService.js";
//todo: add author check
export const createNewGroup = async ({
  name,
  owner,
  createDate,
  description,
}) => {
  return await db.Group.create({
    name,
    owner,
    createDate,
    description,
  });
};
export const deleteGroup = async (userId, groupId) => {
  if (!(await checkOwner(userId, groupId))) {
    throw new Error("don not have permission");
  }
  const t = await db.sequelize.transaction();

  try {
    await onDeleteGroup(groupId, { transaction: t });
    await db.UserGroup.destroy({ where: { groupId } }, { transaction: t });
    await db.Category.destroy({ where: { groupId } }, { transaction: t });

    const result = await db.Group.destroy(
      { where: { id: groupId } },
      { transaction: t }
    );

    await t.commit();

    return result;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const updateGroupName = async (groupId, newName) => {
  return await db.Group.update({ name: newName }, { where: { id: groupId } });
};
export const updateGroupDescription = async (groupId, newDescription) => {
  return await db.Group.update(
    { description: newDescription },
    { where: { id: groupId } }
  );
};
