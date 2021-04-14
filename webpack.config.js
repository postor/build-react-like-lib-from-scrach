const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  entry: {
    // step1: './step1/index.js',
    step2: './step2/index.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
  },
  plugins: [new HtmlWebpackPlugin()]
}