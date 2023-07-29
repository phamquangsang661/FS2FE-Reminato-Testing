import { Application } from "express";
import { accountRouter } from "./account";
export default (app: Application) => {
  app.use("/account", accountRouter);
};
