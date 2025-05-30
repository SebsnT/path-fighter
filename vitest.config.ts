import { defineVitestConfig } from "@nuxt/test-utils/config";
import path from "path";
import { coverageConfigDefaults } from "vitest/config";

export default defineVitestConfig({
  test: {
    globals: true,
    environment: "nuxt",
    include: ["**/*.{test,spec}.{ts,js}"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*",
    ],
    coverage: {
      exclude: [
        "**/*.config.*",
        "**/*.constants.*",
        "**/app.vue",
        "**/*.vue",
        "**/layouts/**",
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./"),
      "@": path.resolve(__dirname, "./"),
    },
  },
});
