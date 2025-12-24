import express from "express";
import {
  handleCreateEvent,
  handleDeleteEvent,
} from "../controllers/EventController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

let router = express.Router();

let initEventRouter = (app) => {
  router.post("/create", authMiddleware, handleCreateEvent);
  router.delete("/", authMiddleware, handleDeleteEvent);

  return app.use("/api/event", router);
};

export default initEventRouter;
