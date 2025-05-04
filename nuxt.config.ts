import { defineNuxtConfig } from "nuxt/config";
import Aura from "@primevue/themes/aura";
export default defineNuxtConfig({
  ssr: true,
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
    prerender: {
      autoSubfolderIndex: false,
    },
  },
  googleFonts: {
    families: {
      "Noto+Sans": true,
    },
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  modules: [
    "@nuxt/eslint",
    "@primevue/nuxt-module",
    "@nuxtjs/google-fonts",
    "@nuxt/test-utils/module",
    "@nuxtjs/color-mode",
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.darkmode',
        }
      },
    },
  },

  devtools: { enabled: true },
  compatibilityDate: "2024-08-22",
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
});
