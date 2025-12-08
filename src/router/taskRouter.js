import express from "express";
import {
  handleCreateTask,
  handleDeleteTask,
} from "../controllers/TaskController.js";

let router = express.Router();

let initTaskRouter = (app) => {
  router.post("/create", handleCreateTask);
  router.delete("/", handleDeleteTask);

  return app.use("/api/task", router);
};

export default initTaskRouter;
