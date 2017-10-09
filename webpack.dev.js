const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './dev/client/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: './dev/client/index.js',
  output: {
    path: path.join(__dirname, 'dev/server/public'),
    filename: 'app.bundle.js'
  },
  devServer: {
    contentBase: './dev/client'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.css$/, use: [{loader: "style-loader/url"}, {loader: "file-loader"}], exclude: /node_modules/}
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
  ]
};