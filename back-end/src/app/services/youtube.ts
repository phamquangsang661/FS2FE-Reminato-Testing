import { isNullable } from "@utils/utils";
import _ from "lodash";
import fetch from "node-fetch";

type YoutubeStatistic = {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: Obj<{
      url: string;
      width: number;
      height: number;
    }>;
  };
};

export class YoutubeService {
  public static async getYoutubeStatistic(url: string): Promise<{
    complete: boolean;
    data?: YoutubeStatistic;
    reason?: string;
  }> {
    try {
      const urlParams = new URLSearchParams(url);
      let id = urlParams.get("v");
      if (isNullable(id)) {
        const urlObj = new URL(url);
        urlObj.search = "";
        const splitUrl = urlObj.toString().split("/");
        id = splitUrl[splitUrl.length - 1];
      }

      const queryString = new URLSearchParams({
        id,
        key: process.env.YOUTUBE_API_KEY,
        fields: "items(id,snippet(title,description,thumbnails))",
        part: "snippet",
      }).toString();

      const res = await fetch(
        `${process.env.YOUTUBE_API_URL}/videos` + queryString
      );

      if (res.ok) {
        const cv = (await res.json()) as YoutubeStatistic[];
        if (cv && cv.length > 1) {
          const result = cv[0];
          if (
            result?.snippet?.title &&
            result?.snippet?.description &&
            _.isArray(result.snippet.thumbnails)
          ) {
            return {
              complete: true,
              data: cv[0],
            };
          }
        }
      }

      return {
        complete: false,
        reason: "The video is not exists or is being setting private",
      };
    } catch (err) {
      return {
        complete: false,
        reason: "The video is not exists or is being setting private",
      };
    }
  }
}
