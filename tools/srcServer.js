import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
let router = express.Router();
let bodyParser = require('body-parser');
let uriUtil = require('mongodb-uri');
let gifRoutes = require ('./routes/gifRoutes');
let mongoose = require('mongoose');


let mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost/todos2';
let mongooseUri = uriUtil.formatMongoose(mongodbUri);
let options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};
mongoose.connect(mongooseUri, options);

mongoose.Promise = global.Promise;

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/api', gifRoutes);

app.get('/', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
