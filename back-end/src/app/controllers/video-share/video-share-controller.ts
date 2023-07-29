import { Response } from "express";
import prisma from "@services/prisma";
import { ConvertRequest, GetSchemaInfer } from "src/types/convert";
import { HttpError, HttpSuccess } from "@utils/http";
import {
  getPublicVideoSharingSchema,
  sharingVideoSchema,
} from "./video-share-schema";
import { YoutubeService } from "@services/youtube";
import { VideoShare } from "@prisma/client";

export class VideoShareController {
  async sharingVideo(
    req: ConvertRequest<GetSchemaInfer<typeof sharingVideoSchema>["body"]>,
    res: Response
  ) {
    try {
      const userId = req.user.id;
      const { url } = req.body;
      const videoStatistic = await YoutubeService.getYoutubeStatistic(url);
      let videoSharing: VideoShare;
      if (videoStatistic.complete) {
        const detail = videoStatistic.data;
        videoSharing = await prisma.getInstance().videoShare.create({
          data: {
            title: detail.snippet.title,
            description: detail.snippet.description,
            sharedBy: {
              connect: {
                id: userId,
              },
            },
            videoId: detail.id,
            thumbnailUrls: detail.snippet.thumbnails.toString(),
          },
        });
      } else {
        return HttpError(res, {
          status: 404,
          message: videoStatistic.reason,
        });
      }

      return HttpSuccess(req, res, {
        data: videoSharing,
        message: "Success",
      });
    } catch (err) {
      return HttpError(res, {
        status: 500,
        message: err,
      });
    }
  }

  async getPublicVideos(
    req: ConvertRequest<
      unknown,
      unknown,
      GetSchemaInfer<typeof getPublicVideoSharingSchema>["query"]
    >,
    res: Response
  ) {
    try {
      const limit = req.query.limit ?? 5;
      const isAuth = req.user.isAuth;
      const cursor = req.query.cursor ?? "";
      const cursorObj = cursor === "" ? undefined : { id: cursor };
      const videoSharing = await prisma.getInstance().videoShare.findMany({
        cursor: cursorObj,
        take: limit + 1,
        select: {
          id: true,
          title: true,
          description: true,
          downvote: true,
          upvote: true,
          sharedTime: true,
          sharedBy: {
            select: {
              id: true,
              email: true,
            },
          },
          videoId: true,
          thumbnailUrls: true,
          ...(isAuth
            ? {
                downvoteUsers: {
                  select: {
                    id: true,
                  },
                  where: {
                    id: req.user.id,
                  },
                },
                upvoteUsers: {
                  select: {
                    id: true,
                  },
                  where: {
                    id: req.user.id,
                  },
                },
              }
            : {}),
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (videoSharing.length > limit) {
        const nextItem = videoSharing.pop();
        nextCursor = nextItem.id;
      }
      type ConvertVideoSharing = ArrElement<typeof videoSharing> & {
        isOwner: boolean;
        isVoteUp: boolean;
        isVoted: boolean;
        isVoteDown: boolean;
      };
      const convertVideoSharing: ConvertVideoSharing[] = videoSharing.map(
        (video) => {
          const item: ConvertVideoSharing = Object.assign(video, {
            isOwner: false,
            isVoteUp: false,
            isVoted: false,
            isVoteDown: false,
          });
          if (isAuth) {
            if (item.sharedBy.id == req.user.id) {
              item.isOwner = true;
            } else {
              if (item.upvoteUsers && item.upvoteUsers.length > 0) {
                item.isVoteUp = true;
              }

              if (item.downvoteUsers && item.upvoteUsers.length > 0) {
                item.isVoteDown = true;
              }

              item.isVoted = item.isVoteUp || item.isVoteDown;
            }
          }
          return item;
        }
      );
      return HttpSuccess(req, res, {
        data: convertVideoSharing,
        message: "Success",
        cursor: nextCursor,
      });
    } catch (err) {
      return HttpError(res, {
        status: 500,
        message: err,
      });
    }
  }
}
