
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = {

  devtool: 'eval',

  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    if (fs.statSync(path.join(__dirname, dir)).isDirectory())
      entries[dir] = path.join(__dirname, dir, 'index.js')

    return entries
  }, {}),

  output: {
    path: __dirname + '/__build__',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ]
  },

  resolve: {
    alias: {
      'elmux': path.join(__dirname, '..', 'src')
    }
  },

  // Expose __dirname to allow automatically setting basename.
  context: __dirname,
  
  node: {
    __dirname: true
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]

}