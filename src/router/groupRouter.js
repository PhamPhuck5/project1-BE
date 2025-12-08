import express from "express";

import {
  handleCreateGroup,
  handleDeleteGroup,
  handleRequestJoinGroup,
  handleLeaveGroup,
  handleSetAdmin,
  handleGetAllRequestingUsers,
  handleAcceptJoinRequest,
} from "../controllers/GroupController.js";

let router = express.Router();

let initGroupRouter = (app) => {
  router.post("/create", handleCreateGroup);
  router.delete("/:id", handleDeleteGroup);
  router.post("/request-join", handleRequestJoinGroup);
  router.post("/leave", handleLeaveGroup);
  router.put("/set-admin", handleSetAdmin);
  router.get("/:id/requesting-users", handleGetAllRequestingUsers);
  router.post("/accept-request", handleAcceptJoinRequest);
  return app.use("/api/group", router);
};
export default initGroupRouter;
