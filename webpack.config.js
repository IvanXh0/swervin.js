import { resolve as _resolve, join } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export const entry = "./src/index.ts";
export const output = {
  path: _resolve(__dirname, "dist"),
  filename: "bundle.js",
};
export const module = {
  rules: [
    {
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: /node_modules/,
    },
  ],
};
export const resolve = {
  extensions: [".tsx", ".ts", ".js"],
  alias: {
    "@": _resolve(__dirname, "src/"),
  },
};
export const plugins = [
  new HtmlWebpackPlugin({
    template: "src/index.html",
  }),
];
export const devServer = {
  static: {
    directory: join(__dirname, "dist"),
  },
  historyApiFallback: true,
  compress: true,
  port: 3000,
};
