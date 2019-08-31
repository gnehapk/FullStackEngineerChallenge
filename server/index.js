/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const logger = require('./logger');
const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const app = express();

// auth & api
const cors = require('cors');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
if (!isDev) {
  app.use(errorHandler());
}
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
mongoose.set('debug', true);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }),
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./models/Users');
require('./models/Employees');
require('./models/Reviews');
require('./config/passport');
app.use('/api', require('./routes/api'));
if (!isDev) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}


// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
