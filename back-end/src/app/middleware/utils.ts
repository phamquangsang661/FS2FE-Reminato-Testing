
import { Application } from "express";
import logger from "@utils/logger";

export default (app: Application) => {
  //Logging
  app.use((request) => {
    if (request.statusCode == 200)
      logger.info(request.method.toUpperCase(), request.url);
    else {
      logger.info(
        request.method.toUpperCase(),
        request.url,
        request.statusMessage
      );
    }
  });
};
