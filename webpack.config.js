import webpackNodeExternals from 'webpack-node-externals';
import path from 'path';


module.exports = {
  target: 'node',
  externals: [webpackNodeExternals()],
  entry: {
    'index': './bin/www.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs2',
  },
  module: {   //設定你的檔案選項
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
    ],
  },
}