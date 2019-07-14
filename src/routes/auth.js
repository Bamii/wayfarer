const Auth = require('express').Router();
const debug = require('debug')('app:auth-routes');
const passport = require('passport');
const { signin, signup, authenticate } = require('../controllers/auth_controller');
const { checkForValidPath } = require('../middlewares');
const { buildResponse } = require('../utils/helpers');

// middlewares
Auth.use(checkForValidPath(['signin', 'signup', 'see']));

// routes
Auth.post('/signin', signin);
Auth.post('/signup', signup);
Auth.get('/see', authenticate, (req, res) => {
  res.send(buildResponse('success', 'YAYYY'));
});

module.exports = Auth;
