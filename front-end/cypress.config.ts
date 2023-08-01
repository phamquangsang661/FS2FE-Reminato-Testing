import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    // JS-dom and vitest will not work with together
    specPattern: ["cypress/e2e/**/*.cy.{js,jsx,ts,tsx}"]
  },
});
