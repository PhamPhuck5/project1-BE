import { createNewGroup } from "../services/baseService/groupService.js";

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

export { handleCreateGroup, handleDeleteGroup };
