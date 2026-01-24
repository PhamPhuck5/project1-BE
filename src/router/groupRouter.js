import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import {
  handleCreateGroup,
  handleDeleteGroup,
  handleRequestJoinGroup,
  handleLeaveGroup,
  handleSetAdmin,
  handleGetAllRequestingUsers,
  handleAcceptJoinRequest,
  handleGetUserGroups,
  handlehandleFindGroup,
} from "../controllers/GroupController.js";

let router = express.Router();

let initGroupRouter = (app) => {
  router.get("/groups", authMiddleware, handleGetUserGroups);
  router.get("/group/:groupId", handlehandleFindGroup);
  router.post("/create", authMiddleware, handleCreateGroup);
  router.delete("/:id", authMiddleware, handleDeleteGroup);
  router.post("/request-join", authMiddleware, handleRequestJoinGroup);
  router.post("/leave", authMiddleware, handleLeaveGroup);
  router.put("/set-admin", authMiddleware, handleSetAdmin);
  router.get(
    "/:id/requesting-users",
    authMiddleware,
    handleGetAllRequestingUsers
  );
  router.post("/accept-request", authMiddleware, handleAcceptJoinRequest);

  return app.use("/api/group", router);
};
export default initGroupRouter;
