import { PrismaClient } from "@prisma/client";
import Logger from "@utils/logger";

class Prisma {
  private static instance: PrismaClient = null;
  public static getInstance() {
    if (this.instance == null) {
      this.instance = new PrismaClient();
      if (process.env.NODE_ENV == "DEVELOPMENT") {
        Logger.info("INIT", "Prisma service");
      }
    }
    return Prisma.instance as PrismaClient;
  }
  public static close() {
    this.instance.$disconnect();
  }
}

export default Prisma;
