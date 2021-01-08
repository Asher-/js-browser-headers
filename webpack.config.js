const path = require('path');
const packageJson = require("./package.json");

const DIST_DIR = path.resolve(__dirname, 'dist/js');

const TS_LOADER = {
  loader: 'ts-loader',
  options: {
    configFile: "tsconfig.js.json"
  }
};
const BABEL_LOADER = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    presets: [
      "@babel/preset-env"
    ]
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

module.exports = [{
  name: 'lib-commonjs',
  ...LIB_BASE_CONFIG,
  output: {
    filename: `${packageJson.name}.js`,
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
},
{
  name: 'tests',
  mode: "development",
  entry: "./test/BrowserHeaders.spec.ts",
  output: {
    path: path.resolve(__dirname, 'test', 'build'),
    filename: 'integration-tests.js',
  },
  devtool: 'source-map',
  module: {
    rules: [{
        test: /\.js$/,
        include: /src|test|node_modules/,
        use: [
          BABEL_LOADER
        ],
      },
      {
        test: /\.ts$/,
        include: /src|test|node_modules/,
        use: [
          BABEL_LOADER,
          TS_LOADER
        ]
      }
    ]
  },
  plugins: [],
  resolve: {
    extensions: [".ts", ".js"]
  }
}];
