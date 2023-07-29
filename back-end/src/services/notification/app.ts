import express, { Application } from "express";
import * as http from "http";
import sharingConsume from "./consume/sharing-consume";
import init from "./init";
import { Server } from "socket.io";
import dotenv from "dotenv";
import logger from "@utils/logger";
import cors from "cors";
import Prisma from "@services/prisma";
dotenv.config();

const SOCKET_SERVER_OPTION = {
  cors: {
    origin: process.env.WEB_APP_URL ?? "*",
  },
};
const NOTIFICATION_SOCKET_PORT = process.env.NOTIFICATION_SOCKET_PORT ?? 3555;

(async () => {
  const close = await init();
  process.once("SIGINT", async () => {
    await close();
  });

  const socketApp: Application = express();
  const server = http.createServer(socketApp);
  const io = new Server(server, {
    ...SOCKET_SERVER_OPTION,
  });
  const sharing = sharingConsume;

  io.on("connection", (socket) => {
    sharing(io);
    socket.on("disconnect", async () => {
      await close();
    });
  });

  server.listen(NOTIFICATION_SOCKET_PORT, function () {
    logger.info(
      "",
      `Notification service is binding on port ${NOTIFICATION_SOCKET_PORT} !`
    );
  });
})();
