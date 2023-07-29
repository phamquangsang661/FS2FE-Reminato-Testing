import { z } from "zod";

export const sharingVideoSchema = z.object({
  body: z.object({
    url: z.string({
      required_error: "Url is required",
    }),
  }),
});
