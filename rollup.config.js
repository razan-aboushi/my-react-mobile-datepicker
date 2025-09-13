import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default {
    input: "src/index.ts",
    output: [
        { file: "dist/index.cjs.js", format: "cjs" },
        { file: "dist/index.esm.js", format: "esm" }
    ],
    plugins: [peerDepsExternal(), resolve(), commonjs(), typescript()]
};
