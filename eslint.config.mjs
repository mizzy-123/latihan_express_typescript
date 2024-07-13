import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser"; // Tambahkan ini

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.node,
      parser: tsParser, // Tambahkan ini
      ecmaVersion: "latest", // Tambahkan ini
      sourceType: "module", // Tambahkan ini
    },
    env: {
      es2021: true, // Tambahkan ini
      node: true, // Tambahkan ini
    },
    extends: ["standard-with-typescript"], // Tambahkan ini
    plugins: ["@typescript-eslint"], // Tambahkan ini
    ignorePatterns: ["**/build/*", "**/node_modules/*", "**/public/*"], // Tambahkan ini
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
