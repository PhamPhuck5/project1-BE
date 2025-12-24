import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import {
  handleCreateTask,
  handleDeleteTask,
  handleGetTasks,
} from "../controllers/TaskController.js";

let router = express.Router();

let initTaskRouter = (app) => {
  router.post("/create", authMiddleware, handleCreateTask);
  router.delete("/", authMiddleware, handleDeleteTask);
  router.get("/:offset/tasks", authMiddleware, handleGetTasks);
  return app.use("/api/task", router);
};

export default initTaskRouter;
