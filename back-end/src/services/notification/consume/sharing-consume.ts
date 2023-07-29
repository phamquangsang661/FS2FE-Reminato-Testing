import Prisma from "@services/prisma";
import Logger from "@utils/logger";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { QUEUE } from "src/constants/queue";
import { ServiceReceiver } from "src/services/receiver";

export default async (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  const channel = await ServiceReceiver.getInstance();
  const prisma = Prisma.getInstance();

  await channel.consume(
    QUEUE.NOTIFICATION_SERVICE.SHARING,
    async (message) => {
      try {
        if (message) {
          const content = JSON.parse(
            message.content.toString()
          ) as NotificationServiceShardingConsumerData;
          const videoShare = await prisma.videoShare.findFirst({
            where: {
              id: content.videoShareId,
            },
            select: {
              sharedBy: {
                select: {
                  email: true,
                },
              },
              thumbnailUrls: true,
              title: true,
              description: true,
              sharedTime: true,
              upvote: true,
              downvote: true,
            },
          });

          if (!videoShare) {
            throw new Error("Video not exist");
          }

          io.emit("new_video_sharing", videoShare);

          Logger.info(
            "Consume notification service",
            "User sharing video",
            content.videoShareId
          );
        }
      } catch (err) {
        Logger.error("Consume notification service", err);
      }
    },
    { noAck: false }
  );
};
