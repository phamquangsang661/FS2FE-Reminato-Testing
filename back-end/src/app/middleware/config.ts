import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export default (app: Application) => {
  //CORS
  app.use(cors());

  //PARSE
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(cookieParser());
};
