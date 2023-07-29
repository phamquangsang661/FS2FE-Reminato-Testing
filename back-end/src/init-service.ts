import prisma from "@services/prisma";
import rabbitMQSender from "@services/rabbitmq";
import { QUEUE } from "./constants/queue";

export default async () => {
  prisma.getInstance();

  await rabbitMQSender.getInstance();
  await rabbitMQSender.signQueue(QUEUE.VIDEO_SERVICE.VOTE);

  return async () => {
    prisma.close();
    await rabbitMQSender.close();
  };
};
