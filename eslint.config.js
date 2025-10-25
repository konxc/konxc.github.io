import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import astroParser from "astro-eslint-parser";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

// Utility globals
const browserGlobals = {
  window: "readonly",
  document: "readonly",
  console: "readonly",
  setTimeout: "readonly",
  clearTimeout: "readonly",
};

const nodeGlobals = {
  process: "readonly",
  module: "readonly",
  __dirname: "readonly",
  __filename: "readonly",
  require: "readonly",
  exports: "readonly",
  global: "readonly",
};

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  // 1️⃣ Base JS rules (tanpa env, disesuaikan manual)
  {
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...browserGlobals, ...nodeGlobals },
    },
  },

  // 2️⃣ TypeScript support
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ["**/*.{ts,tsx,js}"],
    languageOptions: {
      ...config.languageOptions,
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: { ...browserGlobals, ...nodeGlobals },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      import: importPlugin,
    },
    rules: {
      ...config.rules,
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": "off",
      "no-var": "error",
      "prefer-const": "warn",
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],
    },
  })),

  // 3️⃣ Astro support
  {
    files: ["**/*.astro"],
    plugins: { astro },
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".astro"],
      },
      globals: { ...browserGlobals },
    },
    rules: {
      ...astro.configs.recommended.rules,
      "astro/no-set-html-directive": "off",
      "astro/no-unused-css-selector": "warn",
    },
  },

  // 4️⃣ Node.js scripts
  {
    files: ["scripts/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: { ...nodeGlobals },
    },
    rules: {
      "no-console": "off",
    },
  },

  // 5️⃣ Prettier integration
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      "prettier/prettier": ["warn"],
    },
  },

  // 6️⃣ Ignore patterns
  {
    ignores: [
      "dist/",
      "node_modules/",
      ".astro/",
      "public/",
      "*.config.js",
      "*.config.mjs",
    ],
  },

  // 7️⃣ Prettier config (disable conflicting rules)
  prettier,
];
