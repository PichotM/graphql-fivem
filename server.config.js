const webpack = require("webpack");
const path = require("path")
const fivemPath = "./"

module.exports = {
  entry: "./src/main.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      }
    ]
  },
  plugins: [new webpack.DefinePlugin({ "global.GENTLY": false })],
  optimization: {
    minimize: false
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".mjs", ".tsx", ".ts", ".js", ".json"]
  },
  output: {
    filename: "server.js",
    path: path.resolve(fivemPath, "dist")
  },
  target: "node"
};
