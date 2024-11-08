const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    historyApiFallback: true,
    hot: "only", // Only use HMR, don't fall back to live reload
    watchFiles: ["src/**/*"],
    compress: true,
    port: 3000,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },
  },
  optimization: {
    moduleIds: "named",
  },
  devtool: "eval-source-map",
  cache: {
    type: "filesystem",
  },
};
