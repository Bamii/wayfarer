const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

// init.
const app = express();

// MiddleWares.
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

app.set('views', path.join(__dirname, 'src/views'));
app.set('view-engine', 'pug');

// App routes
app.get('/', (req, res) => {
  res.sendfile(path.join(__dirname, '/views/index.html'));
});

// Listening Port
app.listen(8888, () => {
  debug('Listening on port 3000');
});
