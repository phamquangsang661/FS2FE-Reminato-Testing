import prisma from "@services/prisma";
import rabbitMQSender from "@services/rabbitmq";

export default async () => {
  prisma.getInstance();
  await rabbitMQSender.getInstance();
};
