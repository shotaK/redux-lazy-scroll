const webpack = require('webpack');
const merge = require('webpack-merge');

const dev = require('./webpack.dev');

module.exports = merge(dev, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
});