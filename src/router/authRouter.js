import express from "express";

import { authMiddleware } from "../middlewares/authMiddleware.js";

import passport from "../config/oAuthFacebook.js";
import authControler from "../controllers/AuthController.js";

let router = express.Router();

let initWebRouter = (app) => {
  router.get("/api/user/info", authMiddleware, authControler.hendleGetInfo);
  router.get(
    "/facebook/auth",
    passport.authenticate("facebook", { scope: [""] })
  );
  router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
      session: false,
      failureRedirect: "/login",
    }),
    authControler.handleFacebookLoggin
  );

  router.post("/api/login", authControler.handleLoggin);
  router.post("/api/register", authControler.handleRegister);
  router.post("/api/forgot", authControler.changePassword);

  return app.use("/", router);
};

export default initWebRouter;
