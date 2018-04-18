import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

import userRoute from './route/apiRoute';

const app = express();

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
  hot: true,
  publicpath: webpackConfig.output.publicPath,
  stats: { colors: true },
  noInfo: true
}));

app.use(express.static(path.join(__dirname, '../template/Public')));
app.use(webpackHotMiddleware(compiler));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  '/api/v1/',
  (req, res, next) => {
    let err = null;
    try {
      decodeURIComponent(req.path);
    } catch (e) {
      err = e;
    }
    if (err) {
      return res.status(404).send({ error: 'page not found' });
    }
    next();
  },
  userRoute
);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// app.all('*', (req, res) => {
//   res.status(404).send({
//     message: 'Route does not exist'
//   });
// });

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`App started on port ${app.get('port')}`);
});

export default app;
