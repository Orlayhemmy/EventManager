import path from 'path';
import webpack from 'webpack';

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, '/client/index.jsx')
  ],
  output: {
    path: '/',
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
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints readable module names console
    new webpack.DefinePlugin({
      UPLOAD_PRESET: process.env.UPLOAD_PRESET
    })
  ],
  node: {
    dns: 'empty',
    net: 'empty'
  }
};
