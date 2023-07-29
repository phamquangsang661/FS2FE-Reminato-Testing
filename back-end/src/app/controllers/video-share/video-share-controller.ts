import { Response, Request } from "express";
import prisma from "@services/prisma";
import { ConvertRequest, GetSchemaInfer } from "src/types/convert";
import { HttpError, HttpSuccess } from "@utils/http";
import { sharingVideoSchema } from "./video-share-schema";
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
}
