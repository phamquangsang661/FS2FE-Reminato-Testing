import { PrismaClient } from "@prisma/client";
import Logger from "@utils/logger";

class Prisma {
  private static instance = null;
  public static getInstance() {
    if (Prisma.instance == null) {
      Prisma.instance = new PrismaClient();
      if (process.env.NODE_ENV == "DEVELOPMENT") {
        Logger.info("INIT", "Prisma service");
      }
    }
    return Prisma.instance as PrismaClient;
  }
}

export default Prisma;
