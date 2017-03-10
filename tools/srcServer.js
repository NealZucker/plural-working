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
let jwt = require('jsonwebtoken');
let configure = require('./config');
let User = require('../src/models/user');
let hash = require('password-hash');


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
app.set('superSecret', configure.secret);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static('./src/Public'));
app.use('/api', gifRoutes);

app.get('/', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/Public/index.html'));
});

app.post('/newUser', function(req, res) {


  let newUser = new User({
    name: req.body.name,
    password: hash.generate(req.body.password),
    admin: false

  });


  newUser.save(function(err) {
    if (err) throw err;

    res.redirect('/');
    // console.log('User saved successfully');
    // res.json({ success: true });
  });
});

app.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (!hash.verify(req.body.password, user.password)) {
      // if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        let token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        // res.json({
        //   success: true,
        //   message: 'Enjoy your token!',
        //   token: token
        // });
        res.redirect('/');

      }

    }

  });
});

// TODO: route middleware to verify a token
app.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  let token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
