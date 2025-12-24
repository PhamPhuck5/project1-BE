import initCategoryRouter from "./categoryRouter.js";
import initEventRouter from "./eventRouter.js";
import initTaskRouter from "./taskRouter.js";
import initWebRouter from "./authRouter.js";
import initGroupRouter from "./groupRouter.js";
import initPostRouter from "./postRouter.js";
const initRoutes = (app) => {
  initCategoryRouter(app);
  initEventRouter(app);
  initTaskRouter(app);
  initWebRouter(app);
  initGroupRouter(app);
  initPostRouter(app);
};

export default initRoutes;
