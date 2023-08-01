import path from "path";
import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on(
        "file:preprocessor",
        vitePreprocessor({
          configFile: path.resolve("./vite.config.ts"),
          mode: "test",
        })
      );
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
