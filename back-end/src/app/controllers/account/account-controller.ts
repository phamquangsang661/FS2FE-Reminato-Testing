import { Response, Request } from "express";
import prisma from "@services/prisma";
import bCrypto from "bcrypt";
import { ConvertRequest, GetSchemaInfer } from "src/types/convert";
import { signInSchema } from "./account-controller-schema";
import { HttpError, HttpSuccess } from "@utils/http";
import { signToken } from "@utils/utils";
import dayjs from "dayjs";
import { Str } from "@supercharge/strings";
export class AccountController {
  async signIn(
    req: ConvertRequest<GetSchemaInfer<typeof signInSchema>["body"]>,
    res: Response
  ) {
    try {
      const { email, password } = req.body;
      let user = await prisma.getInstance().user.findFirst({
        where: {
          email,
        },
        select: {
          password: true,
          id: true,
        },
      });

      if (!user) {
        //Sign up user if user don't exist
        const hash = await bCrypto.hashSync(password, 10);
        user = await prisma.getInstance().user.create({
          data: {
            password: hash,
            email,
          },
        });
      } else {
        const isTruePassword = await bCrypto.compareSync(
          password,
          user.password
        );
        if (!isTruePassword) {
          return HttpError(res, {
            status: 500,
            message: "Incorrect username or password",
          });
        }
      }
      const token = signToken({
        id: user.id,
        email: email,
      });

      const refreshToken = Str.random(50);
      await prisma.getInstance().user.update({
        where: {
          id: user.id,
        },
        data: {
          refreshToken,
        },
      });

      //Auth set cookie header
      res.setHeader(
        "Set-Cookie",
        `jwt= ${token}; rs=${refreshToken}; expires=${dayjs()
          .add(+(process.env.JWT_EXPIRED_TIME ?? 60 * 60 * 1000), "millisecond")
          .toISOString()}`
      );
      res.setHeader("Content-Type", "application/json");

      return HttpSuccess(req, res, {
        data: {
          access_token: token,
          refresh_token: refreshToken,
        },
        message: "Success",
      });
    } catch (err) {
      return HttpError(res, {
        status: 500,
        message: err?.message ?? "Internal Server Error",
      });
    }
  }
  async getUserMe(req: Request, res: Response) {
    try {
      const user = await prisma.getInstance().user.findFirst({
        where: {
          id: req.user.id,
        },
        select: {
          email: true,
          id: true,
        },
      });

      return HttpSuccess(req, res, {
        data: user,
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
