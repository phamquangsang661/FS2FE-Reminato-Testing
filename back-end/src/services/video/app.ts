import { videoServiceConsume } from "./consume";
import init from "./init";

(async () => {
  const close = await init();
  process.once("SIGINT", async () => {
    await close();
  });

  await videoServiceConsume();
})();
