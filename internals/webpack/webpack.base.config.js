const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const ROOT_PATH = "../..";

module.exports = {
  entry: path.resolve(__dirname, ROOT_PATH, "src/index.tsx"),
  output: {
    path: path.resolve(__dirname, ROOT_PATH, "dist"),
    filename: "[name].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.ejs$/i,
        use: ["html-loader", "template-ejs-loader"],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.tsx|.ts?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: ".env",
      systemvars: true,
    }),
    new WebpackManifestPlugin({
      fileName: "asset-manifest.json",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, ROOT_PATH, "public/index.ejs"),
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".scss"],
    modules: ["src", "node_modules"],
  },
};
