import db from "../../models/index.js";
import { checkOwner, checkAdmin } from "./roleService.js";
import { deleteGroup } from "./groupService.js";
import { checkFollowedCategory } from "./userCategoryService.js";
const UserGroup = db.UserGroup;

export const getGroupsByUser = async (userId) => {
  const groups = await db.Group.findAll({
    include: [
      {
        model: db.UserGroup,
        where: {
          userId: userId,
          status: "MEMBER",
        },
      },
    ],
  });

  const plainGroups = groups.map((group) => group.get({ plain: true }));

  await Promise.all(
    plainGroups.map(async (group) => {
      group.isAdmin = await checkAdmin(userId, group.id);
    })
  );

  return plainGroups;
};
export const joinGroup = async (userId, groupId, status = "REQUESTED") => {
  return await db.UserGroup.create({
    userId,
    groupId,
    date: new Date(),
    isAdmin: false,
    status,
  });
};
export const leaveGroup = async (userId, groupId) => {
  if (await checkOwner(userId, groupId)) {
    await deleteGroup(groupId);
  } else
    return await UserGroup.destroy({
      where: { userId, groupId },
    });
};
export const setAdmin = async (
  userId,
  groupId,
  targetUserId,
  isAdmin = true
) => {
  if (!(await checkOwner(userId, groupId))) {
    throw new Error("don not have permission");
  }

  return await UserGroup.update(
    { isAdmin },
    {
      where: { userId: targetUserId, groupId },
    }
  );
};
export const getAllRequestingUsers = async (userId, groupId) => {
  if (!(await checkAdmin(userId, groupId))) {
    throw new Error("don not have permission");
  }
  return await UserGroup.findAll({
    where: {
      groupId,
      status: "REQUESTED",
    },
  });
};
export const acceptJoinRequest = async (userId, groupId, memberId) => {
  if (!(await checkAdmin(userId, groupId))) {
    throw new Error("don not have permission");
  }
  const updated = await UserGroup.update(
    { status: "MEMBER" },
    { where: { userId: memberId, groupId, status: "REQUESTED" } }
  );

  if (updated[0] === 0) {
    throw new Error("NOT FOUND USER.");
  }
};
