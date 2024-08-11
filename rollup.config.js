import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import del from "rollup-plugin-delete";
import { dts } from "rollup-plugin-dts";

/** @type {import("rollup").RollupOptions[]} */
export default [
  {
    input: "./src/index.ts",
    output: [
      {
        file: "./dist/index.cjs",
        format: "cjs",
        sourcemap: true,
        globals: ["node:process"],
      },
      {
        file: "./dist/index.js",
        format: "esm",
        sourcemap: true,
        globals: ["node:process"],
      },
    ],
    external: ["node:process"],
    plugins: [nodeResolve(), typescript(), del({ targets: "dist/*" })],
  },
  {
    input: "./dist/dts/index.d.ts",
    output: [
      { file: "./dist/index.d.ts", format: "esm" },
      { file: "./dist/index.d.cts", format: "cjs" },
    ],
    plugins: [dts(), del({ targets: "dist/dts", hook: "buildEnd" })],
  },
];
