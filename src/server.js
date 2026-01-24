import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { config } from "../config.js";
import initRoutes from "./router/index.js";
import { checkConnection } from "./config/connectDB.js";
import db from "./models/index.js";
import cors from "cors";
import passport from "./config/oAuthFacebook.js";
import { limiter } from "./config/rateLimit.js";

dotenv.config();
console.log("start server");

let app = express();
app.use(
  cors({
    origin: config.URL_FE,
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  })
);

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initRoutes(app);

checkConnection();
db.sequelize.authenticate();
// await db.sequelize.sync({ alter: true });
await db.sequelize.sync();

app.use(limiter);
app.use(passport.initialize());

let port = process.env.PORT || 6999;

app.listen(port, "0.0.0.0", () => {
  console.log("Server running on port:" + port);
});
