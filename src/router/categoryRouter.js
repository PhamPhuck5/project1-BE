import express from "express";

import {
  handleFindCategoryByGroup,
  handleCreateCategory,
  handleDeleteCategory,
  handleUpdateDescription,
  handleFollowCategory,
  handleUnfollowCategory,
  handleCheckFollowedCategory,
} from "../controllers/CategoryController.js";

let router = express.Router();

let initGroupRouter = (app) => {
  router.get("/:groupId", handleFindCategoryByGroup);
  router.post("/create", handleCreateCategory);
  router.delete("/", handleDeleteCategory);
  router.put("/description", handleUpdateDescription);
  router.post("/follow", handleFollowCategory);
  router.post("/unfollow", handleUnfollowCategory);
  router.get("/:categoryId/is-followed", handleCheckFollowedCategory);

  return app.use("/api/category", router);
};
export default initGroupRouter;
