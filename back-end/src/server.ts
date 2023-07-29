import express from "express";
import { Application } from "express";
import logger from "@utils/logger";
import middleware from "@app/middleware";


const app: Application = express();
const port = process.env.SERVER_PORT || 3000;
// APP ROUTER
app.use(express.json());
app.use(express.urlencoded());

//Middleware and router
middleware(app);
// route(app);

app.listen(port, function () {
  logger.info("",`App is binding on port ${port} !`);
});
