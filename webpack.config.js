const path = require('path');
const packageJson = require("./package.json");

const DIST_DIR = path.resolve(__dirname, 'dist/js');

const TS_LOADER = {
  loader: 'ts-loader',
  options: {
    configFile: "tsconfig.js.json"
  }
};
const LIB_BASE_CONFIG = {
  entry: "./src/index.ts",
  module: {
    rules: [{
      test: /\.ts?$/,
      use: [
        TS_LOADER
      ],
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  mode: "production",
};

module.exports = [
  {
    name: 'lib-commonjs',
    ...LIB_BASE_CONFIG,
    output: {
      filename: `${packageJson.name}.cjs.js`,
      path: DIST_DIR,
      libraryTarget: 'commonjs',
    }
  },
  {
    name: 'lib-umd',
    ...LIB_BASE_CONFIG,
    output: {
      filename: `${packageJson.name}.umd.js`,
      path: DIST_DIR,
      libraryTarget: 'umd',
    }
  }
];
