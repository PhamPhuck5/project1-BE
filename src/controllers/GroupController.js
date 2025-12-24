import {
  createNewGroup,
  deleteGroup,
} from "../services/baseService/groupService.js";

import {
  joinGroup,
  leaveGroup,
  setAdmin,
  getAllRequestingUsers,
  acceptJoinRequest,
  getGroupsByUser,
} from "../services/baseService/userGroup.js";

let handleGetUserGroups = async (req, res) => {
  try {
    const userId = req.user.id;

    const groups = await getGroupsByUser(userId);

    return res.status(200).json({
      status: 200,
      message: "Get user groups success",
      data: groups,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

let handleCreateGroup = async (req, res) => {
  try {
    await createNewGroup(
      req.body.name,
      req.user.id,
      req.body.createDate,
      req.body.description
    );

    return res.status(200).json({
      status: 200,
      message: "create group success",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};
let handleDeleteGroup = async (req, res) => {
  try {
    const groupId = req.params.id;
    const userId = req.user.id;

    const result = await deleteGroup(userId, groupId);

    return res.status(200).json({
      status: 200,
      message: "delete group success",
      data: result,
    });
  } catch (e) {
    console.error(e);

    if (e.message === "don not have permission") {
      return res.status(403).json({
        status: 403,
        message: "You do not have permission to delete this group",
      });
    }

    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

let handleRequestJoinGroup = async (req, res) => {
  try {
    const userId = req.user.id;
    const groupId = req.body.groupId;

    await joinGroup(userId, groupId);

    return res.status(200).json({
      status: 200,
      message: "request to join group sent",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

let handleLeaveGroup = async (req, res) => {
  try {
    const userId = req.user.id;
    const groupId = req.body.groupId;

    await leaveGroup(userId, groupId);

    return res.status(200).json({
      status: 200,
      message: "left group successfully",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

let handleSetAdmin = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const targetUserId = req.body.userId;
    const groupId = req.body.groupId;
    const isAdmin = req.body.isAdmin;

    await setAdmin(ownerId, groupId, targetUserId, isAdmin);

    return res.status(200).json({
      status: 200,
      message: "set admin success",
    });
  } catch (e) {
    console.error(e);

    if (e.message === "don not have permission") {
      return res.status(403).json({
        status: 403,
        message: "You do not have permission to set admin",
      });
    }

    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

let handleGetAllRequestingUsers = async (req, res) => {
  try {
    const userId = req.user.id;
    const groupId = req.params.id;

    const requestingUsers = await getAllRequestingUsers(userId, groupId);

    return res.status(200).json({
      status: 200,
      data: requestingUsers,
    });
  } catch (e) {
    console.error(e);

    if (e.message === "don not have permission") {
      return res.status(403).json({
        status: 403,
        message: "You do not have permission to view requesting users",
      });
    }

    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

let handleAcceptJoinRequest = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { groupId, memberId } = req.body;

    await acceptJoinRequest(adminId, groupId, memberId);

    return res.status(200).json({
      status: 200,
      message: "accepted join request",
    });
  } catch (e) {
    console.error(e);

    if (e.message === "don not have permission") {
      return res.status(403).json({
        status: 403,
        message: "You do not have permission",
      });
    }

    if (e.message === "NOT FOUND USER.") {
      return res.status(404).json({
        status: 404,
        message: "User not found in request list",
      });
    }

    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

export {
  handleCreateGroup,
  handleDeleteGroup,
  handleRequestJoinGroup,
  handleLeaveGroup,
  handleSetAdmin,
  handleGetAllRequestingUsers,
  handleAcceptJoinRequest,
  handleGetUserGroups,
};
