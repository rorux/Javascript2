const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    main: [
      "core-js/stable",
      "regenerator-runtime/runtime",
      "whatwg-fetch",
      "./src/public/index.js",
    ],
  },
  output: {
    path: path.join(__dirname, "dist/public"),
    publicPath: "",
    filename: "js/[name].js",
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/public/index.html",
      filename: "index.html",
      excludeChunks: ["server"],
      inject: "body",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/public/img",
          to: "img/[name].[ext]",
          toType: "template",
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
};
