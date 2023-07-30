import Prisma from "@services/prisma";
import Logger from "@utils/logger";
import { QUEUE } from "src/constants/queue";
import { ServiceReceiver } from "src/services/receiver";

export default async () => {
  const channel = await ServiceReceiver.getInstance();
  const prisma = Prisma.getInstance();

  await channel.consume(
    QUEUE.VIDEO_SERVICE.VOTE,
    async (message) => {
      try {
        if (message) {
          const content: VideoServiceConsumerData = JSON.parse(
            message.content.toString()
          );
          if (content) {
            const videoShare = await prisma.videoShare.findFirst({
              where: {
                id: content.videoShareId,
              },
              select: {
                upvote: true,
                downvote: true,
              },
            });

            if (!videoShare) {
              throw new Error("Video not exist");
            }

            await prisma.videoShare.update({
              where: {
                id: content.videoShareId,
              },
              data: {
                ...(content.isVoted
                  ? {
                      ...(content.vote == "up"
                        ? {
                            upvote: videoShare.upvote - 1,
                            upvoteUsers: {
                              disconnect: {
                                id: content.userId,
                              },
                            },
                          }
                        : {
                            downvote: videoShare.downvote - 1,
                            downvoteUsers: {
                              disconnect: {
                                id: content.userId,
                              },
                            },
                          }),
                    }
                  : {
                      ...(content.vote == "up"
                        ? {
                            upvote: videoShare.upvote + 1,
                            upvoteUsers: {
                              connect: {
                                id: content.userId,
                              },
                            },
                          }
                        : {
                            downvote: videoShare.upvote - 1,
                            downvoteUsers: {
                              connect: {
                                id: content.userId,
                              },
                            },
                          }),
                    }),
              },
            });
            Logger.info(
              "Consume vote service",
              "Run on video",
              content.videoShareId
            );
          }
        }
      } catch (err) {
        Logger.error("Consume vote service", err);
      }
    },
    { noAck: false }
  );
};
