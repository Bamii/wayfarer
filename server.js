const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const { getVersionNumber } = require('./utils/helpers')

// init.
const app = express();

// MiddleWares.
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');

// App routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get(`/api/v${getVersionNumber()}/`, () => {
  res.send({ status: 'success', data: 'data' });
});

// Listening Port
const server = app.listen(8888, () => {
  debug(`Listening on port ${chalk.green('8888')}`);
});

module.exports.server = server;
