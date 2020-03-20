import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/index.js',
  output: [{
    file: 'dist/index.js',
    format: 'cjs',
  }, {
    file: 'dist/index.esm.js',
    format: 'esm',
  }, {
    file: 'dist/index.min.js',
    format: 'cjs',
    plugins: [terser()]
  }],
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      },
    }),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
  external: ['@babel/core'],
};