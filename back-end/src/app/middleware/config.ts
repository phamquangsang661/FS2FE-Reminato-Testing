import express, { Application } from "express";
import cors from "cors";

export default (app: Application) => {
    
  //CORS
  app.use(cors());

  //PARSE
  app.use(express.json());
  app.use(express.urlencoded());
};
