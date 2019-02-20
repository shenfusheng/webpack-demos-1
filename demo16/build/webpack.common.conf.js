const webpack = require("webpack");
const merge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");

const productionConfig = require("./webpack.prod.conf.js"); // 引入生产环境配置文件
const developmentConfig = require("./webpack.dev.conf.js"); // 引入开发环境配置文件

/**
 * 根据不同的环境，生成不同的配置
 * @param {String} env "development" or "production"
 */
const generateConfig = env => {
  // 将需要的Loader和Plugin单独声明

  let scriptLoader = [
    {
      loader: "babel-loader"
    }
  ];

  let cssLoader = [
    {
      loader: "style-loader",
      options: {
        singleton: true // 处理为单个style标签
      }
    },
    {
      loader: "css-loader",
      options: {
        minimize: true,
        sourceMap: env === "development" ? true : false // 开发环境：开启source-map
      }
    },
    {
      loader: "sass-loader" // 将 Sass 编译成 CSS
    }
  ];

  let styleLoader =
    env === "production"
      ? ExtractTextPlugin.extract({
          // 生产环境：分离、提炼样式文件
          fallback: {
            loader: "style-loader"
          },
          use: cssLoader
        })
      : // 开发环境：页内样式嵌入
        cssLoader;

  return {
    entry: { app: "./src/app.js" },
    output: {
      publicPath: env === "development" ? "/" : __dirname + "/../dist/",
      path: path.resolve(__dirname, "..", "dist"),
      filename: "[name]-[hash:5].bundle.js",
      chunkFilename: "[name]-[hash:5].chunk.js"
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /(node_modules)/, use: scriptLoader },
        { test: /\.css$/, use: styleLoader },
        { test: /\.scss$/, use: styleLoader }
      ]
    },
    plugins: [
      // 开发环境和生产环境二者均需要的插件
      new HtmlWebpackPlugin(),
      new webpack.ProvidePlugin({ $: "jquery" })
    ]
  };
};

module.exports = env => {
  let config = env === "production" ? productionConfig : developmentConfig;
  return merge(generateConfig(env), config);
};
