import { NextFunction, Request, Response } from "express";
import prisma from "@services/prisma";
import bCrypto from "bcrypt";
import jwt from "jsonwebtoken";
import { ConvertRequest, GetSchemaInfer } from "src/types/convert";
import { signInSchema } from "./account-controller-schema";
import { HttpError, HttpSuccess } from "@utils/http";
export class AccountController {
  async signIn(
    req: ConvertRequest<GetSchemaInfer<typeof signInSchema>["body"]>,
    res: Response
  ) {
    return HttpSuccess(req, res, {
      message: "TESTING",
      data: {
        abc: 1234,
      },
    });
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
        select: {
          password: true,
          id: true,
        },
      });

      if (!user) {
        return HttpError(res, {
          status: 500,
          message: "TESTING",
        });
      }

      const isTruePassword = await bCrypto.compareSync(password, user.password);
      if (!isTruePassword) {
        return res.status(500).json({
          code: 500,
          message: "Incorrect username or password",
        });
      }

      // const token = jwt.sign(
      //   {
      //     id: user.id,
      //     username: user.username,
      //   },
      //   process.env.JWT_SECRET,
      //   {
      //     expiresIn: 1000 * 60 * 60 * 24,
      //   }
      // );

      // return res.status(200).json({
      //   access_token: token,
      // });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
}
