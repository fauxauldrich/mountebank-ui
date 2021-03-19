const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./ts/src/main.ts",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name]-bundle.js",
  },
  resolve: {
    // Add ".ts" as resolvable extensions.
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      // all files with a `.ts` extension will be handled by `ts-loader`
      { test: /\.ts?$/, loader: "ts-loader" },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./html",
        },
      ],
    }),
  ],
};
