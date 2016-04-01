
var path = require('path');

module.exports = {
  devtool: 'eval',
  resolve: {
    root: [__dirname],
    extensions: ['', '.js', 'jsx'],
  },
  output: {
    path: '.',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: path.resolve('.')
      }
    ]
  }
};
