import * as util from "util";
import { Response, Request } from "express";
import Logger from "./logger";
import chalk from "chalk";
import { ConvertRequest } from "src/types/convert";

function HttpError(
  res: Response,
  ctx: { status: number; message: string; url?: string }
) {
  Logger.error(ctx.url ?? "API ERROR", ctx.message);
  return res.status(ctx.status).json({
    message: ctx.message,
  });
}
util.inherits(Error, HttpError);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function HttpSuccess<T = any, R extends ConvertRequest = Request>(
  req: R,
  res: Response,
  ctx: { data?: T; message: string; [key: string]: any }
) {
  Logger.custom(chalk.bgGreenBright.white.bold, "SUCCESS", req.url);
  return res.status(200).json({
    message: ctx.message,
    ...(ctx.data ? { data: ctx.data } : {}),
  });
}

export { HttpError, HttpSuccess };
