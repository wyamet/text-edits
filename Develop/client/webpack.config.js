const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        chunks: ["main"],
        filename: "index.html",
      }),
      new HtmlWebpackPlugin({
        template: "./src/install.html",
        chunks: ["install"],
        filename: "install.html",
      }),
      new WebpackPwaManifest({
        name: "My Progressive Web App",
        short_name: "MyPWA",
        description: "My awesome Progressive Web App!",
        background_color: "#ffffff",
        theme_color: "#2196f3",
        icons: [
          {
            src: path.resolve("./src/assets/icon.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            purpose: "maskable any",
          },
        ],
      }),
      new InjectManifest({
        swSrc: "./src/js/sw.js",
        swDest: "sw.js",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
