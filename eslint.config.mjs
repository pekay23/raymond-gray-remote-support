import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
    "results/**",
    "scripts/**",
    "*.html",
    "*.txt",
    "*.bat",
    "copy.ts",
    "probe.mjs",
    "search.js",
    "search.ts",
  ]),
]);

export default eslintConfig;
