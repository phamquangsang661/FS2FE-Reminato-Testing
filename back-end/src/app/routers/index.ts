import { Application } from "express";
import { accountRouter } from "./account";
import { verifyRouter } from "./verify";
import { videoShareRouter } from "./video-share";

export default (app: Application) => {
  app.use("/account", accountRouter);
  app.use("/verify", verifyRouter);
  app.use("/videos", videoShareRouter);
};
