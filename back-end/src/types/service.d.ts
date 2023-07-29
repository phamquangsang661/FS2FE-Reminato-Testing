type YoutubeStatistic = {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      [key: "default" | "medium" | "high" | "standard" | "maxres"]: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
};
