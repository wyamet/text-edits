const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { GenerateSW, InjectManifest } = require("workbox-webpack-plugin");

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
        name: "My PWA App",
        short_name: "PWA App",
        description: "My awesome PWA app!",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#317EFB",
        icons: [
          {
            src: path.resolve("src/images/icon.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            purpose: "any maskable",
          },
        ],
        display: "standalone",
        crossorigin: "use-credentials",
      }),
      new GenerateSW({
        swDest: "service-worker.js",
        clientsClaim: true,
        skipWaiting: true,
      }),
      new InjectManifest({
        swSrc: "./src/sw.js",
        swDest: "service-worker.js",
        exclude: [/\.map$/, /manifest\.json$/],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
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
