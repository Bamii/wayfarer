const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const { getVersionNumber } = require('./src/utils/helpers');
const routes = require('./src/routes');

// init.
const app = express();

// MiddleWares.
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(cookieParser());
app.use(
  session({
    secret: 'wayfarer',
    resave: true,
    cookie: { maxAge: 6000 },
    saveUninitialized: false
  })
);

require('./src/utils/passport')(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

// Views Engine
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');

// App routes
app.use(`/api/v${getVersionNumber()}/`, routes);

// Listening Port
const server = app.listen(8880, () => {
  debug(`Listening on port ${chalk.green('8888')}`);
});

module.exports = server;
