import { z } from "zod";

export const sharingVideoSchema = z.object({
  body: z.object({
    url: z.string({
      required_error: "Url is required",
    }),
  }),
});

export const getPublicVideoSharingSchema = z.object({
  query: z
    .object({
      cursor: z.string().nullish(),
      limit: z.string().nullish(),
    })
    .nullish(),
});
