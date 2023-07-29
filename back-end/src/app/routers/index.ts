import { Application } from "express";
import { accountRouter } from "./account";
import { verifyRouter } from "./verify";
export default (app: Application) => {
  app.use("/account", accountRouter);
  app.use("/verify", verifyRouter);
};
