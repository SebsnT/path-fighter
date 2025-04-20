import withNuxt from "./.nuxt/eslint.config.mjs";

import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const config = {
  ...eslintPluginPrettierRecommended,
};

export default withNuxt(config);
