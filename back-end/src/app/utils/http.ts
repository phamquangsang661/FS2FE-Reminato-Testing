import * as util from "util";
import { Response, Request } from "express";
import Logger from "./logger";
import chalk from "chalk";

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

function HttpSuccess<T = any>(
  req: Request,
  res: Response,
  ctx: { data?: T; message: string }
) {
  Logger.custom(chalk.bgGreenBright.white.bold, "SUCCESS", req.url);
  return res.status(200).json({
    message: ctx.message,
    ...(ctx.data ? { data: ctx.data } : {}),
  });
}

export { HttpError, HttpSuccess };
