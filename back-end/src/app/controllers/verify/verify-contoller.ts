import { Response, Request } from "express";
import { HttpError, HttpSuccess } from "@utils/http";
import { decodeAndVerifyToken, signToken } from "@utils/utils";
import prisma from "@services/prisma";
import { User } from "@prisma/client";
import { Str } from "@supercharge/strings";
import dayjs from "dayjs";
export class VerifyController {
  async verifyToken(req: Request, res: Response) {
    try {
      const decode = decodeAndVerifyToken(req.cookies["jwt"]) as User;
      if (decode == undefined) {
        res.clearCookie("jwt");
        return HttpError(res, {
          status: 500,
          message: "Token is not existed or expired",
        });
      }
      let refreshToken = req.cookies["rs"];

      const user = await prisma.getInstance().user.findFirst({
        where: {
          id: decode.id,
        },
      });

      if (!user) {
        res.clearCookie("jwt");
        return HttpError(res, {
          status: 500,
          message: "Token is not existed or expired",
        });
      }

      if (refreshToken && refreshToken != "") {
        //Re update the session with refresh token
        if (user.refreshToken == refreshToken) {
          refreshToken = Str.random(50);
          const token = signToken({
            id: user.id,
            email: user.email,
          });

          await prisma.getInstance().user.update({
            where: {
              id: user.id,
            },
            data: {
              refreshToken,
            },
          });

          res.setHeader(
            "Set-Cookie",
            `jwt= ${token}; rs=${refreshToken}; expires=${dayjs()
              .add(
                +(process.env.JWT_EXPIRED_TIME ?? 60 * 60 * 1000),
                "millisecond"
              )
              .toISOString()}`
          );
        } else {
          res.clearCookie("jwt");
          res.clearCookie("rs");
          return HttpError(res, {
            status: 500,
            message: "Token is not existed or expired",
          });
        }
      }

      return HttpSuccess(req, res, {
        data: true,
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
