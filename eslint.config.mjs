import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import libram from "eslint-plugin-libram";
import { defineConfig } from "eslint/config";

export default defineConfig(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  libram.configs.recommended,
  prettier,
  {
    ignores: ["dist/**"],
  },
  {
    rules: {
      "block-scoped-var": "error",
      "eol-last": "error",
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "no-var": "error",
      "prefer-arrow-callback": "error",
      "prefer-const": "error",
      "prefer-template": "error",

      "sort-imports": [
        "error",
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],

      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "libram/verify-constants": "error",
    },
  },
);
