import prisma from "@services/prisma";
import rabbitMQSender from "@services/rabbitmq";
import { QUEUE } from "./constants/queue";

export default async () => {
  prisma.getInstance();

  await rabbitMQSender.getInstance();
  await rabbitMQSender.signQueue(
    QUEUE.VIDEO_SERVICE.VOTE,
    QUEUE.NOTIFICATION_SERVICE.SHARING
  );

  return async () => {
    prisma.close();
    await rabbitMQSender.close();
  };
};
