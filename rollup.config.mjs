import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import watch from "rollup-plugin-watch";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/bundle.min.cjs.js",
      format: "cjs",
      exports: "named",
      sourcemap: false,
      plugins: [terser()],
    },
    {
      file: "dist/bundle.min.esm.js",
      format: "esm",
      exports: "named",
      sourcemap: false,
      plugins: [terser()],
    },
  ],
  external: ["dayjs"],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    watch({ dir: "./src", include: ["**/*.ts"] }),
  ],
};
