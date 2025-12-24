import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

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
  router.get("/:groupId", authMiddleware, handleFindCategoryByGroup);
  router.post("/create", authMiddleware, handleCreateCategory);
  router.delete("/", authMiddleware, handleDeleteCategory);
  router.put("/description", authMiddleware, handleUpdateDescription);
  router.post("/follow", authMiddleware, handleFollowCategory);
  router.post("/unfollow", authMiddleware, handleUnfollowCategory);
  router.get(
    "/:categoryId/is-followed",
    authMiddleware,
    handleCheckFollowedCategory
  );

  return app.use("/api/category", router);
};
export default initGroupRouter;
