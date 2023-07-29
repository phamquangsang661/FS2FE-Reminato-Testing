import { Application } from "express";
import cors from "cors";

export default (app: Application) => {
  //Cors
  app.use(cors());
};
