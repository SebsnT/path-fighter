import { defineNuxtConfig } from "nuxt/config";
import Aura from "@primevue/themes/aura";
export default defineNuxtConfig({
  app: {
    head: {
      title: "PathFighter",
      htmlAttrs: {
        lang: "en",
      },
    },
  },
  googleFonts: {
    families: {
      "Noto+Sans": true,
    },
  },
  modules: [
    "@nuxt/eslint",
    "@primevue/nuxt-module",
    "@nuxtjs/google-fonts",
    "@nuxt/test-utils/module",
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura,
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
