const path = require('path');
const webpack = require('webpack');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', path.join(__dirname, '/client/index.jsx')],
  output: {
    path: path.resolve(__dirname, 'client/build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: 'babel-loader',
        query: {
          presets: ['react', 'env', 'stage-0'],
          plugins: [
            'react-html-attrs',
            'transform-class-properties',
            'transform-decorators-legacy'
          ]
        },
        include: [path.join(__dirname, 'client')],
        exclude: /(node_modules|server|.vscode)/
      },
      {
        test: /\.(sass|scss|css)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NamedModulesPlugin(), // prints readable module names console
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new UglifyJSPlugin({
      sourceMap: true
    })
  ],
  node: {
    dns: 'empty',
    net: 'empty'
  }
};
