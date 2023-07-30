import prisma from "@services/prisma";
import rabbitMQSender from "@services/rabbitmq";
import { QUEUE } from "./constants/queue";
import Logger from "@utils/logger";

export default async () => {
  try {
    prisma.getInstance();

    await rabbitMQSender.getInstance();
    await rabbitMQSender.signQueue(
      QUEUE.VIDEO_SERVICE.VOTE,
      QUEUE.NOTIFICATION_SERVICE.SHARING
    );
  } catch (err) {
    Logger.error("INIT", err);
  }

  return async () => {
    prisma.close();
    await rabbitMQSender.close();
  };
};
