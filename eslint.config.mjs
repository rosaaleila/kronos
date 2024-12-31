import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    rules: {
      semi: "error",
      "prefer-const": "warn",
      "no-unused-vars": "warn",
      "no-const-assign": "error",
      "no-dupe-keys": "error",
      "no-duplicate-case": "error",
      "no-duplicate-imports": "warn",
      "no-dupe-else-if": "error",
      "no-dupe-class-members": "error",
      "no-dupe-args": "error",
      "no-irregular-whitespace": "error",
      "no-self-assign": "warn",
      "no-self-compare": "warn",
      "no-unreachable": "error",
      "no-unreachable-loop": "error",
      "use-isnan": "warn",
      "arrow-body-style": "error",
      "camelcase": "error",
      "default-case": "error",
      "eqeqeq": "error"
    }
  },
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];