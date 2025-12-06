import js from "@eslint/js";
import nextVitals from "eslint-config-next/core-web-vitals";
import jest from "eslint-plugin-jest";
import prettier from "eslint-config-prettier";

const eslintconfig = [
  // equivale a: "eslint:recommended"
  js.configs.recommended,

  // equivale a: "next/core-web-vitals"
  ...nextVitals,

  // equivale a: "plugin:jest/recommended"
  {
    plugins: {
      jest,
    },
    languageOptions: {
      globals: {
        ...jest.environments.globals.globals,
      },
    },
    rules: {
      ...jest.configs.recommended.rules,
    },
  },

  // equivale a: "prettier"
  prettier,
];

export default eslintconfig;
