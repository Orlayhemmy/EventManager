import path from 'path';
import webpack from 'webpack';


module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, '/client/index.jsx'),
  ],
  output: {
    path: '/',
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.(js?x)$/,
        loaders: ['react-hot-loader/webpack', 'babel-loader'],
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'server/middleware'),
        ],
        exclude: /(node_modules|server|.vscode)/,
      },
      {
        test: /\.(css)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
  ],
  node: {
    dns: 'empty',
    net: 'empty',
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
};