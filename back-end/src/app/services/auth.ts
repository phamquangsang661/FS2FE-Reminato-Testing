import passport from "passport";
import prisma from "@services/prisma";
import passportJwt from "passport-jwt";
import { Request } from "express";
import { decodeAndVerifyToken } from "@utils/utils";
import { User } from "@prisma/client";

const JwtStrategy = passportJwt.Strategy;

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) token = req.cookies["jwt"];
  return token;
};

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
    },
    async function (jwt_payload, done) {
      try {
        const user = await prisma.getInstance().user.findFirst({
          where: {
            id: jwt_payload.id,
          },
          select: {
            email: true,
            id: true,
          },
        });
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export class AuthNotRequiredStrategy extends passport.Strategy {
  name?: string = "AuthNotRequired";
  authenticate(
    this: passport.StrategyCreated<this, this & passport.StrategyCreatedStatic>,
    req: Request
  ) {
    const token = cookieExtractor(req);
    let user = null;
    const decode = decodeAndVerifyToken(token) as Omit<
      User,
      "password" | "refreshToken"
    >;
    if (decode != undefined) {
      user = decode;
      this.success(decode, {
        isAuth: true,
      });
    }

    this.success(user, {
      isAuth: !user,
    });
  }
}

passport.use(new AuthNotRequiredStrategy());
export const auth = passport;
