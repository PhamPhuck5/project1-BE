import initCategoryRouter from "./categoryRouter.js";
import initEventRouter from "./eventRouter.js";
import initTaskRouter from "./taskRouter.js";
import initWebRouter from "./authRouter.js";
import initGroupRouter from "./categoryRouter.js";

const initRoutes = (app) => {
  initCategoryRouter(app);
  initEventRouter(app);
  initTaskRouter(app);
  initWebRouter(app);
  initGroupRouter(app);

  app.use("/api/*", (req, res) => {
    return res.status(404).json({
      success: false,
      message: "API route not found",
    });
  });
};

export default initRoutes;
