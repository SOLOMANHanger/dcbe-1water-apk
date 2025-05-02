import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

export default (/** @type {any} */ _env, /** @type {{ mode: string; }} */ argv) => {
  const prod = argv.mode === "production";

  return {
    entry: "./src/index.jsx",
    output: {
      filename: prod ? "bundle.[contenthash].js" : "bundle.js",
      path: path.resolve("dist"),
      publicPath: "auto",
      clean: true,
    },
    resolve: { extensions: [".js", ".jsx"] },
    devtool: prod ? "source-map" : "eval-cheap-module-source-map",
    devServer: {
      hot: true,
      historyApiFallback: true,
      port: 5001,
    },
    module: {
      rules: [
        // JavaScript and JSX
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              plugins: [!prod && "react-refresh/babel"],
            },
          },
        },
        // Plain CSS
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        // SCSS (optional later)
        {
          test: /\.scss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        // Images and assets
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: "node",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "public/index.html" }),
      !prod && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
    mode: prod ? "production" : "development",
    performance: { hints: false },
  };
};
