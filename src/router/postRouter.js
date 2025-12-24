import express from "express";
import upload from "../config/configMulter.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import * as postController from "../controllers/postController.js";

const router = express.Router();

let initPostRouter = (app) => {
  router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    postController.createPost
  );
  router.get("/event/:eventId", authMiddleware, postController.getPostsByEvent);
  router.get("/:postId/image", authMiddleware, postController.getPostImage);

  return app.use("/api/post", router);
};

export default initPostRouter;
