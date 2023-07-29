import { User as UserPrisma } from "@prisma/client";

export {};
declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends Omit<UserPrisma, "password"> {}
  }
}
