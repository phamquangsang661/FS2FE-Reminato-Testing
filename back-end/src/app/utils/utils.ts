import jwt from "jsonwebtoken";

export const signToken = (
  data: any,
  expiredTime = process.env.JWT_EXPIRED_TIME ?? 60 * 60 * 1000
) => {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: expiredTime,
  });
};
