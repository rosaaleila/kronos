import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import stylisticJs from '@stylistic/eslint-plugin-js';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        plugins: {
            '@stylistic/js': stylisticJs
        },
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
            "camelcase": "warn",
            "default-case": "error",
            "eqeqeq": "error",
            '@stylistic/js/indent': ['error', 4],
            "@stylistic/js/no-extra-semi": "error",
        }
    },
    {files: ["**/*.{js,mjs,cjs,ts}"]},
    {languageOptions: { globals: globals.browser }},
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
];