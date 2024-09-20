import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/bundle.min.cjs.js",
      format: "cjs",
      sourcemap: true, // Keep sourcemap for debugging
      plugins: [terser()], // Minify output
    },
    {
      file: "dist/bundle.min.esm.js",
      format: "esm",
      sourcemap: false, // No sourcemap for esm output
      plugins: [terser()], // Minify output
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
    }),
  ],
};
