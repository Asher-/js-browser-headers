import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import multi from '@rollup/plugin-multi-entry';

export default {
  input: 'src/**/*.ts',
  output: {
    file: "dist/mjs/browser-headers.mjs.js",
    format: 'es',
    sourcemap: true,
    name: "BrowserHeaders"
  },
  treeshake: false,
  plugins: [
    typescript({
      tsconfig: 'tsconfig.mjs.json'
    }),
    nodeResolve(),
    multi()
  ]
};
