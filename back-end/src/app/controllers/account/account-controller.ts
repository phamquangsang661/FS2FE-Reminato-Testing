import { Response } from "express";
import prisma from "@services/prisma";
import bCrypto from "bcrypt";
import { ConvertRequest, GetSchemaInfer } from "src/types/convert";
import { signInSchema } from "./account-controller-schema";
import { HttpError, HttpSuccess } from "@utils/http";
import { signToken } from "@utils/utils";
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

      return HttpSuccess(req, res, {
        data: {
          access_token: token,
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
}
