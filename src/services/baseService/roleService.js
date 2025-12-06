export const checkAdmin = async (userId, groupId) => {
  const record = await db.UserGroup.findOne({
    where: { userId, groupId, isAdmin: true },
  });

  return !!record;
};
export const checkMember = async (userId, groupId) => {
  const record = await db.UserGroup.findOne({
    where: { userId, groupId },
  });

  return !!record;
};

export const checkOwner = async (userId, groupId) => {
  const group = await db.Group.findOne({
    where: { id: groupId }, // hoặc groupId nếu bạn rename field
  });

  if (!group) throw new Error("Group không tồn tại.");

  return group.owner === userId;
};
export async function canConnect(userId, categoryId) {
  const category = await db.Category.findOne({
    where: { id: categoryId },
  });
  return await checkMember(userId, category.groupId);
}
