import passport from "passport";
import prisma from "@services/prisma";
import passportJwt from "passport-jwt";
import { Request } from "express";
import { decodeAndVerifyToken, isNullable } from "@utils/utils";
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

type UserDataAuth = Omit<User, "password" | "refreshToken"> & {
  isAuth: boolean;
};

export class AuthNotRequiredStrategy extends passport.Strategy {
  name?: string = "auth_not_required";
  authenticate(
    this: passport.StrategyCreated<this, this & passport.StrategyCreatedStatic>,
    req: Request
  ) {
    const token = cookieExtractor(req);
    let user: UserDataAuth = null;
    const decode = decodeAndVerifyToken(token) as UserDataAuth;
    if (decode != undefined) {
      user = decode;
      this.success(
        decode &&
          ({
            isAuth: true,
          } as UserDataAuth)
      );
    }

    this.success(
      user &&
        ({
          isAuth: !isNullable(user),
        } as UserDataAuth)
    );
  }
}

passport.use(new AuthNotRequiredStrategy());
export const auth = passport;
