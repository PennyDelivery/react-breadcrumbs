var webpack = require('webpack');
var path = require('path');
var isProd = process.env.NODE_ENV === 'production';

var plugins = [
  new webpack.DefinePlugin({
    'process.env': {NODE_ENV: '"production"'}
  }),
  new webpack.optimize.OccurenceOrderPlugin()
];

if (process.env.NODE_ENV !== 'development') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  );
}

module.exports = {
  devtool: !isProd && 'eval',
  entry: './index.jsx',
  output: {
    path: __dirname,
    filename: './dist/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: plugins
}
