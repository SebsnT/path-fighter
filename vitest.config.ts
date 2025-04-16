import { defineVitestConfig } from "@nuxt/test-utils/config";
import path from "path";

export default defineVitestConfig({
  test: {
    globals: true,
    environment: "happy-dom",
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./"),
      "@": path.resolve(__dirname, "./"),
    },
  },
});
