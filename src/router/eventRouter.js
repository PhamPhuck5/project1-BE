import express from "express";
import {
  handleCreateEvent,
  handleDeleteEvent,
} from "../controllers/EventController.js";

let router = express.Router();

let initEventRouter = (app) => {
  router.post("/create", handleCreateEvent);
  router.delete("/", handleDeleteEvent);

  return app.use("/api/event", router);
};

export default initEventRouter;
