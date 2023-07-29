import { videoServiceConsume } from "./consume";
import init from "./init";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  const close = await init();
  process.once("SIGINT", async () => {
    await close();
  });

  await videoServiceConsume();
})();
