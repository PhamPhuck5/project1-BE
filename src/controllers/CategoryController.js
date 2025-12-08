import {
  findCategoryByGroup,
  createCategory,
  deleteCategory,
  updateDescription,
} from "../services/baseService/categotyService.js";
import {
  followCategory,
  unfollowCategory,
  checkFollowedCategory,
} from "../services/baseService/userCategoryService.js";

let handleFindCategoryByGroup = async (req, res) => {
  try {
    const groupId = req.params.groupId;

    const categories = await findCategoryByGroup(groupId);

    return res.status(200).json({
      status: 200,
      data: categories,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};
let handleCheckFollowedCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const categoryId = req.params.categoryId; // hoặc req.body.categoryId nếu dùng POST

    const isFollowed = await checkFollowedCategory(userId, categoryId);

    return res.status(200).json({
      status: 200,
      isFollowed,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};
let handleCreateCategory = async (req, res) => {
  try {
    const userId = req.user.id;

    await createCategory({
      userId,
      groupId: req.body.groupId,
      name: req.body.name,
      description: req.body.description,
    });

    return res.status(200).json({
      status: 200,
      message: "create category success",
    });
  } catch (e) {
    console.error(e);

    if (e.message === "don not have permission") {
      return res.status(403).json({
        status: 403,
        message: "You do not have permission to create category",
      });
    }

    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

let handleDeleteCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const groupId = req.body.groupId;
    const name = req.body.name;

    const result = await deleteCategory(userId, groupId, name);

    return res.status(200).json({
      status: 200,
      message: "delete category success",
      data: result,
    });
  } catch (e) {
    console.error(e);

    if (e.message === "don not have permission") {
      return res.status(403).json({
        status: 403,
        message: "You do not have permission to delete this category",
      });
    }

    if (e.message === "CATEGORY_NOT_FOUND") {
      return res.status(404).json({
        status: 404,
        message: "Category not found",
      });
    }

    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

let handleUpdateDescription = async (req, res) => {
  try {
    const userId = req.user.id;
    const { groupId, name, newDescription } = req.body;

    await updateDescription(userId, groupId, name, newDescription);

    return res.status(200).json({
      status: 200,
      message: "update category description success",
    });
  } catch (e) {
    console.error(e);

    if (e.message === "don not have permission") {
      return res.status(403).json({
        status: 403,
        message: "You do not have permission to update category",
      });
    }

    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

let handleFollowCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const categoryId = req.body.categoryId;

    const result = await followCategory(userId, categoryId);

    return res.status(200).json({
      status: 200,
      message: "follow category success",
      data: result,
    });
  } catch (e) {
    console.error(e);

    if (e.message === "don not have permission") {
      return res.status(403).json({
        status: 403,
        message: "You do not have permission to follow this category",
      });
    }

    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

let handleUnfollowCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const categoryId = req.body.categoryId;

    await unfollowCategory(userId, categoryId);

    return res.status(200).json({
      status: 200,
      message: "unfollow category success",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

export {
  handleFindCategoryByGroup,
  handleCreateCategory,
  handleDeleteCategory,
  handleUpdateDescription,
  handleFollowCategory,
  handleUnfollowCategory,
  handleCheckFollowedCategory,
};
