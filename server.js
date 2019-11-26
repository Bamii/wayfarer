const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const { getVersionNumber } = require('./src/utils/helpers');
const routes = require('./src/routes');
const port = process.env.PORT || 3000;
const { middleware } = require('./src/middlewares');
const composer = require('./src/middlewares/mid');
const { authenticate } = require('./src/controllers/auth_controller');

// init.
const app = express();

composer({
  app,
  baseUrl: '/api/v1',
  rootMiddleWares: [
    morgan('tiny'),
    bodyParser.urlencoded({ extended: true }),
    (q, s, n) => { debug('first middle:::'); n(); },
    bodyParser.json({ type: 'application/json' }),
    cookieParser(),
    session({
      secret: 'wayfarer',
      resave: true,
      cookie: { maxAge: 6000 },
      saveUninitialized: false
    }),
    express.static(path.join(__dirname, 'public')),
    ['/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css'))],
    ['/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'))],
    ['/api/v1/auth/teaspoon/', (q, s, n) => { debug('second middle:::'); n(); }],
    ['/js', express.static(path.join(__dirname, 'node_modules/jquery/dist'))]
  ],
  auth: {
    middleware: authenticate,
    paths: ['/auth/teapot']
  }
});

require('./src/utils/passport')(app),

// Views Engine
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');

// App routes
app.use(`/api/v${getVersionNumber()}/`, routes);

// Listening Port
const server = app.listen(port, () => {
  debug(`Listening on port ${chalk.green(port)}`);
});

module.exports = server;
