import { Application } from "express";
import config from "./config";

export default (app: Application) => {
  config(app);
};
