import { defineNuxtConfig } from "nuxt/config";
import Aura from "@primevue/themes/aura";
export default defineNuxtConfig({
  ssr: true,
  build: {
    transpile: ["primevue"],
  },
  experimental: {
    payloadExtraction: true,
  },
  app: {
    head: {
      title: "PathFighter",
      htmlAttrs: {
        lang: "en",
      },
    },
  },
  nitro: {
    preset: "cloudflare-pages",
    compressPublicAssets: true,
    prerender: {
      autoSubfolderIndex: false,
    },
  },
  googleFonts: {
    families: {
      "Noto+Sans": [400, 700], // Limit to weights used
    },
    display: "swap",
    preload: true,
  },
  colorMode: {
    preference: "dark",
    fallback: "dark",
  },
  modules: [
    "@nuxt/eslint",
    "@primevue/nuxt-module",
    "@nuxtjs/google-fonts",
    "@nuxt/test-utils/module",
    "@nuxtjs/color-mode",
  ],
  primevue: {
    usePrimeVue: true,
    options: {
      ripple: false,
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: ".darkmode",
        },
      },
    },
    components: {
      include: [
        "InputText",
        "Button",
        "Dropdown",
        "SelectButton",
        "Select",
        "MultiSelect",
        "Checkbox",
        "DataTable",
        "InputNumber",
        "Column",
        "FloatLabel",
        "ProgressBar",
        "Dialog",
      ],
    },
  },

  devtools: { enabled: true },
  vite: {
    optimizeDeps: {
      include: ["markdown-it", "jspdf"],
    },
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          passes: 2,
        },
        format: {
          comments: false,
        },
      },
    },
  },
  compatibilityDate: "2024-08-22",
  components: [
    {
      path: "~/components",
      pathPrefix: false,
      watch: true,
      extensions: ["vue"],
      global: false,
      prefetch: true,
    },
  ],
});
